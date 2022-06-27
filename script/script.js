//testing Data:

let data = [
];

setURL('../smallest_backend_ever');

/**
 * loads data from Server and writes it in the array data.
 */
async function loadFromBackend() {
    let dataAsJSON = await backend.getItem('data');
    data = JSON.parse(dataAsJSON) || [];
}

/**
 * saves to backend.   
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
    if( page == 'backlog') { renderBacklog(); }
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

/**
 * Either shows user, that his login is wrong or, if the box is checked, forwards to board.
 */
function logInCheck(){
if(document.getElementById('exampleInputEmail1').value || document.getElementById('exampleInputPassword1').value){
document.getElementById('passwordInfo').classList.remove('d-none');
}
else if(document.getElementById('exampleCheck1').checked){
    window.open('./board.html', "_self");
}
}
