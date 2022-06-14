let testData = [{
    "title": "test1",
    "description": "blablabla1",
    "board": "backlog",
    "dueDate": 0,
    "category": "Marketing",
    "urgency": "high",
    "assignedTo": "no one"
}]

const colors = {
    high: '#ff0000',
    medium: '#ffff00',
    low: '#008000',
};


function responsiveHead() {

    if (window.innerWidth < 870) {
        document.getElementById('categoryDetails').classList.add('d-none');
        document.getElementById('secondGap').classList.remove('d-flex');
    } else {
        document.getElementById('categoryDetails').classList.remove('d-none');
        document.getElementById('secondGap').classList.add('d-flex');
    }
}

//////////////////render the data from json to backlog////////////////////
function renderBacklog() {
    let container = document.getElementById('backlogBox');

    let assignedTo = testData[0]['assignedTo'];
    let category = testData[0]['category'];
    let details = testData[0]['description'];
    let priority = testData[0]['urgency'];
    let color = colors[priority.toLowerCase()];

    container.innerHTML += `
    
    <div id="backlogRow" onclick="showTask()" class="d-flex justify-content-start rowStyle" style="border-color: ${color}">
        <div class="d-flex align-items-center firstGap">
            
        <img src="img/user_dummy.png" class="profilePicture" id="profilePicture" alt="">
            <div id="assignedToInfo">${assignedTo}</div>
        </div>
        <div id="secondGap" class="d-flex secondGap">
            <div id="categoryInfo">${category}</div>
            <div id="detailsInfo">${details}</div>
        </div>
    </div>
        <div id="addToBoard" style="display:none; border-color: ${color}">
            <div class="section">Send to Board</div>
    <div>
    `
}

/////////////function for show & hide the full task details////////////
function showTask() {
    let hiddenContainer = document.getElementById('addToBoard');

    if (hiddenContainer.style.display == 'none') {
        show();
    } else {
        hide();
    }
}

function show() {
    let hiddenContainer = document.getElementById('addToBoard');

    document.getElementById('detailsInfo').style.overflow = 'unset';
    document.getElementById('backlogRow').style.lineHeight = 'unset';
    document.getElementById('backlogRow').style.maxHeight = 'unset';
    document.getElementById('secondGap').style.alignItems = 'center';
    document.getElementById('backlogRow').style.marginBottom = 'unset';
    document.getElementById('backlogRow').style.paddingBottom = '8px';
    document.getElementById('backlogRow').style.borderRadius = '5px 5px 0px 0px';

    hiddenContainer.style.display = 'flex';
    hiddenContainer.classList.add('addToBoardContainer');
}

function hide() {
    let hiddenContainer = document.getElementById('addToBoard');

    hiddenContainer.classList.remove('addToBoardContainer');
    hiddenContainer.style.display = 'none';
    document.getElementById('backlogRow').style.lineHeight = '60px';
    document.getElementById('backlogRow').style.maxHeight = '60px';
    document.getElementById('secondGap').style.alignItems = 'unset';
    document.getElementById('backlogRow').style.marginBottom = '8px';
    document.getElementById('backlogRow').style.paddingBottom = 'unset';
    document.getElementById('detailsInfo').style.overflow = 'hidden';
    document.getElementById('backlogRow').style.borderRadius = '5px';
}





// /**
//  * saves to backend.   // has to be checked if it works (note sure if right)
//  */
// function saveAtBackend() {
//     let dataToText = JSON.stringify(data);
//     backend.setItem('data', dataToText);
// }

// /**
//  * loads from backend.   // has to be checked if it works (note sure if right)
//  */
// function loadFromBackend() {
//     let textToData = backend.getItem('data');
//     if (textToData) {
//         data = JSON.parse(textToData);
//     }
// }