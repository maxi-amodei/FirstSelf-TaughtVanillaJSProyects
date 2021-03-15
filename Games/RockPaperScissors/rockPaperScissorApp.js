
const rock = document.getElementById('R');
const paper = document.getElementById('P');
const scissor = document.getElementById('S');
const userPoints = document.getElementById('user');
const computerPoints = document.getElementById('computer');
const legend = document.querySelector(".legend");

let countUser = 0;
let countComputer = 0;
const gameArray = ['R','P','S'];

rock.addEventListener('click',game);
paper.addEventListener('click',game);
scissor.addEventListener('click',game);



function randomPlay(play){
	let random = Math.floor(Math.random()*gameArray.length);
	let compPlay = gameArray[random];
	let competition = play.concat(compPlay);
	gamePoints(competition);
	console.log('computer:',compPlay);
}

function game(){
	let userPlay = this.id;
	console.log('user:',this.id);
	randomPlay(userPlay);

	if(countUser === 10 && countComputer === 10 ){
		if(confirm('It was a tie! Press ok to restart')){
			window.location = 'file:///C:/Users/maxi_/OneDrive/Web/MyFirstApps/RockPaperScissors/index.html';
		}
		return
	}
 	if(countUser === 10){
		if(confirm('You win! Press ok to restart')){
			window.location = 'file:///C:/Users/maxi_/OneDrive/Web/MyFirstApps/RockPaperScissors/index.html';
		}
		return
	}
	if(countComputer === 10){
		if(confirm('You lose. Press ok to restart')){
			window.location = 'file:///C:/Users/maxi_/OneDrive/Web/MyFirstApps/RockPaperScissors/index.html';
		}
		return
	}
}

function gamePoints(comp){
	
	console.log(comp);
	if(comp === 'RS'){
		countUser +=1;
		displayLegend('You win! 👊 destroys ✌', '-win');
		displayPoints(countUser,countComputer);
	} else if(comp === 'PR'){
		countUser +=1;
		displayLegend('You win! 🖐 covers 👊', '-win');
		displayPoints(countUser,countComputer);
	} else if(comp === 'SP'){
		countUser +=1;
		displayLegend('You win! ✌ cut 🖐', '-win');
		displayPoints(countUser,countComputer);
	} else if(comp === 'RR'){
		countUser +=1;
		countComputer +=1;
		displayLegend('One point each, 👊 hits 👊 ' ,'');
		displayPoints(countUser,countComputer);
	} else if(comp === 'PP'){
		countUser +=1;
		countComputer +=1;
		displayLegend('One point each, 🖐 hits 🖐','');
		displayPoints(countUser,countComputer);
	} else if(comp === 'SS'){
		countUser +=1;
		countComputer +=1;
		displayLegend('One point each, ✌ hit ✌','');
		displayPoints(countUser,countComputer);
	} else {
		countComputer+=1;
		displayPoints(countUser,countComputer);
		if(comp === 'SR') {
		displayLegend('You lose, 👊 destroys ✌', '-lose');
		}
		if(comp === 'RP') {
		displayLegend('You lose, 🖐 covers 👊', '-lose');
		}
		if(comp === 'PS') {
		displayLegend('You lose, ✌ cut 🖐', '-lose');
		}
	}

	console.log('user points:',countUser);
	console.log('computer points:',countComputer);
	console.log(legend);
}

function displayLegend(text, action) {
  legend.textContent = text;
  legend.classList.add(`legend${action}`);
  // remove alert
  setTimeout(function () {
    legend.textContent = "";
    legend.classList.remove(`legend${action}`);
  }, 2500);
}
function displayPoints(textUser,textComp) {
  userPoints.innerText = textUser;
  computerPoints.innerText = textComp; 
}





