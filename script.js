// Array para armazenar as tarefas
let tasks = [];

// Função para adicionar uma nova tarefa
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }
    
    // Criar objeto da tarefa
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    // Adicionar ao array
    tasks.push(task);
    
    // Limpar o input
    taskInput.value = '';
    
    // Atualizar a lista na tela
    renderTasks();
}

// Função para renderizar as tarefas na lista
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        li.innerHTML = `
            <span onclick="toggleTask(${task.id})" style="cursor: pointer; ${task.completed ? 'text-decoration: line-through; color: #888;' : ''}">${task.text}</span>
            <button onclick="deleteTask(${task.id})" style="float: right; background-color: #d9534f; margin-left: 10px;">Excluir</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Função para marcar/desmarcar tarefa como concluída
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Função para excluir uma tarefa
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

// Permitir adicionar tarefa pressionando Enter
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});
