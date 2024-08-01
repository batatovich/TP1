const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller')

router.post('/tasks/', taskController.createTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks/all', taskController.getAllTasks);
router.put('/tasks/:id', taskController.updateTask)

module.exports = router;
