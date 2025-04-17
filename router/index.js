const express = require('express');
const index = express.Router();
const todoController = require('../controllers/todoController');

index.get('/', todoController.renderHome);
index.post('/api/todos', todoController.addTodoHandle);
index.put('/api/todos/:id', todoController.updateTodoHandler);
index.delete('/api/todos/:id', todoController.deleteTodoHandler);

module.exports = index;
