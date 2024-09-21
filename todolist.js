document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span>${taskText}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        taskInput.value = '';
        updateTaskListeners();
    }

    function updateTaskListeners() {
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');
        const checkboxes = document.querySelectorAll('.task-checkbox');

        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const taskItem = e.target.parentElement;
                const taskText = taskItem.querySelector('span').textContent;
                const newTaskText = prompt('Edit task:', taskText);
                if (newTaskText) {
                    taskItem.querySelector('span').textContent = newTaskText;
                }
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.target.parentElement.remove();
            });
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskItem = e.target.parentElement;
                if (e.target.checked) {
                    taskItem.classList.add('completed');
                } else {
                    taskItem.classList.remove('completed');
                }
            });
        });
    }

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    updateTaskListeners();
});
