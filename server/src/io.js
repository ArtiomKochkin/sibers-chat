const { Server } = require("socket.io");

const { addUser, findUser, getRoomUsers, removeUser, getAdmin, users } = require('./users');
const { getNowDate } = require("./utils");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // Event listener for user joining a room
    socket.on("join", ({ name, room }) => {
      socket.join(room);
  
      const { user, isExist, isAdmin } = addUser(users, { name, room });
  
      if (isAdmin) {
        socket.emit("currentUser", { user: { ...user, isAdmin: true } });
      } else {
        socket.emit("currentUser", { user });
      }
  
      const userMessage = isExist ? `You have joined the chat again` : `You have joined the chat`;
      const time = getNowDate();
  
      socket.emit("message", {
        data: { 
          user: { name: "Bot" }, 
          message: userMessage,
          time: time
        },
      });
  
      socket.broadcast.to(user.room).emit("message", {
        data: { 
          user: { name: "Bot" }, 
          message: `${user.name} has joined`,
          time: time
        },
      });
  
      io.to(user.room).emit("room", {
        data: { 
          users: getRoomUsers(users, user.room), 
          admin: getAdmin(users, user.room) 
        },
      });
    });
  
    // Event listener for sending a message
    socket.on("sendMessage", ({ message, params }) => {
      const user = findUser(users, params);
      const time = getNowDate();
  
      if (user) {
        io.to(user.room).emit("message", { 
          data: { user, message, time } 
        });
      }
    });
  
    // Event listener for removing a user
    socket.on("removeUser", ({ name, room }) => {
      const admin = getAdmin(users, room);
      const user = removeUser(users, { name, room });
      const time = getNowDate();
  
      if (user && admin) {
        io.to(room).emit("message", {
          data: { 
            user: { name: "Bot" }, 
            message: `${name} has been removed by admin`,
            time: time
          },
        });
  
        io.to(room).emit("room", {
          data: { 
            users: getRoomUsers(users, room),
            admin 
          },
        });
  
        io.to(room).emit("userRemoved", { name });
      }
    });
  
    // Event listener for user leaving the room
    socket.on("leftRoom", ({ params }) => {
      const user = removeUser(users, params);
  
      if (user) {
        const { room, name } = user;
        const time = getNowDate();
  
        io.to(room).emit("message", {
          data: { 
            user: { name: "Bot" }, 
            message: `${name} has left`,
            time: time
          },
        });
  
        io.to(room).emit("room", {
          data: { 
            users: getRoomUsers(users, room), 
            admin: getAdmin(users, room) 
          },
        });
      }
    });
  
    // Event listener for disconnecting
    io.on("disconnect", () => {
      console.log("Disconnect");
    });
  });
}

module.exports = { initSocket };