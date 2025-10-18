import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskModal from "./components/TaskModal";
import TaskRow from "./components/TaskRow";
import ConfirmModal from "./components/ConfirmModal";
import AuditLogs from "./components/AuditLogs";
import { listTasks, createTask, updateTask, deleteTask } from "./api/api";
import "./styles.css";

export default function App(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [tab, setTab] = useState("tasks");

  // confirm modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  async function load(p = page, f = filter) {
    setLoading(true);
    try {
      const res = await listTasks({ page: p, limit, filter: f });
      setTasks(res.data || []);
      setTotal(res.total || 0);
    } catch(e){
      console.error(e);
      alert("Failed to load tasks");
    } finally { setLoading(false); }
  }

  // load initial tasks
  useEffect(()=>{ load(1, ""); }, []);

  // keep tab in sync with URL hash (#logs or #tasks)
  useEffect(() => {
    function checkHash() {
      if (window.location.hash === "#logs") setTab("logs");
      else setTab("tasks");
    }
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // when user clicks our header buttons, update location.hash too
  function goTab(name){
    window.location.hash = name === "logs" ? "#logs" : "#tasks";
    setTab(name);
  }

  function openCreate() { setEditing(null); setModalOpen(true); }
  function openEdit(t){ setEditing(t); setModalOpen(true); }

  async function handleSave(body) {
    try {
      if (editing) {
        await updateTask(editing.id, body);
      } else {
        await createTask(body);
      }
      setModalOpen(false);
      setEditing(null);
      await load(1, filter);
    } catch(e){
      console.error(e);
      alert("Save failed");
    }
  }

  function requestDelete(id){
    setPendingDeleteId(id);
    setConfirmOpen(true);
  }

  async function handleDeleteConfirmed(){
    try {
      await deleteTask(pendingDeleteId);
      setConfirmOpen(false);
      setPendingDeleteId(null);
      await load(page, filter);
    } catch(e){
      console.error(e);
      alert("Delete failed");
    }
  }

  async function onSearch(e){
    const v = e.target.value;
    setFilter(v);
    setTimeout(()=> load(1, v), 250);
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <div className="container">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{display:"flex",gap:8}}>
              <button className={`btn small ${tab==="tasks"?"":"secondary"}`} onClick={()=>goTab("tasks")}>Tasks</button>
              <button className={`btn small ${tab==="logs"?"":"secondary"}`} onClick={()=>goTab("logs")}>Audit Logs</button>
            </div>
            <div style={{display:"flex",gap:8}}>
              {tab==="tasks" && <input placeholder="Search by title or description" onChange={onSearch} style={{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.04)",background:"transparent",color:"var(--text)"}} />}
              <button className="btn small" onClick={openCreate}>+ Create Task</button>
            </div>
          </div>

          {tab === "tasks" ? (
            <div className="card">
              {loading ? <p>Loading…</p> : (
                <>
                  <table className="table">
                    <thead><tr><th style={{width:80}}>ID</th><th>Title</th><th>Description</th><th style={{width:180}}>Created</th><th style={{width:180}}>Actions</th></tr></thead>
                    <tbody>
                      {tasks.length === 0 ? <tr><td colSpan={5} className="muted">No tasks</td></tr> : tasks.map(t=>(
                        <TaskRow key={t.id} t={t} onEdit={openEdit} onRequestDelete={requestDelete} />
                      ))}
                    </tbody>
                  </table>

                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12}}>
                    <div className="muted">Showing {tasks.length} of {total} tasks</div>
                    <div>
                      <button className="btn secondary small" onClick={()=>{ if (page>1) { setPage(p=>p-1); load(page-1, filter); } }}>Prev</button>
                      <button className="btn small" style={{marginLeft:8}} onClick={()=>{ setPage(p=>p+1); load(page+1, filter); }}>Next</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <AuditLogs />
          )}

        </div>
      </main>

      <TaskModal open={modalOpen} onClose={()=>{setModalOpen(false); setEditing(null);}} onSave={handleSave} initial={editing} />
      <ConfirmModal open={confirmOpen} title="Delete Task" message="Delete this task?" onCancel={()=>{setConfirmOpen(false); setPendingDeleteId(null);}} onConfirm={handleDeleteConfirmed} />
    </div>
  );
}
