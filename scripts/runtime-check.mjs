const expectedNode = "v22.23.1";
const expectedNpm = "10.9.2";
const npmVersion = process.env.npm_config_user_agent?.match(/^npm\/([^ ]+)/)?.[1];

if (process.version !== expectedNode) {
  throw new Error(`Expected Node ${expectedNode}, received ${process.version}`);
}
if (npmVersion !== expectedNpm) {
  throw new Error(`Expected npm ${expectedNpm}, received ${npmVersion ?? "unknown"}`);
}

console.log(`Verified Node ${process.version} and npm ${npmVersion}.`);
