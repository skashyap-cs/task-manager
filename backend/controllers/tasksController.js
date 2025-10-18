const db = require('../models/db');

function nowISO() {
  return new Date().toISOString();
}

function insertLog(action, taskId, updatedContent) {
  const ts = nowISO();
  const contentStr = updatedContent ? JSON.stringify(updatedContent) : null;
  db.run(`INSERT INTO logs (timestamp, action, taskId, updatedContent) VALUES (?, ?, ?, ?)`, [ts, action, taskId, contentStr]);
}

exports.listTasks = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const filter = req.query.filter || '';
  const offset = (page - 1) * limit;
  const like = `%${filter}%`;

  db.all(
    `SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`,
    [like, like, limit, offset],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      db.get(`SELECT COUNT(*) as cnt FROM tasks WHERE title LIKE ? OR description LIKE ?`, [like, like], (e, r) => {
        if (e) return res.status(500).json({ error: 'DB error' });
        res.json({ data: rows, page, limit, total: r.cnt });
      });
    }
  );
};

exports.createTask = (req, res) => {
  const { title, description } = req.body;
  const createdAt = nowISO();
  db.run(`INSERT INTO tasks (title, description, createdAt) VALUES (?, ?, ?)`, [title, description, createdAt], function (err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    const taskId = this.lastID;
    insertLog('Create Task', taskId, { title, description, createdAt });
    res.status(201).json({ id: taskId, title, description, createdAt });
  });
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const fields = {};
  if (req.body.title) fields.title = req.body.title;
  if (req.body.description) fields.description = req.body.description;
  if (Object.keys(fields).length === 0) return res.status(400).json({ error: 'No fields to update' });

  db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'Task not found' });

    const updated = { ...row, ...fields };
    db.run(`UPDATE tasks SET title = ?, description = ? WHERE id = ?`, [updated.title, updated.description, id], function (e) {
      if (e) return res.status(500).json({ error: 'DB error' });
      const changed = {};
      if (fields.title && fields.title !== row.title) changed.title = fields.title;
      if (fields.description && fields.description !== row.description) changed.description = fields.description;
      insertLog('Update Task', id, changed);
      res.json({ id: Number(id), ...updated });
    });
  });
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'Task not found' });
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (e) {
      if (e) return res.status(500).json({ error: 'DB error' });
      insertLog('Delete Task', id, null);
      res.json({ success: true });
    });
  });
};
