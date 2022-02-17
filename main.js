const prompt = require("prompt-sync")()

console.log(`
Welcome to the To-Do List Manager Application!

================================================
`) 

let list = []

if(JSON.stringify(list) === "[]" ){
    console.log(`Your to-do list is empty`)
} else {
console.log(`You have ${list.length} to-do item(s).`)
}

let action = prompt(`
~ Select an action ~
[1] Create a to-do item
[2] Complete a to-do item
> `)


