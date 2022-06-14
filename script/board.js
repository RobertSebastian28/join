
let boards = ['todo', 'progress', 'testing', 'done'];
let currentDrag;
let ids = [];


/**
 * Reads the JSON-array: data and renders the elements in the according div.
 */
function updateHTML() {
    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];
        let column = data.filter(cat => cat['board'] == board);
        document.getElementById(board).innerHTML = '';
        forLoopForUpdateHtml(column, board);
        if (board == 'done') {
            ids.push(document.querySelector('[id*="undefined"]').id);
        }
    }
    ids.forEach(e => document.getElementById(e).classList.add('d-none'));
}

/**
 * loops through data and generates HTML
 * 
 * @param {*} column tells which board
 */
function forLoopForUpdateHtml(column, board) {
    for (let j = 0; j < column.length; j++) {
        const element = column[j];
        document.getElementById(board).innerHTML += generateHtml(element);
    }
}
/**
 * Returns a draggable "ticket" (div) with the content of the JSON-array.
 * 
 * @param {*} element is the content of the JSON ARRAY at defined index.
 * @returns HTML
 */
function generateHtml(element) {
    let id = data.indexOf(element);
    let boardId = boards.indexOf(data[id]['board']);
    boardId++;
    let nextBoard = getNextBoard(boardId);
    let event = new Date(element['dueDate']);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = event.toLocaleDateString('de-DE', options);
    return htmlForGenerateHTML(element, nextBoard, id, date);
}

/**
 * returns the HTML for the tickets
 * 
 * @param {*} element is the content of the JSON ARRAY at defined index.
 * @param {*} nextBoard tells the next board in row
 * @param {*} id the id of the ticket
 * @param {*} date the dueDate of the Ticket readable
 * @returns HTML
 */
function htmlForGenerateHTML(element, nextBoard, id, date) {
    return `
    <div class="card sub-card" draggable ="true" ondragstart="startDrag(${id})"><div class="card-body">
            <h5 class="card-title"> ${element['title']}</h5>
            <p class="card-text"><h6><i>desription:</i></h6> ${element['description']}</p>
            <p class="card-text"><h6><i>urgency:</i></h6> ${element['urgency']}</p>
            <p class="card-text"><h6><i>due to:</i></h6> ${date}</p>
            <p class="card-text"><h6><i>assigned to:</i></h6> ${element['assignedTo']}</p>
            <div class="ticket-buttons"><a href="#" class="btn btn-primary"  onclick="deleteTicket(${id})">delete</a>
            <a href="#" class="btn btn-primary mobile-button" onclick="sendToNext(${id})" id="button${id}${nextBoard}">to ${nextBoard}</a></div>
        </div></div>`;
}

/**
 * Pushes the id  to the variable currentDrag for drop().
 * 
 * @param {*} id is the index of an element.
 */
function startDrag(id) {
    currentDrag = id;
    if (data[currentDrag]['board'] == 'done') {
        ids = [];
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