const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller')

router.get('/', taskController.getTask);
router.get('/all', taskController.getAll);
router.post('/', taskController.createTask);
router.delete('/', taskController.deleteTask);

module.exports(router);
