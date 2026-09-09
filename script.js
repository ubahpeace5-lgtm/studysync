const taskForm = document.getElementById("taskForm");

const subjectInput = document.getElementById("subject");
const topicInput = document.getElementById("topic");
const priorityInput = document.getElementById("priority");
const dateInput = document.getElementById("studyDate");

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const contactForm = document.getElementById("contactForm");
const contactName = document.getElementById("contactName");
const contactMessage = document.getElementById("contactMessage");


let tasks = JSON.parse(localStorage.getItem("studySyncTasks")) || [];


taskForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const subject = subjectInput.value.trim();
    const topic = topicInput.value.trim();
    const priority = priorityInput.value;
    const date = dateInput.value;




    if (
        subject === "" ||
        topic === "" ||
        date === ""
    ) {

        alert("Please fill in all the fields.");

        return;

    }


    const task = {

        id: Date.now(),

        subject: subject,

        topic: topic,

        priority: priority,

        date: date,

        completed: false

    };


    tasks.push(task);


    /* Save to localStorage — BONUS */

    saveTasks();


    /* Display tasks */

    displayTasks();


    /* Clear form */

    taskForm.reset();

});



function displayTasks() {

    /* Clear existing task elements */

    const taskItems = document.querySelectorAll(".task-item");

    taskItems.forEach(function(item) {

        item.remove();

    });


    /* Check for empty list */

    if (tasks.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";


        tasks.forEach(function(task) {

            createTask(task);

        });

    }


    updateCounter();

}


function createTask(task) {

    

    const taskItem = document.createElement("div");

    taskItem.classList.add("task-item");


    /* Add completed class if necessary */

    if (task.completed) {

        taskItem.classList.add("completed");

    }


    const taskInfo = document.createElement("div");

    taskInfo.classList.add("task-info");



    const subject = document.createElement("h4");

    subject.textContent = task.subject;

    const topic = document.createElement("p");

    topic.textContent = task.topic;



    const taskMeta = document.createElement("div");

    taskMeta.classList.add("task-meta");


    const priority = document.createElement("span");

    priority.classList.add("priority");

    priority.textContent = task.priority + " Priority";

    const date = document.createElement("span");

    date.classList.add("task-date");

    date.textContent = formatDate(task.date);


    taskMeta.appendChild(priority);

    taskMeta.appendChild(date);

    taskInfo.appendChild(subject);

    taskInfo.appendChild(topic);

    taskInfo.appendChild(taskMeta);



    const taskActions = document.createElement("div");

    taskActions.classList.add("task-actions");


    const completeButton = document.createElement("button");

    completeButton.classList.add("complete-btn");

    completeButton.textContent = task.completed
        ? "✓ Completed"
        : "✓ Complete";


    

    const deleteButton = document.createElement("button");

    deleteButton.classList.add("delete-btn");

    deleteButton.textContent = "Delete";


    

    completeButton.addEventListener("click", function() {

        task.completed = !task.completed;

        displayTasks();

        saveTasks();

    });



    deleteButton.addEventListener("click", function() {

        const taskIndex = tasks.findIndex(function(item) {

            return item.id === task.id;

        });


        if (taskIndex !== -1) {

            

            tasks.splice(taskIndex, 1);

        }


        saveTasks();

        displayTasks();

    });


    taskActions.appendChild(completeButton);

    taskActions.appendChild(deleteButton);


    

    taskItem.appendChild(taskInfo);

    taskItem.appendChild(taskActions);


    /* Add task to page */

    taskList.appendChild(taskItem);

}


function formatDate(dateValue) {

    const date = new Date(dateValue + "T00:00:00");

    return date.toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}



function updateCounter() {

    const total = tasks.length;


    const completed = tasks.filter(function(task) {

        return task.completed === true;

    }).length;


    const pending = total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

}



function saveTasks() {

    localStorage.setItem(
        "studySyncTasks",
        JSON.stringify(tasks)
    );

}

contactForm.addEventListener("submit", function(event) {

    

    event.preventDefault();


    const name = contactName.value.trim();


    if (name === "") {

        return;

    }



    contactMessage.textContent =
        "Thank you, " + name +
        "! Your message has been received.";


    contactForm.reset();

});




displayTasks();
