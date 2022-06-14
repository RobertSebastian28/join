
//testing Data:

let data = [
    {
        "title": "test1",
        "description": "blablabla1",
        "board": "backlog",
        "dueDate": 1655215119231,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    },
    {
        "title": "test2",
        "description": "blablabla2 dsjhf asdkhgflkasdj hflksjdhflk asdhkflhlkj dlkfhak dhflkhasdlk fhlksjdhflk asdhfksd hfkaskghd gkhadlkgh aphdip ",
        "board": "todo",
        "dueDate": 1655215119231,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    },
    {
        "title": "test3",
        "description": "blablabla3",
        "board": "progress",
        "dueDate": 1655215119231,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    },
    {
        "title": "test4",
        "description": "blablabla4",
        "board": "testing",
        "dueDate": 1655215119231,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    },
    {
        "title": "test5",
        "description": "blablabla5",
        "board": "done",
        "dueDate": 1655215119231,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    }
];

/**
 * saves to backend.   // has to be checked if it works (note sure if right)
 */
function saveAtBackend() {
    let dataToText = JSON.stringify(data);
    backend.setItem('data', dataToText);
}

/**
 * loads from backend.   // has to be checked if it works (note sure if right)
 */
function loadFromBackend() {
    let textToData = backend.getItem('data');
    if (textToData) {
        data = JSON.parse(textToData);
    }
}

/**
 * 
 * @param {*} page tells the page the user is watching.
 */
async function init(page) {
    await includeHTML();
    changeColorOfNavItem(page);
}

/**
 * loads the menu 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * changes colors of current page at menu.
 * 
 * @param {*} page tells on which page the user is.
 */
function changeColorOfNavItem(page) {
    let currentPage = 'menu' + page[0].toUpperCase() + page.substring(1);
    let elementList = ['menuBoard', 'menuBacklog', 'menuNewTask', 'menuHelp'];
    let currentId = elementList.indexOf(currentPage);
    document.getElementById(currentPage).classList.add('active-font');
    document.getElementById(currentPage).classList.remove('inactive-font');
    document.getElementById(currentPage + 0).classList.add('active-s');
    document.getElementById(currentPage + 0).classList.remove('inactive-s');
    elementList.splice(currentId, 1);
    forLoopForChangeColorOfNavItem(elementList);
}

/**
 * loops through unclicked items.
 */
function forLoopForChangeColorOfNavItem(elementList) {
    for (let i = 0; i < elementList.length; i++) {
        let element = elementList[i];
        document.getElementById(element).classList.add('inactive-font');
        document.getElementById(element).classList.remove('active-font');
        document.getElementById(element + 0).classList.add('inactive-s');
        document.getElementById(element + 0).classList.remove('active-s');
    }
}