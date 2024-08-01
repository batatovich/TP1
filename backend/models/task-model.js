const { DataTypes } = require('sequelize');
const sequelize = require('.././config/db');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { tableName: process.env.DB_TABLE_NAME || 'tasks', timestamps: false });

module.exports = Task;
