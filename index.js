const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#statusText")
const restartBtn = document.querySelector("#restartBtn")

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [1, 4, 8],
    [2, 4, 6]
]
let options = ["", "", "", "", "", "", "", "", ""]
 let currentPlayer = "X"
 let inPlay = false

 startGame() 
 function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restart)
    statusText.textContent = `${currentPlayer}'s turn` 
    inPlay = true
 }

 function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")

    if (options[cellIndex] != "" || inPlay === false){
        return
    } else{
        updateCell(this, cellIndex)
    }
    checkWinner()
 }

function updateCell(cell, index){
    options[index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner(){
    let Winner = false

for (let i = 0; i < winConditions.length; i++){
    const condition = winConditions[i]
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if(cellA === "" || cellB === "" || cellC === ""){
        continue
    }
    if (cellA === cellB && cellB === cellC){
        Winner = true;
        break
    }
}
    if(Winner){
        statusText.textContent = `${currentPlayer} Wins!!`
        inPlay = false
    } else if(!options.includes("")){
    statusText.textContent = `Draw`
    inPlay = false
    } else{
    changePlayer()
    }
}

function restart(){
options = ["", "", "", "", "", "", "", "", ""]
currentPlayer = "X"
inPlay = true
statusText.textContent = `${currentPlayer}'s turn`
cells.forEach(cell => cell.textContent = "")
}