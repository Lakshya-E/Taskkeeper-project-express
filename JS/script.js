const { validate } = require("../models/userData");

let toDoItem = document.getElementById("txt");

toDoItem.addEventListener("keydown", function(e) {
    if (e.key == 'Enter') {
        funcOnClick();
    }
})

function afterEnter() {
    toDoItem.value = null;
}

const userForm = document.addEventListener("inputData-form");
userForm.noValidate = true;

userForm.addEventListener("submit", validateForm);

function validateForm(event) {
    const form = event.target;
    if (!toDoItem.value) {
        event.preventDefault();
        Array.from(form.elements).forEach(i => {
            if (i.checkValidity()) {
                // field is valid - remove class
                i.parentElement.classList.remove('invalid');
            } else {
                // field is invalid - add class
                i.parentElement.classList.add('invalid');
            }
        });
    }

}

function funcOnClick() {
    if (!toDoItem.value) {
        alert("Enter Your Task");
    } else {
        addToTask();
        afterEnter();
    }

}

let tasks = []; // Array
let taskId = 1; //Array Id; 

function addToTask() {

    task = {}; //object
    task.title = toDoItem.value;
    task.status = 'pending';

    task.taskId = taskId;
    taskId++;

    tasks.push(task);
    addDom(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function fetchdata() {

    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        taskId = 0;

        tasks.forEach(function(task) {
            if (taskId < task.taskId)
                taskId = task.taskId;

            addDom(task);
        });

        taskId++;

    } else {
        task = [];
    }
}


function addDom(task) {
    let div = document.createElement("div");
    div.classList.add("divElements")

    let label = document.createElement("label");
    label.innerHTML = task.title;

    let rightSide = document.createElement("div");

    let element = document.createElement("input");
    element.type = "checkbox";

    let deleteX = document.createElement("button");
    deleteX.innerHTML = "x";

    let brTag = document.createElement("br");

    let line = document.createElement("hr");
    //element.innerHTML = "";
    line.setAttribute("id", "line");
    deleteX.setAttribute("id", "deleteBtn");
    label.setAttribute("id", "labelTask");
    rightSide.setAttribute("id", "rightsideDiv");

    if (task.status == 'completed') {
        label.style.textDecoration = "Line-through";
        label.style.color = "rgb(241, 156, 156)";
        element.checked = true;
    } else {
        label.style.textDecoration = "none";
        label.style.color = "rgb(190, 190, 190)";
    }

    element.addEventListener("click", function() {
        if (element.checked == true) {
            label.style.textDecoration = "Line-through";
            label.style.color = "rgb(241, 156, 156)";
        } else {
            label.style.textDecoration = "none";
            label.style.color = "rgb(190, 190, 190)";
        }
        updateStatus(task.taskId);
    });

    div.appendChild(label);

    rightSide.append(element);

    rightSide.appendChild(deleteX);

    div.appendChild(rightSide);

    div.appendChild(brTag);
    div.appendChild(line);

    checkboxes.appendChild(div);

    label.classList.add("taskName");
    rightSide.classList.add("rigthElements")
    element.classList.add("checkB");
    deleteX.classList.add("ResetBtn");

    deleteX.addEventListener("click", function() {
        checkboxes.removeChild(div);
        removeFromArray(task.taskId);
    });
    console.log(tasks);
}

function removeFromArray(id) {
    tasks = tasks.filter(function(data) {
        return data.taskId != id;
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
}

function updateStatus(id) {
    tasks = tasks.map(function(data) {
        if (data.taskId == id) {
            if (data.status == 'pending')
                data.status = 'completed';
            else
                data.status = 'pending';
        }
        return data;
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
}

fetchdata();

// $('#ResetBtn').click(function(){
//   let deletetaskName = document.getElementById("TaskName");
//   let deleteElement = document.getElementById("checkB");
//   let deleteButtonX = document.getElementById("ResetBtn");


// })
// let cross = document.getElementById("deleteAll");