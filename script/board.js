let boards = ['todo', 'progress', 'testing', 'done'];
let currentDrag;

/**
 * Reads the JSON-array: data and renders the elements in the according div.
 */
function updateHTML() {
    loadFromBackend();
    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];
        let column = data.filter(cat => cat['board'] == board);
        document.getElementById(board).innerHTML = '';
        forLoopForUpdateHtml(column, board);
    }

}

/**
 * loops through data and generates HTML
 * 
 * @param {*} column tells which board
 */
function forLoopForUpdateHtml(column, board) {
    for (let j = 0; j < column.length; j++) {
        const element = column[j];
        document.getElementById(board).innerHTML += generateHtml(element, board);
    }
}

/**
 * Returns a draggable "ticket" (div) with the content of the JSON-array.
 * 
 * @param {*} element is the content of the JSON ARRAY at defined index.
 * @returns HTML
 */
function generateHtml(element, board) {
    let id = data.indexOf(element);
    let boardId = boards.indexOf(data[id]['board']);
    boardId++;
    let nextBoard = getNextBoard(boardId);
    let event = new Date(element['dueDate']);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = event.toLocaleDateString('de-DE', options);
    let nextButton = '';
    return htmlForGenerateHTML(element, id, date, nextButton, board, nextBoard);
}

/**
 * returns the HTML for the tickets
 * 
 * @param {*} element is the content of the JSON ARRAY at defined index.
 * @param {*} id the id of the ticket
 * @param {*} date the dueDate of the Ticket readable
 * @returns HTML
 */
function htmlForGenerateHTML(element, id, date, nextButton, board, nextBoard) {
    if (board !== 'done') {
        nextButton = `<a href="#" class="btn btn-primary mobile-button" onclick="sendToNext(${id})">to ${nextBoard}</a>`;
    }
    return `
    <div class="card sub-card" draggable="true" ondragstart="startDrag(${id})"><div class="card-body border${element['urgency'].toLowerCase()}">
            <div id ="chevron${id}" class="card-title chevron" onclick="showMoreTicket(${id})"> <h5> ${element['title']}</h5><img id="chevronImg${id}" src="././img/more.png"></div>
            <div id="moreInfo${id}" class="ticketInfo d-none">
            <p class="card-text"><u><i>desription:</i></u>&ensp; ${element['description']}</p>
            <p class="card-text"><u><i>due to:</i></u>&ensp; ${date}</p>
            <p class="card-text"><u><i>assigned to:</i></u>&ensp; ${element['assignedTo']}</p><br></Div>
            <div class="ticket-buttons"  id="buttons${id}"><a href="#" class="btn btn-primary" onclick="deleteTicket(${id})">delete</a>${nextButton}
            </div></div></div>`;
}

/**
 *makes text @ ticket visible
 * @param {*} id tells which ticket
 */
function showMoreTicket(id) {
    document.getElementById('moreInfo' + id).classList.remove('d-none');
    document.getElementById('chevron' + id).setAttribute('onclick', `hideMoreTicket(${id})`);
    document.getElementById('chevronImg' + id).src = "././img/less.png";
}

/**
 * hides text @ ticket
 * 
 * @param {*} id  tells which ticket
 */
function hideMoreTicket(id) {
    document.getElementById('moreInfo' + id).classList.add('d-none');
    document.getElementById('chevron' + id).setAttribute('onclick', `showMoreTicket(${id})`);
    document.getElementById('chevronImg' + id).src = "././img/more.png";
}

/**
 * Pushes the id  to the variable currentDrag for drop().
 * 
 * @param {*} id is the index of an element.
 */
function startDrag(id) {
    currentDrag = id;
    if (data[currentDrag]['board'] == 'done') {
    }
}

/**
 * Standard W3-School function to allow Drop of a dragged element.
 * 
 * @param {*} ev event
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Changes The content of the "board"-key.
 * refreshes the kanban-board.
 * 
 * @param {*} board is the id of the div in which the element is dropped.
 */
function drop(board) {
    data[currentDrag]['board'] = board;
    saveAtBackend();
    updateHTML();
}

/**
 * deletes ticket from page and array
 * 
 * @param {*} id tells which ticket
 */
function deleteTicket(id) {
    data.splice(id, 1);
    saveAtBackend();
    updateHTML();

}

/**
 * endarkens the card while ticket is dragged over
 * 
 * @param {*} id tells which card
 */
function endarken(id) {
    document.getElementById(id).classList.add('drag-over');
}

/**
 * changes card back to regualar.
 * 
 * @param {*} id tells which card
 */
function endarkenOff(id) {
    document.getElementById(id).classList.remove('drag-over');
}

/**
 * sends ticket to the next board (e.g. ticket in todo will be sent to in progress)
 * 
 * @param {*} id  tells which ticket
 */
function sendToNext(id) {
    startDrag(id);
    let boardId = boards.indexOf(data[id]['board']);
    boardId++;
    let nextBoard = getNextBoard(boardId);
    if (boardId < 4) {
        drop(nextBoard);
    }
}

/**
 * gets the string of the next board.
 * 
 * @param {*} id tells which ticket 
 * @returns  returns the name of the next board.
 */
function getNextBoard(id) {
    nextBoard = boards[id];
    return nextBoard;
}