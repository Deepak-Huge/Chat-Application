
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Message from "./Message"; 

const socket = io("http://localhost:3000"); 

const ChatRoom = ({ username, room, setUsername, setRoom, setError }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  
  useEffect(() => {
    socket.emit("joinRoom", { username, room });

        socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

        socket.on("error", (msg) => {
      alert(msg);
      if (setUsername && setRoom && setError) {
        setUsername("");
        setRoom("");
        setError(msg);
      } else {
        window.location.reload();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [username, room ,setUsername, setRoom, setError]);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


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
