import axios from 'axios';
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const API_URL = process.env.API_URL;

const getAllTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createTask = async (description) => {
  try {
    const response = await axios.post(`${API_URL}/`, { description });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, description) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, { description });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
