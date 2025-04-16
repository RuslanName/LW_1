const express = require('express');
const index = express.Router();
const { renderHome, addTodoHandler, updateTodoHandler, deleteTodoHandler } = require('../controllers/todoController');

index.get('/', renderHome);
index.post('/api/todos', addTodoHandler);
index.put('/api/todos/:id', updateTodoHandler);
index.delete('/api/todos/:id', deleteTodoHandler);

module.exports = index;