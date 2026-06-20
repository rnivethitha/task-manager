const router = require('express').Router();
const auth = require('../middleware/authMiddleware');

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// ========================
// TASK ROUTES (PROTECTED)
// ========================

// Get all tasks (for logged-in user)
router.get('/', auth, getTasks);

// Create new task
router.post('/', auth, createTask);

// Update task by ID
router.put('/:id', auth, updateTask);

// Delete task by ID
router.delete('/:id', auth, deleteTask);

module.exports = router;