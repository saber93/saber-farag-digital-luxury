import { readFileSync } from "node:fs";

const expectedNode = "v22.23.1";
const expectedPackageManager = "npm@10.9.2";
const npmVersion = process.env.npm_config_user_agent?.match(/^npm\/([^ ]+)/)?.[1];
const npmParts = npmVersion?.split(".").map(Number) ?? [];
const packageManager = JSON.parse(readFileSync("package.json", "utf8")).packageManager;

if (process.version !== expectedNode) {
  throw new Error(`Expected Node ${expectedNode}, received ${process.version}`);
}
if (npmParts[0] !== 10 || npmParts[1] < 9) {
  throw new Error(`Expected supported npm 10.9+, received ${npmVersion ?? "unknown"}`);
}
if (packageManager !== expectedPackageManager) {
  throw new Error(`Expected package manager ${expectedPackageManager}, received ${packageManager}`);
}

console.log(
  `Verified Node ${process.version}, compatible npm ${npmVersion}, and ${packageManager} project pin.`,
);
