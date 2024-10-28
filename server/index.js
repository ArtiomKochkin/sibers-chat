const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();

const route = require("./src/route");
const { initSocket } = require("./src/io");

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);
initSocket(server);

server.listen(3000, () => {
  console.log("Server is running");
});