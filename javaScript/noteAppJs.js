localStorage.setItem('theme', 'light')

// ---------------- Variables ----------------
let header = document.querySelector('.header')
let searchInput = document.querySelector('.search-input')
let addBtn = document.querySelector('.add-btn')
let addNoteDiv = document.querySelector('.add-note-div')
let cancelAdding = document.querySelector('.cancel-adding')
let title = document.querySelector('.title')
let details = document.querySelector('.details')
let categorySpan = document.querySelector('.category-span')
let addNoteBtn = document.querySelector('.add-note-btn')
let selectCategory = document.querySelector('.select-category')
let bodySectionBottom = document.querySelector('.body-sec-bottom')
let loaderSection = document.querySelector('.loader-section')
let filterAll = document.querySelector('#filter-all')
let filterPersonal = document.querySelector('#filter-personal')
let filterHome = document.querySelector('#filter-home')
let filterBusiness = document.querySelector('#filter-business')
let categoryFilterDiv = document.querySelector('.filter-left')
let completedNotes = document.querySelector('#completed-notes')
let themeBtn = document.querySelector('.theme-btn')
let themeMoonSvg = document.querySelector('.moon-svg')
let themeSunSvg = document.querySelector('.sun-svg')
let theme = document.querySelector('.theme')
let headText = document.querySelector('.head-text')
let noteTag = document.querySelectorAll('.note-tag')
let darkCompletedNotes = document.querySelector('.completed-notes')
let deleteInsurance = document.querySelector('.delete-insurance')
let insuranceDelete = document.querySelector('#delete')
let insuranceNoDelete = document.querySelector('#no-delete')
let editNoteDiv = document.querySelector('.edit-note')
let editNoteCancel = document.querySelector('.cancel-editing')
let editNoteTitleInput = document.querySelector('.edit-title-input')
let editNoteDetailInput = document.querySelector('.edit-Detail-input')
let editNoteSelectCategory = document.querySelector('.edit-select-category')
let editNoteEditBtn = document.querySelector('.edit-note-btn')


// ---------------  Functions -----------------

function addBtnFuncHandler() {
    addNoteDiv.style.display = 'block'
}

function cancelAddingFuncHandler() {
    addNoteDiv.classList.add('vanish')
    setTimeout(function () {
        addNoteDiv.style.display = 'none'
        addNoteDiv.classList.remove('vanish')
        title.value = ''
        details.value = ''
    }, 390)
}

