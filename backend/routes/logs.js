const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basicAuth');
const db = require('../models/db');

router.use(basicAuth);

router.get('/', (req, res) => {
  db.all(`SELECT * FROM logs ORDER BY id DESC LIMIT 200`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const data = rows.map(r => ({ ...r, updatedContent: r.updatedContent ? JSON.parse(r.updatedContent) : null }));
    res.json({ data });
  });
});

module.exports = router;
