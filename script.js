// Array para armazenar as tarefas
let tasks = [];
let currentFilter = 'all'; // Filtro atual: 'all', 'active', 'completed'

// Carregar tarefas do localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// Salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

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
    
    // Salvar no localStorage
    saveTasks();
    
    // Atualizar a lista na tela
    renderTasks();
}

// Função para renderizar as tarefas na lista
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    // Filtrar tarefas baseado no filtro atual
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    // Verificar se há tarefas para mostrar
    if (filteredTasks.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Nenhuma tarefa encontrada</p>';
        taskList.appendChild(emptyLi);
        return;
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.padding = '10px';
        li.style.marginBottom = '5px';
        li.style.backgroundColor = '#f9f9f9';
        li.style.borderRadius = '5px';
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" style="margin-right: 10px;">
            <span contenteditable="true" onblur="editTask(${task.id}, this)" onkeydown="handleKeyPress(event, ${task.id})" 
                  style="flex: 1; cursor: text; ${task.completed ? 'text-decoration: line-through; color: #888;' : ''}">${task.text}</span>
            <button onclick="deleteTask(${task.id})" style="background-color: #d9534f; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 10px;">✕</button>
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
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Função para editar uma tarefa
function editTask(id, element) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newText = element.textContent.trim();
        if (newText !== '' && newText !== task.text) {
            task.text = newText;
            saveTasks();
            renderTasks();
        } else if (newText === '') {
            element.textContent = task.text; // Restaurar texto original
        }
    }
}

// Função para lidar com teclas durante edição
function handleKeyPress(event, id) {
    if (event.key === 'Enter') {
        event.preventDefault();
        event.target.blur(); // Remove foco para acionar o onblur
    } else if (event.key === 'Escape') {
        event.preventDefault();
        const task = tasks.find(t => t.id === id);
        if (task) {
            event.target.textContent = task.text; // Restaurar texto original
            event.target.blur();
        }
    }
}

// Função para definir filtro
function setFilter(filter) {
    currentFilter = filter;
    
    // Atualizar estado visual dos botões de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`filter-${filter}`).classList.add('active');
    
    renderTasks();
}

// Função para limpar todas as tarefas concluídas
function clearCompleted() {
    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length > 0) {
        if (confirm(`Deseja excluir ${completedTasks.length} tarefa(s) concluída(s)?`)) {
            tasks = tasks.filter(task => !task.completed);
            saveTasks();
            renderTasks();
        }
    } else {
        alert('Não há tarefas concluídas para limpar.');
    }
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