function addNoteBtnFuncHandler() {
    // Html Theme
    let htmlTheme = localStorage.getItem('theme')

    // Inputs Validation
    if (title.value && details.value) {
        // New Note Creation
        let newNote = document.createElement('div')

        if (htmlTheme === 'light') {
            newNote.classList.add('note')
        } else {
            newNote.classList.add('note')
            newNote.classList.add('dark-note')
        }


        // Note Head
        let noteHead = document.createElement('div')
        noteHead.classList.add('note-head')

        // Note Head --> Tag
        let noteTag = document.createElement('div')
        noteTag.classList.add('tag')
        noteTag.innerHTML = selectCategory.value
        if (selectCategory.value === 'Personal') {
            noteTag.style.backgroundColor = '#FFCC80'
            noteTag.style.color = '#E65100'
        } else if (selectCategory.value === 'Home') {
            noteTag.style.backgroundColor = '#A5D6A7'
            noteTag.style.color = '#1B5E20'
        } else {
            noteTag.style.backgroundColor = '#CE93D8'
            noteTag.style.color = '#4A148C'
        }
        noteHead.append(noteTag)

        // Note Control Buttons
        let noteControlButtons = document.createElement('div')
        noteControlButtons.classList.add('note-control-btns')

        let checkboxInput = document.createElement('input')
        checkboxInput.setAttribute('type', 'checkbox')

        noteControlButtons.append(checkboxInput)

        noteControlButtons.innerHTML += '<i class="fa-solid fa-pencil"></i>'
        noteControlButtons.innerHTML += '<i class="fa-solid fa-trash-can"></i>'

        noteControlButtons.children[0].addEventListener('change', noteChecked)
        noteControlButtons.children[1].addEventListener('click', editNoteBtnFuncHandler)
        noteControlButtons.children[2].addEventListener('click', deleteNoteSvgFuncHandler)

        noteHead.append(noteControlButtons)

        newNote.append(noteHead)

        // Note Body
        let noteBody = document.createElement('div')
        noteBody.classList.add('note-body')


        // Note Body --> Title & Details
        let noteTitle = document.createElement('p')

        if (htmlTheme === 'light') {
            noteTitle.classList.add('note-title')
        } else {
            noteTitle.classList.add('note-title')
            noteTitle.classList.add('dark-note-title')
        }

        noteTitle.innerHTML = title.value
        noteBody.append(noteTitle)


        let noteDetails = document.createElement('p')
        if (htmlTheme === 'light') {
            noteDetails.classList.add('note-details')
        } else {
            noteDetails.classList.add('note-details')
            noteDetails.classList.add('dark-note-details')
        }

        noteDetails.innerHTML = details.value
        noteBody.append(noteDetails)

        newNote.append(noteBody)

        // Note Footer
        let noteFooter = document.createElement('div')
        noteFooter.classList.add('note-footer')

        // Note Footer --> Date
        let dataTime = new Date()
        let noteDate = document.createElement('p')
        if (htmlTheme === 'light') {
            noteDate.classList.add('date')
        } else {
            noteDate.classList.add('date')
            noteDate.classList.add('dark-date')
        }

        noteDate.innerHTML = dataTime.getHours() + ':' + dataTime.getMinutes() + ' , ' + dataTime.getDate() + '/' + dataTime.getMonth() + '/' + dataTime.getFullYear()
        noteFooter.append(noteDate)

        newNote.append(noteFooter)


        // Add Note To Html
        bodySectionBottom.append(newNote)


        // Clear Inputs & Close Add Page
        cancelAddingFuncHandler()
    } else {
        if (!title.value) {
            title.value = 'Required'
            title.style.backgroundColor = '#F48FB1'
            setTimeout(function () {
                title.value = ''
                title.style.backgroundColor = '#EEEEEE'
            }, 2000)
        } else if (!details.value)
            details.value = 'Required'
        details.style.backgroundColor = '#F48FB1'
        setTimeout(function () {
            details.value = ''
            details.style.backgroundColor = '#EEEEEE'
        }, 2000)
    }
}

function noteChecked(event) {
    if (event.target.checked) {
        event.target.setAttribute('data-checked', 'true')
    } else {
        event.target.setAttribute('data-checked', 'false')
    }
    event.target.parentElement.parentElement.parentElement.style.animation = 'noteCompleteAnimation 350ms 1 linear'
    event.target.parentElement.parentElement.parentElement.addEventListener('animationend', function (){
        event.target.parentElement.parentElement.parentElement.style.animation = ''
    })
}

function editNoteBtnFuncHandler(event) {
    editNoteDiv.style.display = 'block'
    editNoteDiv.style.top = event.pageY - 20 + 'px'
    editNoteDiv.style.left = event.pageX + 15 + 'px'
    editNoteTitleInput.value = event.target.parentElement.parentElement.parentElement.children[1].firstElementChild.innerHTML
    editNoteDetailInput.value = event.target.parentElement.parentElement.parentElement.children[1].lastElementChild.innerHTML
    editNoteSelectCategory.value = event.target.parentElement.parentElement.parentElement.children[0].firstElementChild.innerHTML

    editNoteEditBtn.addEventListener('click', function (){
        let noteTag = event.target.parentElement.parentElement.parentElement.children[0].firstElementChild

        event.target.parentElement.parentElement.parentElement.children[1].firstElementChild.innerHTML = editNoteTitleInput.value
        event.target.parentElement.parentElement.parentElement.children[1].lastElementChild.innerHTML = editNoteDetailInput.value
        event.target.parentElement.parentElement.parentElement.children[0].firstElementChild.innerHTML = editNoteSelectCategory.value
        if (editNoteSelectCategory.value === 'Personal') {
            noteTag.style.backgroundColor = '#FFCC80'
            noteTag.style.color = '#E65100'
        } else if (editNoteSelectCategory.value === 'Home') {
            noteTag.style.backgroundColor = '#A5D6A7'
            noteTag.style.color = '#1B5E20'
        } else {
            noteTag.style.backgroundColor = '#CE93D8'
            noteTag.style.color = '#4A148C'
        }

        editNoteDiv.style.display = 'none'
    })
}

