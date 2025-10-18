import React, { useState, useEffect } from "react";

export default function TaskModal({ open, onClose, onSave, initial = null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initial, open]);

  if (!open) return null;

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    onSave({ title: title.trim(), description: description.trim() });
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <h3 style={{margin:0}}>{initial ? "Edit Task" : "Create Task"}</h3>
          <button className="btn secondary small" onClick={onClose}>Close</button>
        </div>
        <form onSubmit={submit}>
          <div style={{marginBottom:10}}>
            <label style={{display:"block",fontSize:13,marginBottom:6}}>Title</label>
            <input autoFocus value={title} onChange={e=>setTitle(e.target.value)} style={inputStyle} />
          </div>
          <div style={{marginBottom:12}}>
            <label style={{display:"block",fontSize:13,marginBottom:6}}>Description</label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} style={{...inputStyle,height:100}} />
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
            <button type="button" className="btn secondary small" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn small">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position:"fixed", left:0, top:0, right:0, bottom:0,
  background:"rgba(0,0,0,0.45)",
  display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999
};
const modalStyle = {
  width:700, maxWidth:"95%", background:"#0f172a", color:"#fff", padding:20, borderRadius:12, boxShadow:"0 8px 30px rgba(2,6,23,0.6)"
};
const inputStyle = {
  width:"100%", padding:10, borderRadius:8, border:"1px solid #22303f", background:"#0c1116", color:"#fff"
};
