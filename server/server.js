const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const users = {};
const messageHistory = {};

io.on("connection", (socket) => {
  console.log(" New client connected");

  socket.on("joinRoom", ({ username, room }) => {

    if (Object.values(users).includes(username)) {
      socket.emit("error", "Username already taken");
      return;
    }


    users[socket.id] = username;
    socket.join(room);

    if (messageHistory[room]) {
      socket.emit("chatHistory", messageHistory[room]);
    }


    const joinMsg = {
      username: "System",
      text: `${username} joined the room`,
      timestamp: new Date().toLocaleTimeString()
    };


    messageHistory[room] = [...(messageHistory[room] || []), joinMsg];
    io.to(room).emit("message", joinMsg);
  });

  socket.on("chatMessage", ({ username, room, message }) => {
    const newMsg = {
      username,
      text: message,
      timestamp: new Date().toLocaleTimeString()
    };


    messageHistory[room] = [...(messageHistory[room] || []), newMsg];


    io.to(room).emit("message", newMsg);
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];


    const leaveMsg = {
      username: "System",
      text: `${username} left the chat`,
      timestamp: new Date().toLocaleTimeString()
    };

    io.emit("message", leaveMsg);
  });
});

server.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});
