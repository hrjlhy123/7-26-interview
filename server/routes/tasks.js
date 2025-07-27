// server/routes/tasks.js
import express from 'express';
import Task from '../models/Task.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all task routes
router.use(authMiddleware);

// Get all tasks for the authenticated user
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err); // Forward to centralized error handler
  }
});

// Create a new task
router.post('/', async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      const error = new Error('Task text cannot be empty');
      error.statusCode = 400;
      throw error;
    }

    const newTask = new Task({
      text,
      user: req.userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// Update an existing task
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    task.text = req.body.text ?? task.text;
    task.completed = req.body.completed ?? task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
