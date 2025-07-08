import React, { useState } from "react";

const UsernamePrompt = ({ setUsername, error = "" }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      setUsername(name.trim());
    }
  };

  return (
    <div className="username-container">
      <h2>Enter your username</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        className="username-input"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="join-button" onClick={handleSubmit}>
        Join Chat
      </button>
    </div>
  );
};


export default UsernamePrompt;
