document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    let taskText = document.getElementById("task").value;
    let taskTime = document.getElementById("taskTime").value;

    if (taskText.trim() === "" || taskTime === "") {
        alert("Please enter a task and set a date & time.");
        return;
    }

    let task = {
        text: taskText,
        time: taskTime,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("task").value = "";
    document.getElementById("taskTime").value = "";
    loadTasks();
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        let taskText = document.createElement("span");
        taskText.innerHTML = `${task.text} <small>(${task.time})</small>`;

        let taskButtons = document.createElement("div");
        taskButtons.className = "task-buttons";

        let completeBtn = document.createElement("button");
        completeBtn.className = "complete";
        completeBtn.innerText = "✔";
        completeBtn.onclick = () => toggleComplete(index);

        let editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.innerText = "✏";
        editBtn.onclick = () => editTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.onclick = () => deleteTask(index);

        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(editBtn);
        taskButtons.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(taskButtons);

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let newText = prompt("Edit Task:", tasks[index].text);
    let newTime = prompt("Edit Date & Time:", tasks[index].time);

    if (newText !== null && newTime !== null) {
        tasks[index].text = newText;
        tasks[index].time = newTime;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
