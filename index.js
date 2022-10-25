// document.designMode = 'on'
const availableChars = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M","N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',"1","2","3","4","5","6","7","8","9","0"]

let terminal = document.getElementsByClassName("terminal")[0]


let template = document.getElementById("template")
let inputDiv;
let input;

let canWrite = false;

whoami = "name : Simeone\n age : 14\n favourite programming language : don't know yet :)\n favourite sport: f1"

help = 'This is a list of all available commands:\n- <a onclick="Clear()">clear</a> : clear the screen\n- <a onclick="printWhoami()">whoami</a> : know about who i am\n- <a onclick="printHelp()">help</a> : show this page'

document.body.style.overflowY = "hidden"

function newLine(){
    let newDiv = template.cloneNode(true)
    newDiv.id = ""
    template.parentElement.appendChild(newDiv)
    console.log("New Line")
    if(inputDiv) inputDiv.removeChild(inputDiv.querySelector(".cursor"))
    inputDiv = newDiv
    input = inputDiv.querySelector(".inputValue")
}

function clearScreen(){
    input = null;
    inputDiv = null;
    let i = terminal.children[terminal.children.length-1]
    while(true){
        console.log("Remove",i)
        if (i.id != "template"){
            terminal.removeChild(i)
            i = terminal.children[terminal.children.length-1]
        }
        else {break;}
    }
}


function Clear(){
    clearScreen()
    newLine()
    printHelp()
}

function printToScreen(data){
    console.log("Print")
    let newP = document.createElement("p")
    newP.setAttribute("class","content")
    terminal.appendChild(newP)
    newP.innerHTML = String(data)
}

function executeCommand(){
    let command = input.textContent;
    console.log(command)
    switch(command.toLowerCase()){
        case "clear":
            clearScreen()
            break;
        case "whoami":
            printToScreen(whoami)
            break;
        case "help":
            printToScreen(help)
            break;
        default:
            printToScreen("Command not recognised. Please run the 'help' command to get a list of all available commands")
            break;
            
    }
    newLine()
    // let newDiv = template.cloneNode(true)
    // template.parentElement.appendChild(newDiv)
    // inputDiv.id = ""
    // inputDiv.removeChild(inputDiv.querySelector(".cursor"))
    // newDiv.id = "currentLine"
    // inputDiv = newDiv
    // input = inputDiv.querySelector(".inputValue")
    // input.textContent = ""
    // printToScreen();
}

function printWhoami(){
    printToScreen(whoami)
    newLine()
}
function printHelp(){
    printToScreen(help)
    newLine()
}

window.addEventListener('DOMContentLoaded', (event) => {

    newLine();


});

function helpAnim(){
    setTimeout(() => {
        input.textContent+='h'
        setTimeout(() => {
            input.textContent+='e'
            setTimeout(() => {
                input.textContent+='l'
                setTimeout(() => {
                    input.textContent+='p'
                    setTimeout(() => {
                        executeCommand()
                        document.body.style.overflowY = "scroll"
                        canWrite = true
                    }, 500);
                }, 300);
            }, 300);
        }, 300);
    }, 100);
}

document.onkeydown = function (e) {
    if (!canWrite) return;
    e = e || window.event;
    if (availableChars.includes(e.key)){
        console.log(e.key)
        input.textContent += e.key
    }
    else if(e.key == "Backspace"){
        input.textContent = input.textContent.slice(0,input.textContent.length-1)
    }
    else if (e.key == "Enter"){
        executeCommand()   
    }
};

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}