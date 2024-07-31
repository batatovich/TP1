const taskService = require('../services/task-service');

//check sql injection
const taskController = {
  create: async (req, res) => {
    const { description } = req.body;
    try {
      const id = await taskService.create(description)
      return res.status(201).json(id);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.body;
    try {
      await taskService.delete(id);
      return res.status(200);
    } catch (error) {
      return res.status(401).json({ error: error.message })
    }
  },

  all: async (req, res) => {
    try {
      await taskService.all();
      return res.status(200);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = taskController;