function deleteNoteSvgFuncHandler(event) {
    deleteInsurance.style.display = 'block'
    deleteInsurance.style.left = event.pageX + 8 + 'px'
    deleteInsurance.style.top = event.pageY - 22 + 'px'
    let deleteInterval = setInterval(function (){
        if (deleteInsurance.dataset.delete === 'yes'){
            event.target.parentElement.parentElement.parentElement.remove()
            deleteInsurance.dataset.delete = 'none'
            deleteInsurance.style.display = 'none'
            clearInterval(deleteInterval)
        }
    }, 100)
}

function filterNotesTag(event) {
    let defaultBlockCounter = 0
    while (defaultBlockCounter < bodySectionBottom.childElementCount) {
        bodySectionBottom.children[defaultBlockCounter].style.display = 'block'
        defaultBlockCounter++
    }

    let counter = 0
    while (counter < categoryFilterDiv.childElementCount) {
        categoryFilterDiv.children[counter].classList.remove('note-tag-focus')
        counter++
    }
    event.target.classList.add('note-tag-focus')
    let tagFilter

    if (event.target.id === 'filter-all') {
        tagFilter = 'all'
    } else if (event.target.id === 'filter-personal') {
        tagFilter = 'Personal'
    } else if (event.target.id === 'filter-home') {
        tagFilter = 'Home'
    } else if (event.target.id === 'filter-business') {
        tagFilter = 'Business'
    }

    let counterBodySection = 0
    if (tagFilter !== 'all') {
        while (counterBodySection < bodySectionBottom.childElementCount) {
            if (bodySectionBottom.children[counterBodySection].firstElementChild.firstElementChild.innerHTML !== tagFilter) {
                bodySectionBottom.children[counterBodySection].style.display = 'none'
            }
            counterBodySection++
        }
    }
}

function filterNotesInputSearch() {
    let counter = 0
    while (counter < categoryFilterDiv.childElementCount) {
        categoryFilterDiv.children[counter].classList.remove('note-tag-focus')
        counter++
    }
    categoryFilterDiv.children[0].classList.add('note-tag-focus')

    let defaultBlockCounter = 0
    while (defaultBlockCounter < bodySectionBottom.childElementCount) {
        bodySectionBottom.children[defaultBlockCounter].style.display = 'block'
        defaultBlockCounter++
    }
    let searchedWord = searchInput.value
    if (searchedWord.length === 0) {

    } else {
        let counter = 0
        while (counter < bodySectionBottom.childElementCount) {
            if (!((bodySectionBottom.children[counter].children[1].firstElementChild.innerHTML.toLowerCase()).includes(searchedWord.toLowerCase()))) {
                bodySectionBottom.children[counter].style.display = 'none'
            }

            counter++
        }
    }
}

function completedNotesFilterHandler() {

    let counter = 0
    while (counter < categoryFilterDiv.childElementCount) {
        categoryFilterDiv.children[counter].classList.remove('note-tag-focus')
        counter++
    }
    categoryFilterDiv.children[0].classList.add('note-tag-focus')


    searchInput.value = ''


    let defaultBlockCounter = 0
    while (defaultBlockCounter < bodySectionBottom.childElementCount) {
        bodySectionBottom.children[defaultBlockCounter].style.display = 'block'
        defaultBlockCounter++
    }


    if (completedNotes.checked) {
        let counterBodySection = 0
        while (counterBodySection < bodySectionBottom.childElementCount) {
            if (!(bodySectionBottom.children[counterBodySection].firstElementChild.children[1].children[0].checked)) {
                bodySectionBottom.children[counterBodySection].style.display = 'none'
            }
            counterBodySection++
        }
    }
}

