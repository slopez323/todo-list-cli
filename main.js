const prompt = require("prompt-sync")()

let list = []
let action = 0
startup()

function startup() {
    console.log(`
Welcome to the To-Do List Manager Application!

================================================
`)
    if (JSON.stringify(list) === "[]") {
        console.log(`Your to-do list is empty`)
    } else {
        console.log(`You have ${list.length} to-do item(s).`)
        for (let i = 0; i < list.length; i++) {
            console.log(`${i + 1}. ${list[i]}`)
        }
    }
    getAction()
}

function getAction() {
    if (JSON.stringify(list) === "[]") {
        addList()
    } else {
        action = +prompt(`
~ Select an action ~
[1] Create a to-do item
[2] Complete a to-do item
[3] Uncomplete a completed to-do item
[4] Delete a to-do item
[5] Edit a to-do item
[6] Quit Application
> `)
        checkAction()
    }
}


function checkAction() {
    if (action === 1) {
        addList()
    } else if (action === 2) {
        complete()
    } else if (action === 3) {
        uncomplete()
    } else if (action === 4) {
        deleteItem()
    } else if (action === 5) {
        editItem()
    } else if(action === 6) {
        process.exit()
    } else {
        action = +prompt(`
ERROR: Invalid action.  Input the correct number for the action.
~ Select an action ~
[1] Create a to-do item
[2] Complete a to-do item
[3] Uncomplete a completed to-do item
[4] Delete a to-do item
[5] Edit a to-do item
[6] Quit Application
> `)
        checkAction()
    }
}

function addList() {
    let add = prompt(`
~ Creating a new to-do item ~
What is this to-do item called?
> `)
    list.push(`[incomplete] ${add}`)
    startup()
}

function complete() {
    let item = +prompt(`
~ Completing a to-do item ~
Which to-do item would you like to complete?
> `)
    while (item > list.length || item < 1 || isNaN(item) || item % 1 !== 0) {
        item = +prompt(`
ERROR: Invalid item.  Input number of item to complete.
~ Completing a to-do item ~
Which to-do item would you like to complete?
> `)
    }
    if (list[item - 1].slice(0, 3) === "[in") {
        let newStr = list[item - 1]
        newStr = [...newStr]
        newStr.splice(1, 2)
        list[item - 1] = newStr.join('')
        startup()
    } else {
        console.log(`That item has already been completed.`)
        startup()
    }
}

function uncomplete() {
    let item = +prompt(`
~ Uncompleting a completed to-do item ~
Which to-do item would you like to uncomplete?
> `)
    while (item > list.length || item < 1 || isNaN(item) || item % 1 !== 0) {
        item = +prompt(`
ERROR: Invalid item.  Input number of item to uncomplete.
~ Uncompleting a completed to-do item ~
Which to-do item would you like to uncomplete?
> `)
    }
    if (list[item - 1].slice(0, 3) === "[co") {
        let newStr = list[item - 1]
        newStr = [...newStr]
        newStr.splice(1, 0, "in")
        list[item - 1] = newStr.join('')
        startup()
    } else {
        console.log(`That item has not yet been completed.`)
        startup()
    }
}

function deleteItem() {
    let item = +prompt(`
~ Deleting a to-do item ~
Which to-do item would you like to delete?
> `)
    while (item > list.length || item < 1 || isNaN(item) || item % 1 !== 0) {
        item = +prompt(`
ERROR: Invalid item.  Input number of item to delete.
~ Deleting a to-do item ~
Which to-do item would you like to delete?
> `)
    }
    list.splice(item - 1, 1)
    startup()
}

function editItem() {
    let item = +prompt(`
~ Editing a to-do item ~
Which to-do item would you like to edit?
> `)
    while (item > list.length || item < 1 || isNaN(item) || item % 1 !== 0) {
        item = +prompt(`
ERROR: Invalid item.  Input number of item to edit.
~ Editing a to-do item ~
Which to-do item would you like to edit?
> `)
    }
    let edit = prompt(`Editing item ${item}.  What would you like to call this to-do item?
> `)
    if (list[item - 1].slice(0, 3) === "[in") {
        list.splice(item - 1, 1, `[incomplete] ${edit}`)
    } else {
        list.splice(item - 1, 1, `[complete] ${edit}`)
    }
    startup()
}