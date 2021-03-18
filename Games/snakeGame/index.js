
// ************variables ************


let lastRenderTime = 0;
let gameOver = false;
const GRID_SIZE = 21;
window.requestAnimationFrame(main);
// document.addEventListener('DOMContentLoaded', main);
// *** snake movement variable ***
const SNAKE_SPEED = 5;
let inputDirection = {x:0,y:0};
let lastInputDirection = {x:0,y:0};
const snakeBody = [{x:11,y:11}];
let newSegments = 0;
const gameBoard = document.getElementById("game-board");

// *** snake movement variable ***
let food= getRandomFoodPosition();
const EXPANSION_RATE = 1;



// ****** event listeners **********
window.addEventListener('keydown', function(e){
  //console.log(e.key);
  switch(e.key){
    case 'ArrowUp':
      //la restriccion del if es para q la serpiente no pueda ir en reversa
      //si no es cero quiere decir que era y=1 o sea, la serpiente estaba yendo para abajo
      if (lastInputDirection.y !== 0) break
      inputDirection ={x:0,y:-1}
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection ={x:0,y:1}
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection ={x:-1,y:0}
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection ={x:1,y:0}
      break  
  }
});


// ****** functions **********

  //una función recursiva o recurrente es una función que se llama a si misma desde dentro. 
function main(currentTime){
  if (gameOver){
    if (confirm('You lost. Press ok to restart')){
      window.location.reload();
    }
    return
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
  // añado un threshold para el rendering, asi la serpiente va a la velocidad que yo quiero
  if (secondsSinceLastRender < 1/ SNAKE_SPEED){
    return
  } else {
    lastRenderTime = currentTime;
    updateSnake();
    updateFood();
    drawSnake(gameBoard);
    drawFood(gameBoard);
    checkDeath();
  }
}


function updateSnake(){
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length-2; i>=0; i--){
    //ultimo elemento se le asigna al anteultimo // los tres puntos son para clonar el objeto, se crea un objeto nuevo SPREAD OPERATOR
    snakeBody[i+1] = {...snakeBody[i]};
  }
  snakeBody[0].x+= inputDirection.x;
  snakeBody[0].y+= inputDirection.y;
  console.log(snakeBody);
}


function drawSnake(gameBoard){
  //Para simular movimiento tengo que limpiar las piezas anteriores y crear las posteriores
  gameBoard.innerHTML="";
  snakeBody.forEach(function(segment){
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
  ;

}


function getInputDirection(){
  lastInputDirection = inputDirection;
  return inputDirection;
}


function updateFood(){
  if(onSnake(food)){
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}


function drawFood(gameBoard){
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function expandSnake(amount) {
  newSegments+= amount;
}

//la funcion SOME sobre el array permite checkear si alguna posicion coincide con la funcion que le indicamos
function onSnake(position, { ignoreHead = false}={}) {
  return snakeBody.some(function(segment, index){
    if(ignoreHead && index === 0) return false
    return equalPosition(segment,position);
  })
}

//voy a estar comparando el array de food con el array de snake
function equalPosition (pos1,pos2){
  return pos1.x === pos2.x && pos1.y ===pos2.y
}


function addSegments() {
  for (let i = 0; i < newSegments; i++){
    snakeBody.push({ ...snakeBody[snakeBody.length-1]});
  }
  newSegments=0;
}

function getRandomFoodPosition(){
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)){
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition
}


function randomGridPosition(){
  return{
    x:Math.floor(Math.random()* GRID_SIZE)+1,
    y:Math.floor(Math.random()* GRID_SIZE)+1
  }
}

// el juego termina cuando choca con los bordes o choca con si misma
function checkDeath(){
   gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}


function outsideGrid(position){
  return(
    position.x <1 || position.x > GRID_SIZE ||
    position.y <1 || position.y > GRID_SIZE
    )
}

function getSnakeHead (){
  // la posision que queremos evaluar es el primer item de nuestro array
  return snakeBody[0];
}

function snakeIntersection () {
  return onSnake(snakeBody[0],{ignoreHead: true});
}