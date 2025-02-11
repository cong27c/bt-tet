//1. Xây dựng ứng dụng Todo App

const tasks = (() => {
    try {
        return JSON.parse(localStorage.getItem("tasks")) ?? [];
    } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        return []; 
    }
})();

const tasksList = document.querySelector("#task-list")
const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector("#todo-input")
const doneListButton = document.querySelector("#doneList");
const activeListButton = document.querySelector("#activeList");
const allTaskButton = document.querySelector("#allTask");

let currentFilter = 'all';
function isDuplicate(newTitle, taskIndex = -1) {
    return tasks.some( (task, index) => {
        return task.title.toLocaleLowerCase().trim() === newTitle.toLocaleLowerCase().trim() && index !== taskIndex
    })
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function escapeHTML(html) {
    const div = document.createElement("div")
    div.textContent = html
    return div.innerHTML
}


function renderTasks() {
    let filteredTasks = tasks;

    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'done') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        const empty = `<div style="text-align: center; color: #ccc; font-style: italic">No tasks available</div>`;
        tasksList.innerHTML = empty;
        return;
    }

    const html = filteredTasks.map((task, index) => `
        <li class="task-item ${task.completed ? "completed" : ""}" data-index="${index}">
            <span class="task-title">${escapeHTML(task.title)}</span>
            <div class="task-action">
                <button class="task-btn edit">Edit</button>
                <button class="task-btn done">${task.completed ? "Mark as undone" : "Mark as done"}</button>
                <button class="task-btn delete">Delete</button>
            </div>
        </li>
    `).join("");

    tasksList.innerHTML = html;
}
renderTasks()


function addTasks(e) {
    e.preventDefault()
    const value = todoInput.value.trim()
    if(!value) return alert("vui long nhap du lieu")

    if(isDuplicate(value)) return alert("phan tu bi trung lap")

    const newTasks = {
        title: value,
        completed: false
    }

    tasks.push(newTasks)
    renderTasks()
    saveTasks()
    todoInput.value = ""
}


function handleTaskList(e) {
    const taskItem = e.target.closest(".task-item")
    const taskIndex = +taskItem.dataset.index
    const task = tasks[taskIndex]
   

    if(e.target.closest(".edit")) {
        const newTitle = prompt("nhap du lieu vao day", task.title)
        if(newTitle === null) return

        if(isDuplicate(newTitle, taskIndex)) {
            alert("phan tu bi trung lap")
            return
        }

        if(newTitle.trim()) {
            task.title = newTitle
        } else {
            alert("du lieu ko hop le vui long nhap lai")
        }
        renderTasks()
        saveTasks()
    }
    if(e.target.closest(".done")) {
        task.completed  = !task.completed
        renderTasks()
        saveTasks()
    }
    if(e.target.closest(".delete")) {
        if(confirm("ban chac chan muon xoa chu ?")) {
            tasks.splice(taskIndex, 1)
            renderTasks()
            saveTasks()
        }
    }
}

allTaskButton.addEventListener("click", () => {
    currentFilter = 'all';
    renderTasks();
});

activeListButton.addEventListener("click", () => {
    currentFilter = 'active';
    renderTasks();
});

doneListButton.addEventListener("click", () => {
    currentFilter = 'done';
    renderTasks();
});


tasksList.addEventListener("click", handleTaskList)
todoForm.addEventListener("submit", addTasks)



