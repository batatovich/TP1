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
  },

  updateTask: async (taskId, updatedData) => {
    const [updated, updatedTasks] = await Task.update(updatedData, {
      where: { id: taskId },
      returning: true,
    });

    if (updated === 0) {
      return null;
    } else {
      return updatedTasks[0]
    }
  },
};

module.exports = taskService;
