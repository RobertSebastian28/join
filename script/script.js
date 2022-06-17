//testing Data:

let data = [
    {
        "title": "test1",
        "description": "blablabla1",
        "board": "backlog",
        "dueDate": 31354216446,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    }, {
        "title": "test2",
        "description": "blablabla2",
        "board": "todo",
        "dueDate": 16462514654,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    }, {
        "title": "test3",
        "description": "blablabla1",
        "board": "progress",
        "dueDate": 316468224685,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    }, {
        "title": "test4",
        "description": "blablabla1",
        "board": "testing",
        "dueDate": 615646228469,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    }, {
        "title": "test5",
        "description": "blablabla1",
        "board": "done",
        "dueDate": 651462224151,
        "category": "Marketing",
        "urgency": "high",
        "assignedTo": "no one"
    },

];

//setURL('../smallest_backend_ever');

/**
 * loads data from Server and writes it in the array data.
 */
async function loadFromBackend() {
    let dataAsJSON = await backend.getItem('data');
    data = JSON.parse(dataAsJSON) || [];
}

/**
 * saves to backend.   // has to be checked if it works (note sure if right)
 */
async function saveAtBackend() {
    let dataAsJSON = JSON.stringify(data);
   await backend.setItem('data', dataAsJSON );
}

/**
 * 
 * @param {*} page tells the page the user is watching.
 */
async function init(page) {
    await includeHTML();
    await downloadFromServer();
    await loadFromBackend();
    changeColorOfNavItem(page);
    if (page == 'board') { updateHTML(); }
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
    let elementList = ['menuBoard', 'menuBacklog', 'menuNewTask', 'menuHelp', 'menuImprint', 'menuPrivacy'];
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


function logInCheck(){

if(document.getElementById('exampleInputEmail1').value || document.getElementById('exampleInputPassword1').value){
document.getElementById('passwordInfo').classList.remove('d-none');
}
else if(document.getElementById('exampleCheck1').checked){
    window.open('./board.html', "_self");
}
}
