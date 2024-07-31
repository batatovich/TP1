const taskService = require('../services/task-service');

//check sql injection
const taskController = {
  createTask: async (req, res) => {
    try {
      const task = await taskService.createTask(req.body.description)
      return res.status(201).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      await taskService.deleteTask(req.body.id);
      return res.status(200).json('Task successfully deleted');
    } catch (error) {
      return res.status(401).json({ error: error.message })
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskService.getAllTasks();
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = taskController;
