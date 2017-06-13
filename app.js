var player1 = 0,
  player2 = 1;

var game = {
  playerTurn: player1,
  table : document.querySelector('#table'),
  cellList : [],
  initialize:function(){
    console.log("cellpressed");    
    table.addEventListener('click', this.cellPressed);
    table.addEventListener('mouseover', this.isMouseOver);
    // for(var index = 0; index < listCells.length; index++){
    //   listCells[index].addEventListener('click', this.cellPressed);
    // }    
    for(var i = 0 ; i < 9; i++){
      var cell = { 
        number : i,
        label : ''
      }
      this.cellList.push(cell);
    }
  },
  cellPressed:function(event){
    var cellPressed = event.target.getAttribute('data-cell');
    console.log("cellpressed", cellPressed);
  },
  isMouseOver:function(event){
    console.log('isMouseOver');
    var cellOver = event.target.getAttribute('data-cell');
    if (this.cellList[cellOver].label === '') {
      console.log('parent, child name: ' + event.target.tagName);                       
      console.log(event.target.textContent);
      event.target.className = 'hover';
    }
  }
  // isPlayer
};


game.initialize();

