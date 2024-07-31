const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller')

router.post('/', taskController.createTask);
router.delete('/', taskController.deleteTask);
router.get('/all', taskController.getAllTasks);

module.exports = router;
