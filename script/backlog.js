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
        <div id="addToBoard" class="d-none">
            <div>To Do</div>
            <div>In Progress</div>
            <div>Testing</div>
            <div>Done</div>
        <div>
    `
}

function showTask() {
    let hiddenContainer = document.getElementById('addToBoard');

    if (hiddenContainer.classList = 'd-none') {
        document.getElementById('detailsInfo').style.overflow = 'unset';
        document.getElementById('backlogRow').style.lineHeight = 'unset';
        document.getElementById('backlogRow').style.maxHeight = 'unset';
        document.getElementById('secondGap').style.alignItems = 'center';
        hiddenContainer.classList.remove('d-none');
        hiddenContainer.classList.add('addToBoardContainer');
    } else {
        hiddenContainer.classList.add('d-none');
        hiddenContainer.classList.remove('addToBoardContainer');
        document.getElementById('detailsInfo').style.overflow = 'hidden';
        document.getElementById('backlogRow').style.lineHeight = '60px';
        document.getElementById('backlogRow').style.maxHeight = '60px';
        document.getElementById('secondGap').style.alignItems = 'center';

    }

}

// function show() {
//     document.getElementById('detailsInfo').style.overflow = 'unset';
//     document.getElementById('backlogRow').style.lineHeight = 'unset';
//     document.getElementById('backlogRow').style.maxHeight = 'unset';
//     document.getElementById('secondGap').style.alignItems = 'center';
//     hiddenContainer.classList.remove('d-none');
//     hiddenContainer.classList.add('addToBoardContainer');
// }

// function hide() {
//     hiddenContainer.classList.add('d-none');
//     hiddenContainer.classList.remove('addToBoardContainer');
//     document.getElementById('detailsInfo').style.overflow = 'hidden';
//     document.getElementById('backlogRow').style.lineHeight = '60px';
//     document.getElementById('backlogRow').style.maxHeight = '60px';
//     document.getElementById('secondGap').style.alignItems = 'center';
// }