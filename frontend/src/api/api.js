const BASE = "http://localhost:4000/api"; // backend base

// basic auth (backend demo uses admin:password123)
const USERNAME = "admin";
const PASSWORD = "password123";
const AUTH = "Basic " + btoa(`${USERNAME}:${PASSWORD}`);

async function fetchJson(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const txt = await res.text().catch(()=>"");
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.json();
}

export async function listTasks({ page=1, limit=10, filter="" } = {}) {
  const q = `?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`;
  return fetchJson("/tasks" + q);
}

export async function createTask(body) {
  return fetchJson("/tasks", { method: "POST", body: JSON.stringify(body) });
}

export async function updateTask(id, body) {
  return fetchJson(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(body) });
}

export async function deleteTask(id) {
  const res = await fetch(BASE + `/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: AUTH }
  });
  if (!res.ok) throw new Error(`Delete failed ${res.status}`);
  return res.json();
}

export async function getLogs() {
  return fetchJson("/logs");
}
