const Task = require('../models/task-model');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const taskService = {
  createTask: async (description) => {
    if (!description || description.trim() === '') {
      throw new ValidationError('Description is required');
    }
    const task = await Task.create({ description });
    return task;
  },

  deleteTask: async (id) => {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    await task.destroy();
    return true;
  },

  getAllTasks: async () => {
    return await Task.findAll({
      order: [['created_at', 'DESC']]
    });
  },

  updateTask: async (id, data) => {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    if (!data.description || data.description.trim() === '') {
      throw new ValidationError('Description is required');
    }
    await task.update(data);
    return task;
  },
};

module.exports = taskService;
