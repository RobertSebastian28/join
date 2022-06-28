const colors = {
    high: '#ff0000',
    medium: '#ffff00',
    low: '#008000',
};

////////////////////filters the JSON with data for backlog///////////////
const backlogData = data.filter(data => data.board == 'backlog');



// ////////////////responsive category head////////////////////////////////
function responsiveHead() {

    if (window.innerWidth < 870) {
        document.getElementById('category').classList.add('d-none');
        document.getElementById('title').classList.add('d-none');
        document.getElementById('titleInfo').classList.add('mb-2', 'mt-2');
        document.getElementById('categoryInfo').classList.add('mb-2');
    } else {
        document.getElementById('category').classList.remove('d-none');
        document.getElementById('title').classList.remove('d-none');
        document.getElementById('titleInfo').classList.remove('mb-2', 'mt-2');
        document.getElementById('categoryInfo').classList.remove('mb-2');
    }
}


//////////////////render the data from json to display as rows////////////////////
function renderBacklog() {
    loadFromBackend();
    let container = document.getElementById('backlogBox');
    container.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const task = data[i];

        if (data[i]['board'] == 'backlog') {
            let title = task['title'];
            let assignedTo = task['assignedTo'];
            let category = task['category'];
            let details = task['description'];
            let priority = task['urgency'];
            let color = colors[priority.toLowerCase()];

            container.innerHTML += `
    
    <div onclick="show(${i})" id="show-hide${i}">
        
        <div id="backlogRow${i}" class="rowStyle" style="border-color: ${color}">
            <div id="firstGap${i}" class="d-flex firstGapRow">
                <div class="d-flex align-items-center">
                    <img src="img/user_dummy.png" class="profilePicture" id="profilePicture${i}" alt="">
                    <div id="assignedToInfo">${assignedTo}</div>
                </div>
                <div id="titleInfo${i}"><b>${title}</b></div>
                <div id="categoryInfo${i}"><b>${category}</b></div>
            </div>
        
            <div id="secondGap" class="secondGapRow">
                <div id="detailsInfo${i}" class="detailsInfo">${details}</div>
            </div>
        </div>
        
        <div id="addToBoard${i}" class="text-end" style="display:none; border-color: ${color}">
            <div class="btn btn-danger btn-margin" onclick="deleteTask(${i})">Delete Task</div>
            <div class="btn btn-primary btn-margin" onclick="sendTaskToBoard(${i})">Send to Board</div>
        <div>
    </div>
    `;
        }
    }
}


////////////show and hide the container to send the task to board///////////
function show(i) {
    let hiddenContainer = document.getElementById('addToBoard' + i);

    document.getElementById('detailsInfo' + i).style.overflow = 'unset';
    document.getElementById('detailsInfo' + i).style.lineHeight = 'unset';
    document.getElementById('backlogRow' + i).style.maxHeight = 'unset';
    document.getElementById('backlogRow' + i).style.marginBottom = 'unset';
    document.getElementById('backlogRow' + i).style.paddingBottom = '8px';
    document.getElementById('backlogRow' + i).style.borderRadius = '5px 5px 0px 0px';
    if (window.innerWidth > 870) {
        document.getElementById('firstGap' + i).style.lineHeight = '60px';
        document.getElementById('firstGap' + i).style.alignItems = 'start';
    }

    hiddenContainer.style.display = 'flex';
    hiddenContainer.classList.add('addToBoardContainer');
    document.getElementById('show-hide' + i).setAttribute('onclick', `hide(${i})`);
}

function hide(i) {
    let hiddenContainer = document.getElementById('addToBoard' + i);

    if (window.innerWidth > 870) {
        document.getElementById('detailsInfo' + i).style.overflow = 'hidden';
        document.getElementById('detailsInfo' + i).style.lineHeight = '60px';
        document.getElementById('backlogRow' + i).style.maxHeight = '60px';
        document.getElementById('backlogRow' + i).style.marginBottom = '8px';
        document.getElementById('backlogRow' + i).style.paddingBottom = 'unset';
        document.getElementById('backlogRow' + i).style.borderRadius = '5px';
        document.getElementById('firstGap' + i).style.lineHeight = 'unset';
        document.getElementById('firstGap' + i).style.alignItems = 'center';
    } else {
        document.getElementById('detailsInfo' + i).style.overflow = 'hidden';
        document.getElementById('backlogRow' + i).style.marginBottom = '8px';
        document.getElementById('backlogRow' + i).style.paddingBottom = 'unset';
        document.getElementById('backlogRow' + i).style.borderRadius = '5px';
        document.getElementById('backlogRow' + i).style.maxHeight = '150px';
    }


    hiddenContainer.style.display = 'none';
    hiddenContainer.classList.remove('addToBoardContainer');
    document.getElementById('show-hide' + i).setAttribute('onclick', `show(${i})`);
}


/////////////send the selected task to the board-site/////////////////////
function sendTaskToBoard(i) {
    data[i]["board"] = "todo";
    saveAtBackend();
    renderBacklog();
}


/////////////delete Task from JSON/////////////////////////////////////////
function deleteTask(i) {
    data.splice(i, 1);
    saveAtBackend();
    renderBacklog();
}