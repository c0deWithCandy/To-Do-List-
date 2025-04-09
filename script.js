document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const priorityInput = document.getElementById("priorityInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const showAll = document.getElementById("showAll");
    const showCompleted = document.getElementById("showCompleted");
    const showIncomplete = document.getElementById("showIncomplete");
    const darkModeToggle = document.getElementById("darkModeToggle");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let isDarkMode = localStorage.getItem("isDarkMode") === "true";
  
    // Apply dark mode on load
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
  
    // Render tasks
    function renderTasks(filter = "all") {
      taskList.innerHTML = "";
      const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
      });
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");
        li.innerHTML = `
          <div class="task-info">
            <strong>${task.text}</strong>
            <span>Due: ${task.dueDate} | Priority: ${task.priority}</span>
          </div>
          <div class="actions">
            <button onclick="toggleComplete(${index})"><i class="fas fa-check"></i></button>
            <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
          </div>
        `;
        taskList.appendChild(li);
      });
    }
  
    // Add task
    addTaskBtn.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      const dueDate = dueDateInput.value;
      const priority = priorityInput.value;
      if (taskText !== "") {
        tasks.push({ text: taskText, dueDate, priority, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        dueDateInput.value = "";
        renderTasks();
      }
    });
  
    // Toggle complete
    window.toggleComplete = function (index) {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
  
    // Delete task
    window.deleteTask = function (index) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
  
    // Filters
    showAll.addEventListener("click", () => renderTasks("all"));
    showCompleted.addEventListener("click", () => renderTasks("completed"));
    showIncomplete.addEventListener("click", () => renderTasks("incomplete"));
  
    // Dark mode toggle
    darkModeToggle.addEventListener("click", function () {
      isDarkMode = !isDarkMode;
      localStorage.setItem("isDarkMode", isDarkMode);
      document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
      darkModeToggle.innerHTML = isDarkMode
        ? '<i class="fas fa-sun"></i> Light Mode'
        : '<i class="fas fa-moon"></i> Dark Mode';
    });
  
    // Initial render
    renderTasks();
  });