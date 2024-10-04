// Select elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const taskPriority = document.getElementById('task-priority');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task
addBtn.addEventListener('click', function() {
    const taskText = todoInput.value.trim();
    const priority = taskPriority.value;

    if (taskText !== '') {
        addTask(taskText, priority);
        saveTasks();
    }
});

// Function to add a task to the list
function addTask(taskText, priority) {
    const li = document.createElement('li');
    li.classList.add(`${priority}-priority`);

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div>
            <button class="edit">Edit</button>
            <button class="remove">Delete</button>
        </div>
    `;

    // Mark task as completed
    li.querySelector('.task-text').addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Edit task
    li.querySelector('.edit').addEventListener('click', function() {
        const newText = prompt("Edit your task:", taskText);
        if (newText) {
            li.querySelector('.task-text').textContent = newText;
            saveTasks();
        }
    });

    // Remove task
    li.querySelector('.remove').addEventListener('click', function() {
        li.remove();
        saveTasks();
    });

    todoList.appendChild(li);
    todoInput.value = '';  // Clear input field
    taskPriority.value = 'low';  // Reset priority
}

// Clear all completed tasks
clearCompletedBtn.addEventListener('click', function() {
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach(task => task.remove());
    saveTasks();
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('li');
    taskItems.forEach(item => {
        tasks.push({
            text: item.querySelector('.task-text').textContent,
            completed: item.classList.contains('completed'),
            priority: item.classList[0]
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            addTask(task.text, task.priority);
            if (task.completed) {
                const lastTask = todoList.lastElementChild;
                lastTask.classList.add('completed');
            }
        });
    }
}
