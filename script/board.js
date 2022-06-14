
let boards = ['todo', 'progress', 'testing', 'done'];
let currentDrag;



/**
 * Reads the JSON-array: data and renders the elements in the according div.
 */
function updateHTML() {
    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];
        let column = data.filter(cat => cat['board'] == board);
        document.getElementById(board).innerHTML = '';
        for (let j = 0; j < column.length; j++) {
            const element = column[j];
            document.getElementById(board).innerHTML += generateHtml(element);
        }
    }
    document.getElementById('buttonundefined').classList.add('d-none');
}

/**
 * Returns a draggable "ticket" (div) with the content of the JSON-array.
 * 
 * @param {*} element is the content of the JSON ARRAY at defined index.
 * @returns HTML
 */
function generateHtml(element) {
    let id = data.indexOf(element);
    let nextBoard = getNextBoard(id);
    return `
    <div class="card sub-card" draggable ="true" ondragstart="startDrag(${id})"><div class="card-body">
            <h5 class="card-title"> ${element['title']}</h5>
            <p class="card-text">desription: ${element['description']}</p>
            <p class="card-text">urgency: ${element['urgency']}</p>
            <p class="card-text">due to:${element['dueDate']}</p>
            <p class="card-text">assignedto: ${element['assignedTo']}</p>
            <div class="ticket-buttons"><a href="#" class="btn btn-primary"  onclick="deleteTicket(${id})">delete</a>
            <a href="#" class="btn btn-primary mobile-button" onclick="sendToNext(${id})" id="button${nextBoard}">to ${nextBoard}</a></div>
        </div></div>`;
}

/**
 * Pushes the id  to the variable currentDrag for drop().
 * 
 * @param {*} id is the index of an element.
 */
function startDrag(id) {
    currentDrag = id;
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
    updateHTML();
}

/**
 * deletes ticket from page and array
 * 
 * @param {*} id tells which ticket
 */
function deleteTicket(id) {
    data.splice(id, 1);
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
    let nextBoard = getNextBoard(id);
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
    let boardId = boards.indexOf(data[id]['board']);
    boardId++;
    nextBoard = boards[boardId];
    return nextBoard;
}