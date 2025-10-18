const db = require('./db');

module.exports = {
  create: (title, description, cb) => {
    const createdAt = new Date().toISOString();
    db.run(
      `INSERT INTO tasks (title, description, createdAt) VALUES (?, ?, ?)`,
      [title, description, createdAt],
      function (err) {
        if (err) return cb(err);
        cb(null, { id: this.lastID, title, description, createdAt });
      }
    );
  },

  getById: (id, cb) => {
    db.get(`SELECT * FROM tasks WHERE id = ?`, [id], cb);
  },

  update: (id, title, description, cb) => {
    db.run(
      `UPDATE tasks SET title = ?, description = ? WHERE id = ?`,
      [title, description, id],
      function (err) {
        if (err) return cb(err);
        cb(null, { changes: this.changes });
      }
    );
  },

  delete: (id, cb) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
      if (err) return cb(err);
      cb(null, { changes: this.changes });
    });
  },

  list: (filter, limit, offset, cb) => {
    const like = `%${filter}%`;
    db.all(
      `SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`,
      [like, like, limit, offset],
      cb
    );
  },

  count: (filter, cb) => {
    const like = `%${filter}%`;
    db.get(`SELECT COUNT(*) as cnt FROM tasks WHERE title LIKE ? OR description LIKE ?`, [like, like], cb);
  }
};
