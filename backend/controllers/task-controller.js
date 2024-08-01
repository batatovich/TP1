const taskService = require('../services/task-service');

const taskController = {
  createTask: async (req, res) => {
    try {
      const task = await taskService.createTask(req.body.description);
      return res.status(201).json(task);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteTask: async (req, res) => {
    try {
      await taskService.deleteTask(req.params.id);
      return res.status(200).json({ message: 'Task successfully deleted' });
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskService.getAllTasks();
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const { description } = req.body;
      const updatedTask = await taskService.updateTask(taskId, { description });
      return res.status(200).json(updatedTask);
    } catch (error) {

      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
      if (error.name === 'NotFoundError') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = taskController;
