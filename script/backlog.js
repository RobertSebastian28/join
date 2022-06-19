const colors = {
    high: '#ff0000',
    medium: '#ffff00',
    low: '#008000',
};

////////////////////filters the JSON with data for backlog///////////////
const backlogData = data.filter(data => data.board == 'backlog');



//////////////////responsive category head////////////////////////////////
/*function responsiveHead() {

    if (window.innerWidth < 870) {
        document.getElementById('categoryDetails').classList.add('d-none');
        document.getElementById('secondGap').classList.remove('d-flex');
    } else {
        document.getElementById('categoryDetails').classList.remove('d-none');
        document.getElementById('secondGap').classList.add('d-flex');
    }
}*/


//////////////////render the data from json to display as rows////////////////////
function renderBacklog() {
    loadFromBackend();
    let container = document.getElementById('backlogBox');
    container.innerHTML = '';

for (let i = 0; i < data.length; i++) {
    const task = data[i];
   
    if(data[i]['board'] == 'backlog'){
        console.log(i);
        let assignedTo = task['assignedTo'];
        let category = task['category'];
        let details = task['description'];
        let priority = task['urgency'];
        let color = colors[priority.toLowerCase()];

        container.innerHTML += `
    
    <div id="backlogRow${i}" onclick="show(${i})" class="d-flex justify-content-start rowStyle" style="border-color: ${color}">
        <div class="d-flex align-items-center firstGap">
            
        <img src="img/user_dummy.png" class="profilePicture" id="profilePicture${i}" alt="">
            <div id="assignedToInfo">${assignedTo}</div>
        </div>
        <div id="secondGap${i}" class="d-flex secondGap">
            <div id="categoryInfo${i}"><b>${category}</b></div>
            <div id="detailsInfo${i}">${details}</div>
        </div>
    </div>
        <div id="addToBoard${i}" style="display:none; border-color: ${color}">
            <div class="section" onclick="sendTaskToBoard(${i})">Send to Board</div>
    <div>
    `;

    }
}




    /*for (let i = 0; i < backlogData.length; i++) {
        const task = backlogData[i];

        let assignedTo = task['assignedTo'];
        let category = task['category'];
        let details = task['description'];
        let priority = task['urgency'];
        let color = colors[priority.toLowerCase()];

        container.innerHTML = '';
        container.innerHTML += `
    
    <div id="backlogRow${i}" onclick="show(${i})" class="d-flex justify-content-start rowStyle" style="border-color: ${color}">
        <div class="d-flex align-items-center firstGap">
            
        <img src="img/user_dummy.png" class="profilePicture" id="profilePicture${i}" alt="">
            <div id="assignedToInfo">${assignedTo}</div>
        </div>
        <div id="secondGap${i}" class="d-flex secondGap">
            <div id="categoryInfo${i}"><b>${category}</b></div>
            <div id="detailsInfo${i}">${details}</div>
        </div>
    </div>
        <div id="addToBoard${i}" style="display:none; border-color: ${color}">
            <div class="section" onclick="sendTaskToBoard(${i})">Send to Board</div>
    <div>
    `
    }*/
}


////////////show and hide the container to send the task to board///////////
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
    document.getElementById('backlogRow' + i).setAttribute('onclick', `hide(${i})`);
}

function hide(i) {
    let hiddenContainer = document.getElementById('addToBoard' + i);

    if (window.innerWidth > 870) {
        hiddenContainer.classList.remove('addToBoardContainer');
        hiddenContainer.style.display = 'none';
        document.getElementById('backlogRow' + i).style.lineHeight = '60px';
        document.getElementById('backlogRow' + i).style.maxHeight = '60px';
        document.getElementById('backlogRow' + i).style.marginBottom = '8px';
        document.getElementById('backlogRow' + i).style.paddingBottom = 'unset';
        document.getElementById('detailsInfo' + i).style.overflow = 'hidden';
        document.getElementById('backlogRow' + i).style.borderRadius = '5px';
        document.getElementById('backlogRow' + i).setAttribute('onclick', `show(${i})`);
    } else {
        hiddenContainer.classList.remove('addToBoardContainer');
        hiddenContainer.style.display = 'none';
        document.getElementById('backlogRow' + i).style.marginBottom = '8px';
        document.getElementById('backlogRow' + i).style.paddingBottom = 'unset';
        document.getElementById('detailsInfo' + i).style.overflow = 'hidden';
        document.getElementById('backlogRow' + i).style.borderRadius = '5px';
        document.getElementById('backlogRow' + i).setAttribute('onclick', `show(${i})`);
    }
}

/////////////send the selected task to the board-site/////////////////////
function sendTaskToBoard(i) {
    data[i]["board"] = "todo";
    saveAtBackend();
    renderBacklog();

}