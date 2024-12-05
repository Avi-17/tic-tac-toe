const grid = document.querySelector('.grid-container');
const cells = document.querySelectorAll('.box');
const restartBtn = document.getElementById('restartButton');
const undoButton = document.getElementById('undoButton');
const players = ['X', 'O'];
const moves = [];
let current = players[0];

const messages = ["X's turn", "O's turn"];
const turnElem = document.createElement('h2');
turnElem.style.color = 'violet';
turnElem.textContent = messages[0];
grid.after(turnElem);


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

restartBtn.addEventListener('click', reset);
undoButton.addEventListener('click', undoMove);

undoButton.disabled = true;

const winSound = new Audio('./win.mp3');
const tieSound = new Audio('./tie.mp3');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if(cell.textContent !== ''){
            return
        }
        cell.textContent = current;
        moves.push({index, player: current});
        undoButton.disabled = false;
        if(checkForWin(current, winningCombos)){
            winSound.play();
            setTimeout(() => {
                alert(`Game over! ${current} wins 🎉`);
                reset();
            }, 100)
            return
        }
        if(checkForTie()){
            tieSound.play();
            setTimeout(() => {
                alert(`Game tied`);
                reset();
            }, 100);
            return
        }
        if(current == 'X'){
            current = players[1];
            turnElem.textContent = messages[1];
        } else {
            cell.textContent = current;
            current = players[0]
            turnElem.textContent = messages[0];
        }
        
    })
});


function checkForWin(current, winningCombos) {
    for(let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if(cells[a].textContent === current && cells[b].textContent === current && cells[c].textContent === current){
            return true;
        }
    }
}

function checkForTie(){
    for(let i = 0; i < cells.length; i++){
        if(cells[i].textContent === ''){
            return false;
        }
    }
    return true;
}

function reset(){
    cells.forEach((cell) => {
        cell.textContent = '';
    });
    moves.length = 0;
    current = players[0];
    turnElem.textContent = messages[0];
    undoButton.disabled = true;
    return;
}


function undoMove() {
    if (moves.length === 0) {
        return;
    }
    const lastMove = moves.pop();
    cells[lastMove.index].textContent = '';
    current = lastMove.player; // Cl
    turnElem.textContent = current === 'X' ? messages[0] : messages[1];

    if (moves.length === 0) {
        undoButton.disabled = true;
    }
}