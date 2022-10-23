const inputText = document.querySelector("#textinput")
const ul = document.querySelector("ul")
let globalItem = []
// saveButton 
inputText.addEventListener('keypress', (e) => {
    switch(true) {
        case e.key === "Enter":
            save().click()
            break;
        case e.key === "Backspace":
            clear().click()
            break;
            default:
    }
    
})
function save() {
    // get a value from local storage
    if(inputText.value !== '') {
        const localitem = JSON.parse(localStorage.getItem("items"))

    if(localitem === null) {
        globalItem = []
    }else{
        globalItem = localitem
    }
    globalItem.unshift(inputText.value)
    inputText.value = ''
    localStorage.setItem("items",JSON.stringify(globalItem))
    savingProcess()
    }
}
// saving process 
const savingProcess = () => {
    // make sure to make an varieble with empty string on the top
    let addingElements = ''
    const localitem = JSON.parse(localStorage.getItem("items"))
    if(localitem === null) {
        globalItem = []
    }else{
        globalItem = localitem
    }
    // adding an element to the dom
    globalItem.forEach(element => {
        addingElements += `
            <li class="itemoutput">
                <span class="output">${element}</span>
                <button class="removeButton">X</button>
            </li>

        `
    });
    ul.innerHTML = addingElements
}
savingProcess()
// removing a to do list on the dom
ul.addEventListener("click", (e) => {
    if(e.target.matches("button")) {
        const localitem = JSON.parse(localStorage.getItem("items"))
        // locate the inputText 
        const targetItem = e.target.previousElementSibling.innerHTML
        globalItem = localitem
        // find the indexOf the targetItem and remove the value using splice
        const indexof = globalItem.indexOf(targetItem)
        globalItem.splice(indexof,1)
        localStorage.setItem("items",JSON.stringify(globalItem))
        savingProcess()
       
    }
})
function clearing() {
    localStorage.clear()
    savingProcess()
    
}