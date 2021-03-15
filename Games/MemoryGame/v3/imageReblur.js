
// ****** select items **********

const cards= document.querySelectorAll('.memory-card');

// ******  variables for matching logic **********
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;


// ****** functions **********

function flipCard(){

  if (lockBoard == true) return;
  if (this == firstCard) return;  //esto es para que no se avtive nada si hago doble click

  //console.log(this);
  this.classList.add('flip');

  //if hasflipped is false: it is the firs card I am clicking, I set it to true, because I flipped the card
  //else it is the second card, cause hasplipped is already true
  if(!hasFlippedCard) {
    //first click
    hasFlippedCard= true;
    firstCard= this;
  } else {
      //second click
      hasFlippedCard=false;
      secondCard=this; //this in this context is equal to de div
      checkForMatch();
  }
}

//do cards match?
function checkForMatch(){
  //si coinciden los id de las cartas vamos a remover el event listener asi se quedan,
  //si son distintas,las volvemos a girar con la class
  if(firstCard.dataset.framework === secondCard.dataset.framework){
    //si matchean
    disableCards();
  } else{
    //si no matchean
    unflipCards();
  }
}

function disableCards(){
  firstCard.removeEventListener('click',flipCard);
  secondCard.removeEventListener('click',flipCard);

  resetBoard();
}


function unflipCards(){
  lockBoard = true;
  //console.log(lockBoard);
  setTimeout(function() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    },1500);
}

function resetBoard(){
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;

}


(function shuffle(){
  cards.forEach(function(card){
    let randomPos = Math.floor(Math.random()*6);
    card.style.order = randomPos;
  })
})(); 

//poner la funcion entre parectesis hace que se ejecute istantanemente
//(function (){alert("hello");})();

// ****** event listeners **********
cards.forEach(function(card){
  card.addEventListener('click',flipCard);
})


//lockboard me sirve para evitar que la logica colapse en caso de que decida clickear una tercera carta durante los 1,5 segundos
// que tardan en voltearse cuando no matchean las cartas