//1. Xây dựng ứng dụng Todo App

const tasks = JSON.parse(localStorage.getItem("tasks")) ?? []

const tasksList = document.querySelector("#task-list")
const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector("#todo-input")

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
    if(tasks.length === 0) {
        const empty = `<div style="text-align: center; color: #ccc; font-style: italic">No tasks available</div>`
        tasksList.innerHTML = empty
        return
    }
    const html = tasks.map( (task, index) => `
            <li class="task-item ${task.completed ? "completed" : ""}" data-index= "${index}" >
                <span class="task-title">${escapeHTML(task.title)}</span>
                <div class="task-action">
                    <button class="task-btn edit">Edit</button>
                    <button class="task-btn done">Mark as undone</button>
                    <button class="task-btn delete">Delete</button>
                </div>
            </li>
`).join("")

    tasksList.innerHTML = html

}
renderTasks()


function addTasks(e) {
    e.preventDefault()
    const value = todoInput.value
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
        tasks.splice(taskIndex, 1)
        renderTasks()
        saveTasks()
    }
}





tasksList.addEventListener("click", handleTaskList)
todoForm.addEventListener("submit", addTasks)