const { Todo } = require('../models/todo');

async function getTodos() {
    try {
        return await Todo.findAll();
    } catch (err) {
        console.error('Error fetching todos in service:', err);
        throw err;
    }
}

async function addTodo(text) {
    try {
        return await Todo.create({ text });
    } catch (err) {
        console.error('Error adding todo in service:', err);
        throw err;
    }
}

async function updateTodo(id, text) {
    try {
        const [updated] = await Todo.update({ text }, { where: { id } });
        if (updated) {
            return await Todo.findByPk(id);
        }
        throw new Error('Todo not found');
    } catch (err) {
        console.error('Error updating todo in service:', err);
        throw err;
    }
}

async function deleteTodo(id) {
    try {
        const deleted = await Todo.destroy({ where: { id } });
        if (!deleted) {
            throw new Error('Todo not found');
        }
    } catch (err) {
        console.error('Error deleting todo in service:', err);
        throw err;
    }
}

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };