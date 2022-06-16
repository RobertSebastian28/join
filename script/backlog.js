// let testData = [{
//     "title": "test1",
//     "description": "blablabla1",
//     "board": "backlog",
//     "dueDate": 0,
//     "category": "Marketing",
//     "urgency": "high",
//     "assignedTo": "no one"
// }]

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

    for (let i = 0; i < data.length; i++) {
        const task = data[i];

        let assignedTo = task['assignedTo'];
        let category = task['category'];
        let details = task['description'];
        let priority = task['urgency'];
        let color = colors[priority.toLowerCase()];

        container.innerHTML += `
    
    <div id="backlogRow${i}" onclick="showTask(${i})" class="d-flex justify-content-start rowStyle" style="border-color: ${color}">
        <div class="d-flex align-items-center firstGap">
            
        <img src="img/user_dummy.png" class="profilePicture" id="profilePicture${i}" alt="">
            <div id="assignedToInfo">${assignedTo}</div>
        </div>
        <div id="secondGap${i}" class="d-flex secondGap">
            <div id="categoryInfo${i}">${category}</div>
            <div id="detailsInfo${i}">${details}</div>
        </div>
    </div>
        <div id="addToBoard${i}" style="display:none; border-color: ${color}">
            <div class="section" onclick="sendTaskToBoard(${task})">Send to Board</div>
    <div>
    `
    }
}


/////////////send the selected task to the board/////////////////////
function sendTaskToBoard(task) {



}


/////////////function for show & hide the full task details////////////
function showTask(i) {
    let hiddenContainer = document.getElementById('addToBoard' + i);

    if (hiddenContainer.style.display == 'none') {
        show(i);
    } else {
        hide(i);
    }
}

function show(i) {
    let hiddenContainer = document.getElementById('addToBoard' + i);

    document.getElementById('detailsInfo' + i).style.overflow = 'unset';
    document.getElementById('backlogRow' + i).style.lineHeight = 'unset';
    document.getElementById('backlogRow' + i).style.maxHeight = 'unset';
    document.getElementById('secondGap' + i).style.alignItems = 'center';
    document.getElementById('backlogRow' + i).style.marginBottom = 'unset';
    document.getElementById('backlogRow' + i).style.paddingBottom = '8px';
    document.getElementById('backlogRow' + i).style.borderRadius = '5px 5px 0px 0px';

    hiddenContainer.style.display = 'flex';
    hiddenContainer.classList.add('addToBoardContainer');
}

function hide(i) {
    let hiddenContainer = document.getElementById('addToBoard' + i);

    hiddenContainer.classList.remove('addToBoardContainer');
    hiddenContainer.style.display = 'none';
    document.getElementById('backlogRow' + i).style.lineHeight = '60px';
    document.getElementById('backlogRow' + i).style.maxHeight = '60px';
    document.getElementById('secondGap' + i).style.alignItems = 'unset';
    document.getElementById('backlogRow' + i).style.marginBottom = '8px';
    document.getElementById('backlogRow' + i).style.paddingBottom = 'unset';
    document.getElementById('detailsInfo' + i).style.overflow = 'hidden';
    document.getElementById('backlogRow' + i).style.borderRadius = '5px';
}