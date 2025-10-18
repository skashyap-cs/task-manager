import React from "react";

export default function ConfirmModal({ open, title="Confirm", message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-card" role="dialog" aria-modal="true">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <h3 style={{margin:0}}>{title}</h3>
          <button className="btn secondary small" onClick={onCancel}>Close</button>
        </div>
        <p style={{color:"var(--muted)"}}>{message}</p>
        <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:12}}>
          <button className="btn secondary small" onClick={onCancel}>Cancel</button>
          <button className="btn small" style={{background:"var(--danger)"}} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
