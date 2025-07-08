// src/components/Message.jsx
import React from "react";

const Message = ({ username, text, timestamp, isSystem }) => {
  return (
    <div
      className={`message ${isSystem ? "system-message" : ""}`}
      style={{
        padding: "5px 10px",
        margin: "5px 0",
        backgroundColor: isSystem ? "#e0e0e0" : "#f9f9f9",
        borderRadius: "5px",
      }}
    >
      <div style={{ fontSize: "0.85rem", color: "#333" }}>
        <strong>{isSystem ? "🛡️ System" : username}</strong>
        <span style={{ float: "right", fontSize: "0.75rem", color: "#666" }}>
          {timestamp}
        </span>
      </div>
      <div style={{ marginTop: "3px" }}>{formatText(text)}</div>
    </div>
  );
};

// Optional: Basic formatting support (bold, italics, links)
function formatText(text) {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **bold**
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // *italic*
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'); // link
  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
}

export default Message;
