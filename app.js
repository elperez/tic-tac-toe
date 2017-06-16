var player1 = 'O',
  player2 = 'X',
  playerOneName ='',
  playerTwoName ='',
  playerOneSound = new Audio('media/pastelPlayerOneSound.wav'),
  playerTwoSound = new Audio('media/pastelPlayerTwoSound.wav'),
  theme = '',
  currentPlayer = player1,
  winner = '',
  table = document.querySelector('#table'),
  playerTurn = document.querySelector('#playerTurn'),
  tableDom = document.getElementsByTagName('td'),
  timerSelect = document.querySelector('#timerSelect'),
  title = document.querySelector('#title'),
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

var theme = {
  themeSelect : 0,
  winter : {
    background: 'winterBody',
    table: 'winterTable',
    header: 'winterHeader',
    gameHeader: 'winterGameHeader'
  }
}


var timer = {
  target:document.querySelector('#timer'),
  timerSelect:0,
  seconds:0,
  timerId:0,
  updateTime:function(){
    timer.seconds-=1;
    timer.target.textContent = "Timer: " + timer.seconds;
    if (timer.timerSelect != 0 && timer.seconds <= 0) {
      makeRandomMove(currentPlayer);
      playerTurn.textContent = "Player turn: " + 
      (currentPlayer == player1 ? playerOneName : playerTwoName);
      timer.reset();
    }
  },
  start:function(){
    console.log("timer start");
    clearInterval(timer.timerId);
    timer.timerId = setInterval(timer.updateTime, 1000);
    //timer.updateTime();  
    if (timer.timerSelect === 0){
      timer.target.textContent = "Timer: Disabled";
    } else {
      timer.target.textContent = "Timer: " + timer.seconds;
    }
  },
  reset:function(){
    timer.seconds=timer.timerSelect;//+1;
    //clearInterval(timer.timerId);
    if (timer.timerSelect === 0){
      timer.target.textContent = "Timer: Disabled";  
    } else {
      timer.target.textContent = "Timer: " + timer.seconds;
    }
  }
}  

function initialize(){
  table.addEventListener('click', onMousePressed);
  table.addEventListener('mouseover', onMouseOver);
  newGameButton.addEventListener('click', onNewGamePressed);
  playerTurn.textContent = "Player turn: " + 
      (currentPlayer == player1 ? playerOneName : playerTwoName);

  for(var i = 0 ; i < 9; i++){
    var cell = { 
      number : i,
      label : ''
    }
    cellList.push(cell);
  }
}

function onNewGamePressed(){
  
  while( playerOneName === '') {
    playerOneName = prompt("Enter Player 1 Name.");
  }
  while( playerTwoName === '') {
    playerTwoName = prompt("Enter Player 2 Name.");
  }
  playerTurn.textContent = "Player turn: " + 
      (currentPlayer == player1 ? playerOneName : playerTwoName);
  resetGame();
  if (timer.timerSelect != 0){ // there is a timer selected
    timer.start();  
  }
}

function onThemeChanged(){
  var selected = themeSelect.selectedIndex;
  if (selected === 0 || selected ===1) { //pastels
    var link = document.querySelector('link');
    link.href="css/style-pastels.css"; 
    playerOneSound = new Audio('media/pastelPlayerOneSound.wav');
    playerTwoSound = new Audio('media/pastelPlayerTwoSound.wav');
    title.textContent = "+Tic-Tac-Toe+";
  } else if ( selected === 2) { //winter
    var link = document.querySelector('link');
    link.href="css/style-winter.css"; 
    playerOneSound = new Audio('media/ice-block-drop-01.wav');
    playerTwoSound = new Audio('media/ice-block-drop-02.wav');
    title.textContent = "+*##Tic1Tac1Toe##*+";
  } 
}

function onTimerSelectChanged(){
  
  var selected = timerSelect.selectedIndex;
  if (selected === 0 || selected ===1) {
    timer.timerSelect = 0;
    timer.seconds=0;
    clearInterval(timer.timerId);
  } else if ( selected === 2) {
    timer.timerSelect = 3;
  } else if ( selected === 3) {
    timer.timerSelect = 5;
  } else if ( selected === 4) {
    timer.timerSelect = 7;
  }
  if (playerOneName != '' && playerTwoName !=''){
    timer.start();  
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
      if (currentPlayer==='O'){
        playerOneSound.play();
      } else {
        playerTwoSound.play();
      }
      
      if (checkWinner(currentPlayer)){
        if (currentPlayer === player1){
          alert("Player 1, " + playerOneName + " wins!");  
        } else {
          alert("Player 2, " + playerTwoName + " wins!");  
        }
        resetGame();
      }
      currentPlayer = (currentPlayer == player1 ? player2 : player1);
      event.target.className = 'unhover';
    }

    playerTurn.textContent = "Player turn: " + 
      (currentPlayer == player1 ? playerOneName : playerTwoName);
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
    for (var i = 0; i <= winCombinations.length-1; i++){
      if ((cellList[winCombinations[i][0]].label === pattern) &&
        (cellList[winCombinations[i][1]].label === pattern) &&
        (cellList[winCombinations[i][2]].label === pattern)){
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
    tableDom[tempList[randomNumber].number].className = 'hover';
    tableDom[tempList[randomNumber].number].textContent = currentPlayer;
    tableDom[tempList[randomNumber].number].className = 'unhover';
    tempList[randomNumber].label = currentPlayer;
    if (checkWinner(currentPlayer)){
      if (currentPlayer === player1){
        alert("Player 1, " + playerOneName + " wins!");  
      } else {
        alert("Player 2, " + playerTwoName + " wins!");  
      }
      resetGame();
    }
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