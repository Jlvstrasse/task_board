// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

function readTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const id = nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('task-card', 'card', 'mb-3', 'draggable');
    card.dataset.id = task.id;
    card.dataset.status = task.status;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = task.title;
    cardBody.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = task.description;
    cardBody.appendChild(description);

    const dueDate = document.createElement('p');
    dueDate.classList.add('card-text');
    dueDate.textContent = `Due: ${task.dueDate}`;
    cardBody.appendChild(dueDate);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'delete-button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.id = task.id; 
    deleteBtn.addEventListener('click', handleDeleteTask); 
    cardBody.appendChild(deleteBtn);

    // Color coding based on due date
    const now = dayjs();
    const due = dayjs(task.dueDate, 'MM/DD/YYYY');
    if (due.isBefore(now)) {
        card.classList.add('bg-danger', 'text-white');
    } else if (due.isBefore(now.add(2, 'day'))) {
        card.classList.add('bg-warning', 'text-white');
    } else {
        card.classList.add('bg-success', 'text-white');
    }

    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});