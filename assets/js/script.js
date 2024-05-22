// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = parseInt(localStorage.getItem("nextId")) || 1;

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
    document.getElementById('todo-cards').innerHTML = '';
    document.getElementById('in-progress-cards').innerHTML = '';
    document.getElementById('done-cards').innerHTML = '';

    const tasks = readTasksFromStorage();
    console.log('Rendering tasks:', tasks); // To debugg

    tasks.forEach((task) => {
        const taskCard = createTaskCard(task);
        if (task.status === 'To Do') {
            document.getElementById('todo-cards').appendChild(taskCard);
        } else if (task.status === 'In Progress') {
            document.getElementById('in-progress-cards').appendChild(taskCard);
        } else if (task.status === 'Done') {
            document.getElementById('done-cards').appendChild(taskCard);
        }
    });

    $('.draggable').draggable({
        revert: 'invalid',
        opacity: 0.7,
        zIndex: 100,
        helper: 'clone'
    });
}
    

// Todo: create a function to handle adding a new task
function addTask(title, description, dueDate) {
    const task = {
        id: generateTaskId(),
        title,
        description,
        dueDate,
        status: 'To Do'
    };
    taskList.push(task);
    saveTasksToStorage();
    renderTaskList();
}

//Save tasks to local storage
function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Handle form submission
document.getElementById('addTaskForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;

    addTask(title, description, dueDate);

    document.getElementById('addTaskForm').reset();
    $('#formModal').modal('hide');
});


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = parseInt(event.target.dataset.id);
    taskList = taskList.filter(task => task.id !== taskId);
    saveTasksToStorage();
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = parseInt(ui.draggable[0].dataset.id);
    const draggedCardTitle = event.target.querySelector('.card-title').textContent;
    

    taskList.forEach((task) => {
        if (task.id === taskId) {
            if (draggedCardTitle === "To Do") {
                task.status = "To Do";
            } else if (draggedCardTitle === "In Progress") {
                task.status = "In Progress";
            } else if (draggedCardTitle === "Done") {
                task.status = "Done";
            }
        }
    });
    saveTasksToStorage();
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
        hoverClass: 'drop-hover'
    });
    

});
const dueDateInput = document.getElementById('dueDate');
    flatpickr(dueDateInput, {
        dateFormat: 'm-d-Y', // Set the date format
    });