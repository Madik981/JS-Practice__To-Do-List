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
const toDoNotes = ['Сделать домашку']
const inProgressNotes = ['Доделать проект']
const closedNotes = ['Погулять с друзьями']

// Note arrays ends


// Functions starts
buttonSubmit.onclick = () => {
    if(inputElement.value.length > 0){
        toDoNotes.push(inputElement.value)
        inputElement.value = ''
        render()
    }
}

// Creating notes functions starts
const makeANote = (note, index, notesList) => {
    notesList.insertAdjacentHTML('afterbegin', `<li class="list__element">
    <span class="list__text">${note}</span>
    <div class="list__buttons">
        <button class="list__button__delete" id="list__button__delete" data-index="${index}" data-type="">&times</button>                            
    </div>
</li>`)
}

const updateList = (notesArray, notesList, countElement) => {
    notesList.innerHTML = ''
    countElement.textContent = notesArray.length
}

const render = () => {
    updateList(toDoNotes, toDoList, toDoTask_countElement)
    for (let i = 0; i < toDoNotes.length; i++) {
        makeANote(toDoNotes[i], i, toDoList)
    }
    updateList(inProgressNotes, inProgressList, inProgressTask_countElement)
    for(let i = 0; i < inProgressNotes.length; i++){
        makeANote(inProgressNotes[i], i, inProgressList)
    }
    updateList(closedNotes, closedList, closedTask_countElement)
    for(let i = 0; i < closedNotes.length; i++){
        makeANote(closedNotes[i], i, closedList)
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

toDoList.onclick = (event) => deleteANote(event, toDoNotes)
inProgressList.onclick = (event) => deleteANote(event, inProgressNotes)
closedList.onclick = (event) => deleteANote(event, closedNotes) 

// Deleting notes function ends
// Functions ends

render()