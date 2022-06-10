
async function init(page){
await includeHTML();
changeColorOfNavItem(page);
}

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
function changeColorOfNavItem(page){
let elementList = ['board', 'backlog', 'newtask', 'help'];
 let currentId = elementList.indexOf(page);
 document.getElementById(page).classList.remove('inactive-font');
 document.getElementById(page + 0).classList.remove('inactive-s');
elementList.splice(currentId,1);
for (let i = 0; i < elementList.length; i++) {
    let element = elementList[i];
    document.getElementById(element).classList.add('inactive-font');
    document.getElementById(element+0).classList.add('inactive-s');
}
}