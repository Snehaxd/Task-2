const form = document.getElementById("contactForm");
const statusEl = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    return showStatus("All fields are required.", "error");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return showStatus("Please enter a valid email address.", "error");
  }

  showStatus("Message sent successfully!", "success");
  form.reset();
});

function showStatus(message, type) {
  statusEl.textContent = message;
  statusEl.style.color = type === "error" ? "red" : "green";
}



class TodoApp {
  constructor() {
    this.taskInput = document.getElementById('taskInput');
    this.taskList = document.getElementById('taskList');
    this.addBtn = document.getElementById('addBtn');
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    this.addBtn.addEventListener('click', () => this.addTask());
    this.renderTasks();
  }

  addTask() {
    const text = this.taskInput.value.trim();
    if (!text) return;

    const task = { id: Date.now(), text };
    this.tasks.push(task);
    this.updateStorage();
    this.renderTasks();
    this.taskInput.value = '';
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.updateStorage();
    this.renderTasks();
  }

  renderTasks() {
    this.taskList.innerHTML = '';
    this.tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${task.text}
        <button onclick="todoApp.deleteTask(${task.id})">Delete</button>
      `;
      this.taskList.appendChild(li);
    });
  }

  updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

const todoApp = new TodoApp();