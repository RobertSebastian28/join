
async function init(page){
await includeHTML();
changeActivity(page);
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

// auf alle Fälle noch mit einer Schleife machen
function changeActivity(page){
    console.log(page);
if(page=='board'){
    document.getElementById('board0').classList.remove('inactive-s');
    document.getElementById('backlog0').classList.add('inactive-s');
    document.getElementById('newtask0').classList.add('inactive-s');
    document.getElementById('help0').classList.add('inactive-s');
    document.getElementById('board').classList.remove('inactive-font');
    document.getElementById('backlog').classList.add('inactive-font');
    document.getElementById('newtask').classList.add('inactive-font');
    document.getElementById('help').classList.add('inactive-font');
}
else if(page=='backlog'){
    document.getElementById('board0').classList.add('inactive-s');
    document.getElementById('backlog0').classList.remove('inactive-s');
    document.getElementById('newtask0').classList.add('inactive-s');
    document.getElementById('help0').classList.add('inactive-s');
    document.getElementById('board').classList.add('inactive-font');
    document.getElementById('backlog').classList.remove('inactive-font');
    document.getElementById('newtask').classList.add('inactive-font');
    document.getElementById('help').classList.add('inactive-font');
}
else if(page=='newtask'){
    document.getElementById('board0').classList.add('inactive-s');
    document.getElementById('backlog0').classList.add('inactive-s');
    document.getElementById('newtask0').classList.remove('inactive-s');
    document.getElementById('help0').classList.add('inactive-s');
    document.getElementById('board').classList.add('inactive-font');
    document.getElementById('backlog').classList.add('inactive-font');
    document.getElementById('newtask').classList.remove('inactive-font');
    document.getElementById('help').classList.add('inactive-font');
}
else if(page=='help'){
    document.getElementById('board0').classList.add('inactive-s');
    document.getElementById('backlog0').classList.add('inactive-s');
    document.getElementById('newtask0').classList.add('inactive-s');
    document.getElementById('help0').classList.remove('inactive-s');
    document.getElementById('board').classList.add('inactive-font');
    document.getElementById('backlog').classList.add('inactive-font');
    document.getElementById('newtask').classList.add('inactive-font');
    document.getElementById('help').classList.remove('inactive-font');
}
}