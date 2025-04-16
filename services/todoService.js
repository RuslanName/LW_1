const { Todo } = require('../models/todo');

const getTodos = async() => {
    try {
        return await Todo.findAll();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const addTodo = async(text) => {
    try {
        return await Todo.create({ text });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const updateTodo = async(id, text) => {
    try {
        const [updated] = await Todo.update({ text }, { where: { id } });
        if (updated) {
            return await Todo.findByPk(id);
        }
        throw new Error('Todo not found');
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const deleteTodo = async(id) => {
    try {
        const deleted = await Todo.destroy({ where: { id } });
        if (!deleted) {
            throw new Error('Todo not found');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
