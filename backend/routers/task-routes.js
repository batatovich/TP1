const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller')

router.post('/', taskController.create);
router.delete('/', taskController.delete);
router.get('/all', taskController.all);

module.exports(router);
