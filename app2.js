var player1 = 'O',
  player2 = 'X',
  theme = '',
  currentPlayer = player1,
  winner = '',
  table = document.querySelector('#table'),
  playerTurn = document.querySelector('#playerTurn'),
  tableDom = document.getElementsByTagName("td"),
  cellList = [],
  winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]];

var halloween = {
  background : halloween
}


var timer = {
  target:document.querySelector('#timer'),
  seconds:6,
  timerId:0,
  updateTime:function(){
    timer.seconds-=1;
    timer.target.textContent = "Timer: " + timer.seconds;
    if (timer.seconds <= 0) {
      makeRandomMove(currentPlayer);
      timer.reset();
    }
  },
  start:function(){
    console.log("timer start");
    clearInterval(timer.timerId);
    timer.timerId = setInterval(timer.updateTime, 1000);
    timer.updateTime();  
    timer.target.textContent = "Timer: " + timer.seconds;
  },
  reset:function(){
    timer.seconds=5;
    //clearInterval(timer.timerId);
    timer.target.textContent = "Timer: " + timer.seconds;
  }
}  

function initialize(){
    table.addEventListener('click', onMousePressed);
    table.addEventListener('mouseover', onMouseOver);
    playerTurn.textContent = "Player turn: " + currentPlayer;
    //initialize the timer
    timer.start();

    for(var i = 0 ; i < 9; i++){
      var cell = { 
        number : i,
        label : ''
      }
      cellList.push(cell);
    }
  }

function onMousePressed(event){  

  var cellPressed = event.target.getAttribute('data-cell');
  if (cellPressed != null){
    if (cellList[cellPressed].label === '') { 
      console.log('parent, child name: ' + event.target.tagName);                       
      console.log(event.target.textContent);
      cellPressed.textContent = currentPlayer;
      cellList[cellPressed].label = currentPlayer;
      if (checkWinner(currentPlayer)){
        alert("Player " + currentPlayer + "wins!");
        resetGame();
      }
      currentPlayer = (currentPlayer == player1 ? player2 : player1);
      event.target.className = 'unhover';
    }

    playerTurn.textContent = "Player turn: " + currentPlayer;
    timer.reset();

  }
}

function onMouseOver(event){

  var cellOver = event.target.getAttribute('data-cell');
  if (cellOver != null ){
    if (cellList[cellOver].label === '') {
      console.log('parent, child name: ' + event.target.tagName);                       
      console.log(event.target.textContent);
      event.target.className = 'hover';
      event.target.textContent = currentPlayer;
    }
  }
}

function onMouseOut(target){
    
  var cellOver = target.getAttribute('data-cell');
  if (cellList[cellOver].label === '') { 
    console.log('parent, child name: ' + event.target.tagName);                       
    console.log(event.target.textContent);
    target.textContent = '';
    target.className = 'unhover';
  }
}

function checkWinner(pattern){
  if ( pattern != null){
    for (var i = 0; i < winCombinations.length-1; i++){
      if (cellList[winCombinations[i][0]].label === pattern &&
        cellList[winCombinations[i][1]].label === pattern &&
        cellList[winCombinations[i][2]].label === pattern){
        return true;
      } 
    }  
  }
  return false;
}

function makeRandomMove(pattern){
  var tempList = [];
  for (var i = 0 ; i < cellList.length; i++) {
    if (cellList[i].label == ''){
      tempList.push(cellList[i]);
    }
  }
  var randomNumber = Math.floor(Math.random() * tempList.length);
  
  //check if there is a cell for a random move
  if (tempList.length > 0){
    tableDom[tempList[randomNumber].number].textContent = currentPlayer;
    tempList[randomNumber].label = currentPlayer;
    checkWinner(currentPlayer);
    currentPlayer = (currentPlayer == player1 ? player2 : player1);
  } 
}

function resetGame(){
  for (var i = 0 ; i < cellList.length; i++) {
    cellList[i].label = ''; 
    tableDom[i].textContent = '';
  }
  timer.reset();
}
 
initialize();