function responsiveHead() {

    if (window.innerWidth < 870) {
        document.getElementById('categoryDetails').classList.add('d-none');
        document.getElementById('testId').classList.remove('d-flex');
    } else {
        document.getElementById('categoryDetails').classList.remove('d-none');
        document.getElementById('testId').classList.add('d-flex');
    }
}

//render the data from json to backlog//
function renderBacklog() {
    let container = document.getElementById('backlogBox');

    container.innerHTML = `<div class="d-flex justify-content-start rowStyle">
    <div class="d-flex align-items-center firstGap">
        
        <img src="img/user_dummy.png" class="profilePicture" id="profilePicture" alt="">
        <div id="assignedToInfo">Beispiel1</div>
    </div>
    <div id="testId" class="d-flex secondGap">
        <div id="categoryInfo">Beispiel1</div>
        <div id="detailsInfo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nemo perferendis pariatur architecto. Saepe at voluptatem dolorum harum expedita. Dignissimos aperiam dolorem consequuntur est. Doloremque exercitationem adipisci
            et officia sequi.</div>
    </div>`
}