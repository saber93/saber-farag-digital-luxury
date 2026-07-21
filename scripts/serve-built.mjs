import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import serverEntrypoint from "../dist/server/server.js";

const port = 4173;
const clientRoot = resolve("dist/client");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function staticPath(pathname) {
  const candidate = resolve(clientRoot, `.${decodeURIComponent(pathname)}`);
  if (candidate !== clientRoot && !candidate.startsWith(`${clientRoot}${sep}`)) return null;
  if (!existsSync(candidate) || !statSync(candidate).isFile()) return null;
  return candidate;
}

const server = createServer(async (incoming, outgoing) => {
  try {
    const requestUrl = new URL(incoming.url ?? "/", `http://${incoming.headers.host}`);
    const asset = staticPath(requestUrl.pathname);
    if (asset) {
      outgoing.statusCode = 200;
      outgoing.setHeader(
        "Content-Type",
        contentTypes[extname(asset)] ?? "application/octet-stream",
      );
      outgoing.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      if (incoming.method === "HEAD") outgoing.end();
      else createReadStream(asset).pipe(outgoing);
      return;
    }

    const method = incoming.method ?? "GET";
    const request = new Request(requestUrl, {
      method,
      headers: incoming.headers,
      ...(method === "GET" || method === "HEAD" ? {} : { body: incoming, duplex: "half" }),
    });
    const response = await serverEntrypoint.fetch(request);
    outgoing.statusCode = response.status;
    for (const [name, value] of response.headers) outgoing.setHeader(name, value);
    if (incoming.method === "HEAD") outgoing.end();
    else outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error(error);
    outgoing.statusCode = 500;
    outgoing.end("Internal server error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Built Analytics SSR server listening on http://127.0.0.1:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
