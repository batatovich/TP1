const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const taskController = require('.././controllers/task-controller');
const taskService = require('.././services/task-service');

const app = express();
app.use(express.json());

app.put('/tasks/:id', taskController.updateTask);
app.post('/tasks', taskController.createTask);
app.delete('/tasks/:id', taskController.deleteTask);
app.get('/tasks/all', taskController.getAllTasks);

describe('Task Controller - Create Task', () => {
  afterEach(() => {
    sinon.restore(); // Clean up after each test
  });

  it('should create a task and return 201 status', async () => {
    const mockTask = { id: '1', description: 'New task' };

    sinon.stub(taskService, 'createTask').resolves(mockTask);

    const res = await request(app)
      .post('/tasks')
      .send({ description: 'New task' });

    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal(mockTask);
  });

  it('should return 400 if validation error occurs', async () => {
    sinon.stub(taskService, 'createTask').rejects({ name: 'ValidationError', message: 'Description is required' });

    const res = await request(app)
      .post('/tasks')
      .send({ description: '' }); // Invalid input

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Description is required');
  });

  it('should return 500 if an unexpected error occurs', async () => {
    sinon.stub(taskService, 'createTask').rejects(new Error('Unexpected error'));

    const res = await request(app)
      .post('/tasks')
      .send({ description: 'New task' });

    expect(res.status).to.equal(500);
    expect(res.body.error).to.equal('Internal Server Error');
  });
});


describe('Task Controller - Delete Task', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should delete a task and return 200 status', async () => {
    sinon.stub(taskService, 'deleteTask').resolves(true);

    const res = await request(app)
      .delete('/tasks/1');

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Task successfully deleted');
  });

  it('should return 404 if task is not found', async () => {
    sinon.stub(taskService, 'deleteTask').rejects({ name: 'NotFoundError', message: 'Task not found' });

    const res = await request(app)
      .delete('/tasks/1');

    expect(res.status).to.equal(404);
    expect(res.body.error).to.equal('Task not found');
  });

  it('should return 500 if an unexpected error occurs', async () => {
    sinon.stub(taskService, 'deleteTask').rejects(new Error('Unexpected error'));

    const res = await request(app)
      .delete('/tasks/1');

    expect(res.status).to.equal(500);
    expect(res.body.error).to.equal('Internal Server Error');
  });
});


describe('Task Controller - Update Task', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should update a task and return 200 status', async () => {
    const mockTask = { id: '1', description: 'Updated task' };

    // Stub the service method to return the mock task
    sinon.stub(taskService, 'updateTask').resolves(mockTask);

    const res = await request(app)
      .put('/tasks/1')
      .send({ description: 'Updated task' });

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(mockTask);
  });

  it('should return 404 if task is not found', async () => {
    sinon.stub(taskService, 'updateTask').rejects({ name: 'NotFoundError', message: 'Task not found' });

    const res = await request(app)
      .put('/tasks/1')
      .send({ description: 'Updated task' });

    expect(res.status).to.equal(404);
    expect(res.body.error).to.equal('Task not found');
  });

  it('should return 400 if validation error occurs', async () => {
    sinon.stub(taskService, 'updateTask').rejects({ name: 'ValidationError', message: 'Invalid description' });

    const res = await request(app)
      .put('/tasks/1')
      .send({ description: '' }); // Invalid input

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Invalid description');
  });

  it('should return 500 if an unexpected error occurs', async () => {
    sinon.stub(taskService, 'updateTask').rejects(new Error('Unexpected error'));

    const res = await request(app)
      .put('/tasks/1')
      .send({ description: 'Updated task' });

    expect(res.status).to.equal(500);
    expect(res.body.error).to.equal('Internal Server Error');
  });
});

describe('Task Controller - Get All Tasks', () => {
  afterEach(() => {
    sinon.restore(); // Restore the original methods after each test
  });

  it('should return a list of tasks and 200 status', async () => {
    const mockTasks = [
      { id: '1', description: 'Task 1' },
      { id: '2', description: 'Task 2' }
    ];

    sinon.stub(taskService, 'getAllTasks').resolves(mockTasks);

    const res = await request(app)
      .get('/tasks/all');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(mockTasks);
  });

  it('should return an empty array if no tasks are found', async () => {
    sinon.stub(taskService, 'getAllTasks').resolves([]);

    const res = await request(app)
      .get('/tasks/all');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal([]);
  });

  it('should return 500 if an unexpected error occurs', async () => {
    sinon.stub(taskService, 'getAllTasks').rejects(new Error('Unexpected error'));

    const res = await request(app)
      .get('/tasks/all');

    expect(res.status).to.equal(500);
    expect(res.body.error).to.equal('Internal Server Error');
  });
});