function changeSiteTheme() {

    // Take Notes

    let note = document.querySelectorAll('.note')
    let noteTitleDark = document.querySelectorAll('.note-title')
    let noteDetailsDark = document.querySelectorAll('.note-details')
    let noteDateDark = document.querySelectorAll('.date')
    let noteControlBtnI = document.querySelectorAll('i')


    if (themeBtn.dataset.theme === 'light') {
        // Theme Button
        themeBtn.dataset.theme = 'dark'
        themeBtn.title = 'Light Theme'
        themeBtn.style.transform = 'translateX(20px)'
        themeBtn.style.backgroundColor = '#E0E0E0'
        themeMoonSvg.style.display = 'none'
        themeSunSvg.style.display = 'block'
        localStorage.setItem('theme', 'dark')

    } else if (themeBtn.dataset.theme === 'dark') {
        themeBtn.dataset.theme = 'light'
        themeBtn.title = 'Dark Theme'
        themeBtn.style.transform = 'translateX(0px)'
        themeBtn.style.backgroundColor = '#212121'
        themeMoonSvg.style.display = 'block'
        themeSunSvg.style.display = 'none'
        localStorage.setItem('theme', 'light')
    }


    //  Make Site Dark And Light

    header.classList.toggle('dark-header')
    searchInput.classList.toggle('dark-search-input')
    addNoteDiv.classList.toggle('dark-add-note-div')
    cancelAdding.classList.toggle('dark-cancel-adding')
    title.classList.toggle('dark-title')
    details.classList.toggle('dark-details')
    categorySpan.classList.toggle('dark-category-span')
    addNoteBtn.classList.toggle('dark-select-category')
    selectCategory.classList.toggle('dark-add-note-btn')
    document.body.classList.toggle('dark-body')
    headText.classList.toggle('dark-head-text')
    deleteInsurance.classList.toggle('dark-delete-insurance')
    editNoteDiv.classList.toggle('dark-edit-note')
    editNoteTitleInput.classList.toggle('dark-edit-title-input')
    editNoteDetailInput.classList.toggle('dark-edit-Detail-input')
    editNoteSelectCategory.classList.toggle('dark-edit-select-category')

    noteTag.forEach(function (item){
        item.classList.toggle('dark-note-tag')
    })
    darkCompletedNotes.classList.toggle('dark-completed-notes')

    note.forEach(function (item) {
        item.classList.toggle('dark-note')
    })
    noteTitleDark.forEach(function (item) {
        item.classList.toggle('dark-note-title')
    })
    noteDetailsDark.forEach(function (item) {
        item.classList.toggle('dark-note-details')
    })
    noteDateDark.forEach(function (item) {
        item.classList.toggle('dark-date')
    })


}

function insuranceDeleteHandler(){
    deleteInsurance.dataset.delete = 'yes'
}

function insuranceNoDeleteHandler(){
    deleteInsurance.dataset.delete = 'none'
    deleteInsurance.style.display = 'none'
}

// ----------------  Events ------------------

window.addEventListener('load', function () {
    loaderSection.style.display = 'none'
    if (localStorage.getItem('theme') === 'dark'){
        changeSiteTheme()
    }
})
window.addEventListener('unload', function () {
    loaderSection.style.display = 'none'
})
searchInput.addEventListener('keyup', filterNotesInputSearch)
addBtn.addEventListener('click', addBtnFuncHandler)
cancelAdding.addEventListener('click', cancelAddingFuncHandler)
addNoteBtn.addEventListener('click', addNoteBtnFuncHandler)
filterAll.addEventListener('click', filterNotesTag)
filterPersonal.addEventListener('click', filterNotesTag)
filterHome.addEventListener('click', filterNotesTag)
filterBusiness.addEventListener('click', filterNotesTag)
completedNotes.addEventListener('change', completedNotesFilterHandler)
theme.addEventListener('click', changeSiteTheme)
insuranceDelete.addEventListener('click', insuranceDeleteHandler)
insuranceNoDelete.addEventListener('click', insuranceNoDeleteHandler)
editNoteCancel.addEventListener('click', function (){
    editNoteDiv.style.display = 'none'
})




