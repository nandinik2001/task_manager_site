    document.addEventListener('DOMContentLoaded', () => {
        const taskInput = document.getElementById('task-input');
        const taskTimeInput = document.getElementById('task-time');
        const addTaskBtn = document.getElementById('add-task-btn');
        const taskCardsContainer = document.querySelector('.task-cards');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
        const menuItems = document.querySelectorAll('.sidebar ul li');
    
        const renderTasks = (filter = 'all') => {
        taskCardsContainer.innerHTML = '';
        tasks
            .filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
            })
            .forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            taskCard.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.time ? task.time : ''}</p>
                <p>${task.description || ''}</p>
                <button class="edit-btn">Edit</button>
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            `;
            taskCardsContainer.appendChild(taskCard);
    
            taskCard.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));
            taskCard.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task.id));
            taskCard.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
            });
        };
    
        const addTask = () => {
        const taskName = taskInput.value.trim();
        const taskTime = taskTimeInput.value;
        if (taskName === '') return;
        const newTask = {
            id: Date.now(),
            name: taskName,
            time: taskTime,
            description: '',
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        taskTimeInput.value = '';
        saveTasks();
        renderTasks();
        };
    
        const editTask = id => {
        const newName = prompt('Edit task name:');
        if (newName) {
            const task = tasks.find(task => task.id === id);
            task.name = newName;
            saveTasks();
            renderTasks();
        }
        };
    
        const toggleComplete = id => {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        };
    
        const deleteTask = id => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            saveTasks();
            renderTasks();
        }
        };
    
        const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        };
    
        menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const filter = item.textContent.toLowerCase();
            renderTasks(filter);
        });
        });
    
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addTask();
        });
    
        renderTasks();
    });
    



    