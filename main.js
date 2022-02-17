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
> `)
        checkAction()
    }
}


function checkAction() {
    if (action === 1) {
        addList()
    } else if (action === 2) {
        complete()
    } else {
        action = +prompt(`
    ERROR: Invalid action.  Input 1 or 2 only.
    ~ Select an action ~
    [1] Create a to-do item
    [2] Complete a to-do item
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
    let done = +prompt(`
    ~ Completing a to-do item ~
    Which to-do item would you like to complete?
    > `)
    while (done > list.length || done < 1 || isNaN(done) || done % 1 !== 0) {
        done = +prompt(`
    ERROR: Invalid item.  Input number of item to complete.
    ~ Completing a to-do item ~
    Which to-do item would you like to complete?
    > `)
    }
    if(list[done-1].slice(0,3) === "[in"){
        let newStr = list[done-1]
        newStr = [...newStr]
        newStr.splice(1,2)
        list[done-1] = newStr.join('')
        startup()
    } else {
        console.log(`That item has already been completed.`)
        startup()
    }
}
