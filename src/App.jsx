import React, { useState } from "react";
import UsernamePrompt from "./components/UsernamePrompt";
import RoomList from "./components/RoomList";
import ChatRoom from "./components/ChatRoom";
import "./App.css";  

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");

  if (!username) return <UsernamePrompt setUsername={setUsername} />;
  if (!room) return <RoomList setRoom={setRoom} />;

  return <ChatRoom username={username} 
  room={room}
  setUsername={setUsername}
  setRoom={setRoom}
  setError={setError} />;
}

export default App;
