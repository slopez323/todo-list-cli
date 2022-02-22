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
        console.log(`
~ Select an action ~
[1] Create a to-do item
[2] Complete a to-do item
[3] Uncomplete a completed to-do item
[4] Delete a to-do item
[5] Edit a to-do item
[6] Quit Application`)
        action = +prompt(`> `)
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
        console.log(`
ERROR: Invalid action.  Input the correct number for the action.
~ Select an action ~
[1] Create a to-do item
[2] Complete a to-do item
[3] Uncomplete a completed to-do item
[4] Delete a to-do item
[5] Edit a to-do item
[6] Quit Application`)
        action = +prompt(`> `)
        checkAction()
    }
}

function addList() {
    console.log(`
~ Creating a new to-do item ~
What is this to-do item called?`)
    let add = prompt(`> `)
    list.push(`[incomplete] ${add}`)
    startup()
}

function complete() {
    console.log(`
~ Completing a to-do item ~
Which to-do item would you like to complete?`)
    let item = +prompt(`> `)
    while (item > list.length || item < 1 || isNaN(item) || item % 1 !== 0) {
        console.log(`
ERROR: Invalid item.  Input number of item to complete.
~ Completing a to-do item ~
Which to-do item would you like to complete?`)
        item = +prompt(`> `)
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
    console.log(`
~ Uncompleting a completed to-do item ~
Which to-do item would you like to uncomplete?`)
    let item = +prompt(`> `)
    while (item > list.length || item < 1 || isNaN(item) || item % 1 !== 0) {
        console.log(`
ERROR: Invalid item.  Input number of item to uncomplete.
~ Uncompleting a completed to-do item ~
Which to-do item would you like to uncomplete?`)
        item = +prompt(`> `)
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
    console.log(`
~ Deleting a to-do item ~
Which to-do item would you like to delete?`)
    let item = +prompt(`> `)
    while (item > list.length || item < 1 || isNaN(item) || item % 1 !== 0) {
        console.log(`
ERROR: Invalid item.  Input number of item to delete.
~ Deleting a to-do item ~
Which to-do item would you like to delete?`)
        item = +prompt(`> `)
    }
    list.splice(item - 1, 1)
    startup()
}

function editItem() {
    console.log(`
~ Editing a to-do item ~
Which to-do item would you like to edit?`)
    let item = +prompt(`> `)
    while (item > list.length || item < 1 || isNaN(item) || item % 1 !== 0) {
        console.log(`
ERROR: Invalid item.  Input number of item to edit.
~ Editing a to-do item ~
Which to-do item would you like to edit?`)
        item = +prompt(`> `)
    }
    console.log(`Editing item ${item}.  What would you like to call this to-do item?`)
    let edit = prompt(`> `)
    if (list[item - 1].slice(0, 3) === "[in") {
        list.splice(item - 1, 1, `[incomplete] ${edit}`)
    } else {
        list.splice(item - 1, 1, `[complete] ${edit}`)
    }
    startup()
}