/* script.js */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskList = document.getElementById("task-list");
let input = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let counter = document.getElementById("task-counter");
let currentFilter = "all";

addBtn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    alert("Please enter a task");
    return;
  }
  tasks.push({ text: input.value.trim(), completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
  });

  filteredTasks.forEach((task, index) => {
    let li = document.createElement("ul");
    li.className = task.completed ? "checked" : "";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    let span = document.createElement("span");
    span.contentEditable = true;
    span.innerText = task.text;
    span.addEventListener("input", () => {
      tasks[index].text = span.innerText;
      saveTasks();
    });

    let del = document.createElement("i");
    del.className = "fas fa-trash";
    del.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);
    taskList.appendChild(li);
  });

  counter.innerText = `Total Tasks: ${tasks.length}`;
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

// Theme initialization
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

renderTasks();
