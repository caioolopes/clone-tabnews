const net = require("node:net");

const server = net.createServer();

server.listen(0, "127.0.0.1", () => {
  const address = server.address();
  console.log(address.port);
  server.close();
});
