const Task = require('../models/task-model');

const taskService = {
  createTask: async (taskDescription) => {
    const task = await Task.create({ description: taskDescription });
    return task;
  },

  getAllTasks: async () => {
    return await Task.findAll();
  },

  deleteTask: async (taskId) => {
    await Task.destroy({ where: { id: taskId } })
  }
};

module.exports = taskService;
