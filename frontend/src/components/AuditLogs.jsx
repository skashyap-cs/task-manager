import React, { useEffect, useState } from "react";
import { getLogs } from "../api/api";

export default function AuditLogs(){
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await getLogs();
      setLogs(res.data || []);
    } catch(e){
      console.error(e);
      alert("Failed to load logs");
    } finally { setLoading(false); }
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div className="card">
      <h3>Audit Logs</h3>
      {loading ? <p>Loading…</p> : (
        <table className="table" style={{marginTop:10}}>
          <thead><tr><th style={{width:200}}>Timestamp</th><th>Action</th><th style={{width:80}}>Task ID</th><th>Updated Content</th></tr></thead>
          <tbody>
            {logs.length===0 ? <tr><td colSpan={4} className="muted">No logs</td></tr> : logs.map(l=>(
              <tr key={l.id}>
                <td>{new Date(l.timestamp).toLocaleString()}</td>
                <td>{l.action}</td>
                <td>{l.taskId || "-"}</td>
                <td style={{whiteSpace:"pre-wrap"}}>{l.updatedContent ? JSON.stringify(l.updatedContent) : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
