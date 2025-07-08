// src/components/ChatRoom.jsx
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Message from "./Message"; // make sure path is correct

const socket = io("http://localhost:3000"); // Node.js server

const ChatRoom = ({ username, room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  // Connect + join room
  useEffect(() => {
    socket.emit("joinRoom", { username, room });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [username, room]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { username, room, message });
      setMessage("");
    }
  };

  return (
    <div className="chat-room-container">
      <div className="chat-header">Room: {room}</div>

      <div className="messages">
        {messages.map((msg, i) => (
          <Message
            key={i}
            username={msg.username}
            text={msg.text}
            timestamp={msg.timestamp}
            isSystem={msg.username === "System"}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
