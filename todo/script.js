// Task Management System with Local Storage

class TodoManager {
    constructor() {
        this.tasks = this.loadFromStorage();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        const addBtn = document.getElementById('addBtn');
        const taskInput = document.getElementById('taskInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const clearCompletedBtn = document.getElementById('clearCompletedBtn');
        const deleteAllBtn = document.getElementById('deleteAllBtn');

        // Add task
        addBtn.addEventListener('click', () => this.addTask());
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter tasks
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Clear and delete
        clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        deleteAllBtn.addEventListener('click', () => this.deleteAll());
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const taskText = input.value.trim();

        if (!taskText) {
            alert('Please enter a task!');
            return;
        }

        // XSS Protection: Escape HTML
        const task = {
            id: Date.now(),
            text: this.escapeHtml(taskText),
            completed: false,
            createdAt: new Date().toLocaleString()
        };

        this.tasks.push(task);
        this.saveToStorage();
        input.value = '';
        input.focus();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.render();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveToStorage();
        this.render();
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveToStorage();
        this.render();
    }

    deleteAll() {
        if (this.tasks.length === 0) {
            alert('No tasks to delete!');
            return;
        }
        if (confirm('Are you sure? This cannot be undone.')) {
            this.tasks = [];
            this.saveToStorage();
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    render() {
        this.updateStats();
        this.renderTaskList();
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
    }

    renderTaskList() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<li class="empty-state"><p>No tasks yet. Add one to get started! 🚀</p></li>';
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox"
                    ${task.completed ? 'checked' : ''}
                    onchange="todoManager.toggleTask(${task.id})"
                >
                <div class="task-content">
                    <div class="task-text">${task.text}</div>
                    <div class="task-date">${task.createdAt}</div>
                </div>
                <button class="delete-task-btn" onclick="todoManager.deleteTask(${task.id})">Delete</button>
            </li>
        `).join('');
    }

    saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.tasks));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('todos');
        return stored ? JSON.parse(stored) : [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app
let todoManager;
document.addEventListener('DOMContentLoaded', () => {
    todoManager = new TodoManager();
});