// let data = [{
//     "title": "test1",
//     "description": "blablabla1",
//     "board": "backlog",
//     "dueDate": 0,
//     "category": "Marketing",
//     "urgency": "high",
//     "assignedTo": "no one"
// }]


function responsiveHead() {

    if (window.innerWidth < 870) {
        document.getElementById('categoryDetails').classList.add('d-none');
        document.getElementById('secondGap').classList.remove('d-flex');
    } else {
        document.getElementById('categoryDetails').classList.remove('d-none');
        document.getElementById('secondGap').classList.add('d-flex');
    }
}

//render the data from json to backlog//
function renderBacklog() {
    let container = document.getElementById('backlogBox');

    container.innerHTML += `
    
    <div id="backlogRow" onclick="showTask()" class="d-flex justify-content-start rowStyle">
        <div class="d-flex align-items-center firstGap">

            <img src="img/user_dummy.png" class="profilePicture" id="profilePicture" alt="">
            <div id="assignedToInfo">Beispiel1</div>
        </div>
        <div id="secondGap" class="d-flex secondGap">
            <div id="categoryInfo">Beispiel1</div>
            <div id="detailsInfo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nemo perferendis pariatur architecto. Saepe at voluptatem dolorum harum expedita. Dignissimos aperiam dolorem consequuntur est. Doloremque exercitationem adipisci
            et officia sequi.</div>
        </div>
    </div>
        <div id="addToBoard" style="display:none">
            <div class="section">Send to Board</div>
    <div>
    `
}

function showTask() {
    let hiddenContainer = document.getElementById('addToBoard');

    if (hiddenContainer.style.display = 'none') {
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
    hiddenContainer.style.display = 'flex';
    hiddenContainer.classList.add('addToBoardContainer');
}

function hide() {
    let hiddenContainer = document.getElementById('addToBoard');

    hiddenContainer.classList.remove('addToBoardContainer');
    hiddenContainer.style.display = 'none';
    document.getElementById('detailsInfo').style.overflow = 'hidden';
    document.getElementById('backlogRow').style.lineHeight = '60px';
    document.getElementById('backlogRow').style.maxHeight = '60px';
    document.getElementById('backlogRow').style.marginBottom = '8px';
    document.getElementById('backlogRow').style.paddingBottom = 'unset';
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