const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

const route = require("./route");
const { addUser, findUser, getRoomUsers, removeUser, getAdmin } = require("./users");

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { user, isExist, isAdmin } = addUser({ name, room });

    if (isAdmin) {
      socket.emit("currentUser", { user: { ...user, isAdmin: true } });
    } else {
      socket.emit("currentUser", { user });
    }

    const userMessage = isExist
      ? `You have joined the chat again`
      : `You have joined the chat`;

    socket.emit("message", {
      data: { user: { name: "Bot" }, message: userMessage },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "Bot" }, message: `${user.name} has joined` },
    });

    io.to(user.room).emit("room", {
      data: { users: getRoomUsers(user.room), admin: getAdmin(user.room) },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", { data: { user, message } });
    }
  });

  socket.on("removeUser", ({ name, room }) => {
    const admin = getAdmin(room);
    const user = removeUser({ name, room });

    if (user && admin) {
      io.to(room).emit("message", {
        data: { user: { name: "Bot" }, message: `${name} has been removed by admin` },
      });

      io.to(room).emit("room", {
        data: { users: getRoomUsers(room), admin },
      });

      io.to(room).emit("userRemoved", { name });
    }
  });

  socket.on("leftRoom", ({ params }) => {
    const user = removeUser(params);

    if (user) {
      const { room, name } = user;

      io.to(room).emit("message", {
        data: { user: { name: "Bot" }, message: `${name} has left` },
      });

      io.to(room).emit("room", {
        data: { users: getRoomUsers(room), admin: getAdmin(room) },
      });
    }
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(3000, () => {
  console.log("Server is running");
});