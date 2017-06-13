var player1 = 'O',
  player2 = 'x',
  currentPlayer = player1,
  table = document.querySelector('#table'),
  cellList = [];

function initialize(){
    console.log("cellpressed");    
    table.addEventListener('click', onMousePressed);
    table.addEventListener('mouseover', onMouseOver);
    //table.addEventListener('mouseleave', onMouseOut);
    // for(var index = 0; index < listCells.length; index++){
    //   listCells[index].addEventListener('click', this.cellPressed);
    // }    
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
  if (cellList[cellPressed].label === '') { 
    console.log('parent, child name: ' + event.target.tagName);                       
    console.log(event.target.textContent);
    cellPressed.textContent = currentPlayer;
    cellList[cellPressed].label = currentPlayer;
    currentPlayer = (currentPlayer == player1 ? player2 : player1);
    event.target.className = 'unhover';
  }
}

function onMouseOver(event){
  console.log('isMouseOver');
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
  console.log('onMouseLeave');
  
  //if (cellOver != null ){
  var cellOver = target.getAttribute('data-cell');
  if (cellList[cellOver].label === '') { 
    console.log('parent, child name: ' + event.target.tagName);                       
    console.log(event.target.textContent);
    target.textContent = '';
    target.className = 'unhover';
  }
}
 

initialize();

