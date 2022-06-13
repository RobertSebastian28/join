let allTasks = [];

function addToAllTasks() {
    let title = document.getElementById('add-task-title');
    let dueDate = document.getElementById('add-task-dueDate');
    let categoryA = document.getElementById("add-task-category");
    let category = categoryA.options[categoryA.selectedIndex].text;
    let urgencyA = document.getElementById("add-task-urgency");
    let urgency = urgencyA.options[urgencyA.selectedIndex].text;
    let description = document.getElementById('add-task-description');

    let tasks = {
       "title": title.value,
       "dueDate": dueDate.value,
       "category": category,
       "urgency": urgency,
       "description": description.value
    };

    allTasks.push(tasks);

    deleteInputValue();
}

function deleteInputValue() { // durch <form> vieleicht nicht notwendig
    document.getElementById('add-task-title').value = '';
    document.getElementById('add-task-dueDate').value = '';
    document.getElementById("add-task-category").selectedIndex = 0;
    document.getElementById("add-task-urgency").selectedIndex = 0;
    document.getElementById('add-task-description').value = '';
}