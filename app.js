const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "public");
const port = 3030

app.use(express.static(publicPath));

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event){
    event.preventDefault();

    //To Do div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Add to do to LocalStorage
    saveLocalTodos(todoInput.value);
    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class="fas fa-check"></i>";
    completedButton.classList.add("complete-btn");
    todoButton.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class="fas fa-trash"></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //Delete toDo
    if (item.classList[0]=== "trash-btn") {
        const todo = item.parentElement;
        //Create animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    //Check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function getTodos() {
    // Check if something exists
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        // todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class="fas fa-check"></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class="fas fa-trash"></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
