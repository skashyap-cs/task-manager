import React from "react";

export default function Header({ onNew }) {
  return (
    <div className="header">
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <h2 style={{margin:0}}>Task Manager</h2>
        <span className="muted">• simple full-stack demo</span>
      </div>
      <div className="actions">
        <button className="btn small" onClick={onNew}>+ New Task</button>
      </div>
    </div>
  );
}
