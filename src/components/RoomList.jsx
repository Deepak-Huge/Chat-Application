import React, { useState } from "react";

const RoomList = ({ setRoom }) => {
  const [newRoom, setNewRoom] = useState("");
  const rooms = ["General", "JavaScript", "Gaming"];

  return (
    <div className="room-list">
      <h2>Select a room</h2>
      {rooms.map((room, i) => (
        <div key={i} onClick={() => setRoom(room)} className="room-item">
          {room}
        </div>
      ))}
      <input
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
        placeholder="Create new room"
      />
      <button onClick={() => newRoom && setRoom(newRoom)}>Create</button>
    </div>
  );
};

export default RoomList;
