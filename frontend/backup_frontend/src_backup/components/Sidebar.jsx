import React from "react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo" style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}>
        <div style={{width:36,height:36,background:"linear-gradient(180deg,#2563eb,#60a5fa)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>TM</div>
        <div>
          <div style={{fontWeight:600}}>Task Manager</div>
          <div style={{fontSize:12,color:"var(--muted)"}}>v1.0</div>
        </div>
      </div>

      <h3>Main</h3>
      <a className="nav-link" href="#tasks">Tasks</a>
      <a className="nav-link" href="#logs">Audit Logs</a>

      <div style={{marginTop:20,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.02)"}}>
        <div className="muted" style={{fontSize:13}}>Project</div>
        <div style={{marginTop:8,fontSize:13}}>Private demo — credentials hidden</div>
      </div>
    </aside>
  );
}
