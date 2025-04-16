document.addEventListener('DOMContentLoaded', () => {
    const addTodoForm = document.getElementById('addTodoForm');
    const todoTextInput = document.getElementById('todoText');
    const editModal = document.getElementById('editModal');
    const editTextInput = document.getElementById('editText');
    const editForm = document.getElementById('editForm');
    const cancelEdit = document.getElementById('cancelEdit');

    let currentTodoId;

    addTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoTextInput.value.trim();
        if (text) {
            axios.post('/api/todos', { text })
                .then(() => {
                    todoTextInput.value = '';
                    location.reload();
                })
                .catch(err => {
                    console.error(err);
                    alert('Ошибка при добавлении задачи');
                });
        }
    });

    const showEditModal = (id, text) => {
        currentTodoId = id;
        editTextInput.value = text;
        editModal.style.display = 'block';
    }

    const hideEditModal = () => {
        editModal.style.display = 'none';
    }

    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Кнопка "Изменить" нажата для ID:', button.getAttribute('data-id'));
            const id = button.getAttribute('data-id');
            const text = button.getAttribute('data-text');
            showEditModal(id, text);
        });
    });

    cancelEdit.addEventListener('click', hideEditModal);

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newText = editTextInput.value.trim();
        if (newText) {
            axios.put(`/api/todos/${currentTodoId}`, { text: newText })
                .then(() => {
                    hideEditModal();
                    location.reload();
                })
                .catch(err => {
                    console.error(err);
                    alert('Ошибка при обновлении задачи');
                });
        }
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Кнопка "Удалить" нажата для ID:', button.getAttribute('data-id'));
            const id = button.getAttribute('data-id');
            axios.delete(`/api/todos/${id}`)
                .then(() => {
                    location.reload();
                })
                .catch(err => {
                    console.error(err);
                    alert('Ошибка при удалении задачи');
                });
        });
    });
});
