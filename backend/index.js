require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const tasksRouter = require('./routes/tasks');
const logsRouter = require('./routes/logs');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/tasks', tasksRouter);
app.use('/api/logs', logsRouter);

// simple health route
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// error handler (no stack to client)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
