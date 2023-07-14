
const computerChoice = document.getElementById("computerChoice");
const resultDisplay = document.getElementById("resultDisplay");
const humanChoices = document.querySelectorAll(".game1Btn");
let humanChoose;
let computerChoose;
let winner;

humanChoices.forEach(function(choice){
    choice.addEventListener("click", (e)=> {
        humanChoose = e.target.id;
        genrateComputerChoice();
        result();
        resultImg();
    });
});


function genrateComputerChoice(){
    let x = Math.floor(Math.random()*3);
    switch(x){
        case 0:
            computerChoose = "rock";
        break;
        
        case 1:
            computerChoose = "paper";
        break;

        case 2:
            computerChoose = "scissors";
        break;
    }

    computerChoice.textContent = computerChoose;
    
}

function result(){
    resultDisplay.querySelector("#tr").textContent = "Result";

    if(computerChoose == humanChoose){
        resultDisplay.querySelector("#pr").textContent = "Match Draw";
        winner = "none";
    }
    else if(computerChoose=="rock" && humanChoose =="paper"){
        resultDisplay.querySelector("#pr").textContent = "You Win";
        winner = "human";
    }
    else if(computerChoose=="rock" && humanChoose =="scissors"){
        resultDisplay.querySelector("#pr").textContent = "Match Lose";
        winner = "computer";
    }
    else if(computerChoose=="paper" && humanChoose =="rock"){
        resultDisplay.querySelector("#pr").textContent = "Match Lose";
        winner = "computer";
    }
    else if(computerChoose=="paper" && humanChoose =="scissors"){
        resultDisplay.querySelector("#pr").textContent = "Match Win";
        winner = "human";
    }
    else if(computerChoose=="scissors" && humanChoose =="rock"){
        resultDisplay.querySelector("#pr").textContent = "Match Win";
        winner = "human";
    }
    else if(computerChoose=="scissors" && humanChoose =="paper"){
        resultDisplay.querySelector("#pr").textContent = "Match Lose";
        winner = "computer";
    }
    
    

}

function resultImg(){
   
document.querySelectorAll(".xr").forEach(item => item.style.display ="block")

   let a = document.querySelector("#challengerChoiceImg");
   let b = document.querySelector("#winnerImg");
   let c = document.querySelector("#computerChoiceImg");

    if( humanChoose == "rock"){a.src = "icons/rock.gif"; }
    if( humanChoose == "paper"){a.src = "icons/paper.gif"; }
    if( humanChoose == "scissors"){a.src = "icons/scissors.gif"; }

    if (winner=="human"){b.src="icons/welcom2.gif";}
    if (winner=="computer"){b.src="icons/smile.gif";}
    if (winner=="none"){b.src="icons/equal.gif";}


    if( computerChoose == "rock"){c.src = "icons/rock.gif"; }
    if( computerChoose == "paper"){c.src = "icons/paper.gif"; }
    if( computerChoose == "scissors"){c.src = "icons/scissors.gif"; }

}


//game2 human

const gameBoard = document.querySelector(".gameBoard");
const comment = document.querySelector("#comment");

const game2Img = document.getElementById("game2Img");

let choose = "circle";

document.getElementById("playWithHuman").addEventListener("click", start);


function start(){
     
    game2Img.style.display = "none";
    createBoxes();
    comment.textContent ="Match begins human";
    document.getElementById("playWithComp").style.display = "none";
    comment.textContent = "First player: Circle. Second Player: Cross";
    document.getElementById("playWithHuman").textContent = "Human Vs Human";
    document.getElementById("playWithHuman").removeEventListener("click", start);
    

}

function clear(){
    gameBoard.innerHTML=" ";
}

function createBoxes(){

    for( i=1; i<10; i++){

        let box = document.createElement("div");
        box.classList.add("square");
        gameBoard.appendChild(box);
        box.id = i;

        box.addEventListener("click",addCircle);

    }
    

}



function addCircle(e){

    let circle = document.createElement("div");
    circle.classList.add(choose);
    e.target.appendChild(circle);

    choose = ( choose == "circle") ? "cross" : "circle";

    e.target.removeEventListener("click", addCircle);
    winningLogic()
}


function winningLogic(){

const allSquares = document.querySelectorAll(".square");

const winSets = [
    [1,2,3], [1,4,7], [1,5,9], 
    [2,5,8], [3,5,7], [3,6,9],
    [4,5,6], [7,8,9]
];

winSets.forEach(set => {
   let humanWin = set.every( item =>
        allSquares[item-1].firstChild?.classList.contains("circle") );

        if (humanWin){
            comment.textContent = "First Player wins!";
            allSquares.forEach(square => 
                square.replaceWith(square.cloneNode(true)));
                clear();
                return;
        }
})

//computer wins

winSets.forEach(set => {
    let computerWin = set.every( item =>
         allSquares[item-1].firstChild?.classList.contains("cross") );
 
         if (computerWin){
             comment.textContent = "Second Player wins!";
             allSquares.forEach(square => 
                 square.replaceWith(square.cloneNode(true)));
                 clear();
                 return;
         }
 })


}

//gameMach2

document.getElementById("playWithComp").addEventListener("click", start2);


function start2(){

    renderBoard();
    comment.textContent ="Match begins human";
    document.getElementById("playWithHuman").style.display = "none";
    comment.textContent = "Human: Circle. Computron: Cross";
    document.getElementById("playWithComp").textContent = "Human Vs Computron";
    document.getElementById("playWithComp").removeEventListener("click", start2);

}

let board = ['', '', '', '', '', '', '', '', ''];

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6] 
];

function renderBoard() {
  
  const container = document.querySelector('.gameBoard');
  container.innerHTML = '';

  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement('div');
    cell.className = 'square';
    cell.innerText = board[i];
    cell.addEventListener('click', () => makeMove(i));

    container.appendChild(cell);
  }
}


function makeMove(position) {
  if (board[position] !== '') {
    return; 
  }

  
  board[position] = 'O';
  renderBoard();

  if (checkWin(board, 'O')) {
    gameOver('Human wins!');
    return;
  }

  if (isBoardFull(board)) {
    gameOver("It's a tie!");
    return;
  }

  
  const computerPosition = computerMove();
  board[computerPosition] = 'X';
  renderBoard();

  if (checkWin(board, 'X')) {
    gameOver('Computron wins!');
    return;
  }

  if (isBoardFull(board)) {
    gameOver("It's a tie!");
  }
}


function computerMove() {
 
  const availablePositions = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      availablePositions.push(i);
    }
  }

  
  for (const position of availablePositions) {
    const tempBoard = [...board];
    tempBoard[position] = 'X'; 
    if (checkWin(tempBoard, 'X')) {
      return position;
    }
  }

  
  for (const position of availablePositions) {
    const tempBoard = [...board];
    tempBoard[position] = 'O'; 
    if (checkWin(tempBoard, 'O')) {
      return position;
    }
  }

  
  const randomIndex = Math.floor(Math.random() * availablePositions.length);
  return availablePositions[randomIndex];
}


function checkWin(board, player) {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}


function isBoardFull(board) {
  return board.every(cell => cell !== '');
}


function gameOver(message) {
    comment.textContent = message;
    clear();
    addImgGame2(message);
    
}

function addImgGame2(x){
    gameBoard.appendChild(game2Img);

    if (x.includes("Human")){
         game2Img.src = "icons/welcom2.gif";
    }
    if(x.includes("Computron")){
        game2Img.src = "icons/smile.gif";
    }
}
