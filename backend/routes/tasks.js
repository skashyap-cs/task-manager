const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const basicAuth = require('../middleware/basicAuth');
const controller = require('../controllers/tasksController');

router.use(basicAuth);

router.get('/', controller.listTasks);

router.post(
  '/',
  body('title').isLength({ min: 1, max: 100 }).trim().escape(),
  body('description').isLength({ min: 1, max: 500 }).trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    controller.createTask(req, res, next);
  }
);

router.put(
  '/:id',
  body('title').optional().isLength({ min: 1, max: 100 }).trim().escape(),
  body('description').optional().isLength({ min: 1, max: 500 }).trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    controller.updateTask(req, res, next);
  }
);

router.delete('/:id', controller.deleteTask);

module.exports = router;
