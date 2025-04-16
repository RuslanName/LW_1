const fs = require('fs/promises');
const path = require('path');
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../services/todoService');

async function renderHome(req, res) {
    try {
        const todos = await getTodos();

        const rowsHtml = todos.map(todo => `
            <tr>
                <td>${todo.id}</td>
                <td>
                    ${todo.text}
                    <button class="delete-button" data-id="${todo.id}">
                        Удалить
                    </button>
                    <button 
                        class="edit-button"
                        data-id="${todo.id}"
                        data-text="${todo.text}"
                    >
                        Изменить
                    </button>
                </td>
            </tr>
        `).join('');

        const template = await fs.readFile(path.join(__dirname, '../index.html'), 'utf8');
        const finalHtml = template.replace('{{rows}}', rowsHtml);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(finalHtml);
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function addTodoHandler(req, res) {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).send('Text is required');
        }
        await addTodo(text);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

async function updateTodoHandler(req, res) {
    try {
        const { id } = req.params;
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }
        const updatedTodo = await updateTodo(id, text);
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteTodoHandler(req, res) {
    try {
        const { id } = req.params;
        await deleteTodo(id);
        res.status(200).json({ message: 'Todo deleted' });
    } catch (err) {
        if (err.message === 'Todo not found') {
            return res.status(404).json({ error: 'Todo not found' });
        }
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { renderHome, addTodoHandler, updateTodoHandler, deleteTodoHandler };