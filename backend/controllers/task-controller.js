const taskService = require('../services/task-service');

//check sql injection
const taskController = {
  createTask: async (req, res) => {
    const { description } = req.body;
    try {
      const id = await taskService.createTask(description)
      return res.status(201).json(id);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  deleteTask: async (req, res) => {
    const { id } = req.body;
    try {
      await taskService.deleteTask(id);
      return res.status(200);
    } catch (error) {
      return res.status(401).json({ error: error.message })
    }
  },

  getAllTasks: async (req, res) => {
    try {
      await taskService.getAllTasks();
      return res.status(200);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = taskController;
