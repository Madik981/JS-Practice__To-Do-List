// DOM Elements starts
const inputElement = document.getElementById('input')
const buttonSubmit = document.getElementById('submit')
const toDoTask_countElement = document.getElementById('to-do__task-count')
const inProgressTask_countElement = document.getElementById('in-progress__task-count')
const closedTask_countElement = document.getElementById('closed__task-count')
const toDoList = document.getElementById('to-do__list')
const inProgressList = document.getElementById('in-progress__list')
const closedList = document.getElementById('closed__list')

// DOM Elements ends


// Note arrays starts
const toDo_Notes = ['Сделать домашку']
const inProgress_Notes = ['Доделать проект']
const closed_Notes = ['Погулять с друзьями']

// Note arrays ends


// Functions starts

// Submit a note functions starts
const submitANote = () => {
    if(inputElement.value.length > 0){
        toDo_Notes.push(inputElement.value)
        inputElement.value = ''
        render()
    }
}

buttonSubmit.onclick = () => submitANote()

inputElement.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        submitANote()
    }
})

// Submit a note functions ends


// Drag notes functions starts
const canDragNote = (event) => {
    event.preventDefault()
}
toDoList.ondragover = (event) => canDragNote(event)
inProgressList.ondragover = (event) => canDragNote(event)
closedList.ondragover = (event) => canDragNote(event)

const deleteADraggedNote = (notesArray, selectedNoteTitle) => {
    const index = notesArray.indexOf(selectedNoteTitle)
    notesArray.splice(index, 1)
}

const dropANote = (notesArray, selectedNoteTitle, listName) => {
    notesArray.push(selectedNoteTitle)
    switch(listName){
        case 'todo':
            deleteADraggedNote(toDo_Notes, selectedNoteTitle)
            break
        case 'inprog':
            deleteADraggedNote(inProgress_Notes, selectedNoteTitle)
            break
        case 'closed':
            deleteADraggedNote(closed_Notes, selectedNoteTitle)
            break
    }
    render()
}

const dragANote = (event) => {
    const selectedNoteTitle = event.target.firstElementChild.innerText
    const listName = event.target.dataset.list

    toDoList.ondrop = () => dropANote(toDo_Notes, selectedNoteTitle, listName)
    inProgressList.ondrop = () => dropANote(inProgress_Notes, selectedNoteTitle, listName)
    closedList.ondrop = () => dropANote(closed_Notes, selectedNoteTitle, listName)
}

// Drag notes functions ends


// Creating notes functions starts
const makeANote = (noteTitle, index, notesList, listName) => {
    notesList.insertAdjacentHTML('afterbegin', `<li class="list__element" draggable="true" data-list="${listName}">
    <span class="list__text">${noteTitle}</span>
    <div class="list__buttons">
        <button class="list__button__delete" id="list__button__delete" data-index="${index}">&times</button>                            
    </div>
</li>`)
    const notes = document.querySelectorAll(".list__element")
    notes.forEach(note => {
        note.addEventListener("dragstart", (event) => {
            dragANote(event, index)
        })
    })
}

const updateList = (notesArray, notesList, countElement) => {
    notesList.innerHTML = ''
    countElement.textContent = notesArray.length
}

const render = () => {
    updateList(toDo_Notes, toDoList, toDoTask_countElement)
    for (let i = 0; i < toDo_Notes.length; i++) {
        makeANote(toDo_Notes[i], i, toDoList, 'todo')
    }
    updateList(inProgress_Notes, inProgressList, inProgressTask_countElement)
    for(let i = 0; i < inProgress_Notes.length; i++){
        makeANote(inProgress_Notes[i], i, inProgressList, 'inprog')
    }
    updateList(closed_Notes, closedList, closedTask_countElement)
    for(let i = 0; i < closed_Notes.length; i++){
        makeANote(closed_Notes[i], i, closedList, 'closed')
    }
}

// Creating notes functions ends


// Deleting notes functions starts
const deleteANote = (event, notesArray) => {
    if(event.target.className !== "list__button__delete") return
    else{
        notesArray.splice(event.target.dataset.index, 1)
        render()
    }
}

toDoList.onclick = (event) => deleteANote(event, toDo_Notes)
inProgressList.onclick = (event) => deleteANote(event, inProgress_Notes)
closedList.onclick = (event) => deleteANote(event, closed_Notes) 

// Deleting notes function ends
// Functions ends

render()