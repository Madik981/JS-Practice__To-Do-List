const inputElement = document.getElementById('input')
const buttonSubmit = document.getElementById('submit')
let buttonDelete = document.getElementById('list__button__delete')
const toDoTask_countElement = document.getElementById('to-do__task-count')
const inProgressTask_countElement = document.getElementById('in-progress__task-count')
const closedTask_countElement = document.getElementById('closed__task-count')
const toDoList = document.getElementById('to-do__list')
const inProgressList = document.getElementById('in-progress__list')
const closedList = document.getElementById('closed__list')

const toDoNotes = ['Сделать домашку']
const inProgressNotes = ['Доделать проект']
const closedNotes = ['Погулять с друзьями']

buttonSubmit.onclick = () => {
    if(inputElement.value.length > 0){
        toDoNotes.push(inputElement.value)
        inputElement.value = ''
        render()
    }
}

const makeANote = (note, index) => {
    toDoList.insertAdjacentHTML('afterbegin', `<li class="list__element">
    <span class="list__text">${note}</span>
    <div class="list__buttons">
        <button class="list__button__delete" id="list__button__delete" data-index="${index}" data-type="">&times</button>                            
    </div>
</li>`)
}

const render = () => {
    toDoList.innerHTML = ''
    toDoTask_countElement.textContent = toDoNotes.length
    for (let i = 0; i < toDoNotes.length; i++) {
        makeANote(toDoNotes[i], i)
    }
}

render()