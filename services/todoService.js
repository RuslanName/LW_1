const Todo = require('../models/todo');

const todoService = {
    getTodos: async () => {
        try {
            return await Todo.findAll();
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    addTodo: async (text) => {
        try {
            return await Todo.create({text});
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    updateTodo: async (id, text) => {
        try {
            const [updated] = await Todo.update({text}, {where: {id}});
            if (updated) {
                return await Todo.findByPk(id);
            }
            throw new Error('Todo not found');
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    deleteTodo: async (id) => {
        try {
            const deleted = await Todo.destroy({where: {id}});
            if (!deleted) {
                throw new Error('Todo not found');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = todoService;
