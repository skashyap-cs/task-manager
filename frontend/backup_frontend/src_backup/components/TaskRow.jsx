import React from "react";

export default function TaskRow({ t, onEdit, onRequestDelete }) {
  return (
    <tr>
      <td style={{width:60}}>{t.id}</td>
      <td>{t.title}</td>
      <td style={{whiteSpace:"pre-wrap",maxWidth:420}}>{t.description}</td>
      <td style={{width:200}}>{new Date(t.createdAt).toLocaleString()}</td>
      <td style={{width:170, textAlign:"right"}}>
        <button className="btn secondary small" onClick={()=>onEdit(t)}>Edit</button>
        <button className="btn small" style={{marginLeft:8, background:"var(--danger)"}} onClick={()=>onRequestDelete(t.id)}>Delete</button>
      </td>
    </tr>
  );
}
