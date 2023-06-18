// Retrieve tasks from local storage if available, or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM elements
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task-input');

// Function to render the task list
function renderTaskList() {
  // Clear the existing task list
  taskList.innerHTML = '';

  // Iterate through each task and create a list item
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    // Add event listener for single-click to toggle completion
    li.addEventListener('click', () => {
      toggleTaskCompletion(li, index);
    });

    // Add event listener for double-click to remove the task
    li.addEventListener('dblclick', () => {
      removeTask(index);
    });

    // Add event listener for right-click to edit the task
    li.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      editTask(li, index);
    });

    // Append the list item to the task list
    taskList.appendChild(li);
  });
}

// Function to toggle task completion
function toggleTaskCompletion(li, index) {
  li.classList.toggle('completed');
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

// Function to remove a task
function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTaskList();
}

// Function to edit a task
function editTask(li, index) {
  const editedText = prompt('Edit the task:', tasks[index].text);
  if (editedText !== null) {
    const trimmedText = editedText.trim();
    if (trimmedText !== '') {
      tasks[index].text = trimmedText;
      li.textContent = trimmedText;
      saveTasks();
    }
  }
}

// Function to add a new task
function addTask(event) {
  if (event.key === 'Enter') {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
      const newTask = { text: taskText, completed: false };
      tasks.push(newTask);
      saveTasks();
      renderTaskList();
      newTaskInput.value = '';
    }
  }
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for Enter key press
newTaskInput.addEventListener('keypress', addTask);

// Render the initial task list
renderTaskList();
