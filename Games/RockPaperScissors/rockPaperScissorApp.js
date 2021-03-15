
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
	gamePoints(competition,play,compPlay);
}

// 'You win! 👊 destroys ✌', '-win'
// 'You win! 🖐 covers 👊', '-win'
// 'You win! ✌ cut 🖐', '-win'
// 'One point each, 👊 hits 👊 ' ,''
// 'One point each, 🖐 hits 🖐',''
// 'One point each, ✌ hit ✌',''
// 'You lose, 👊 destroys ✌', '-lose'
// 'You lose, 🖐 covers 👊', '-lose'
// 'You lose, ✌ cut 🖐', '-lose'
function gamePoints(comp,userCh,compCh){
	console.log(comp);
	const userSub ="user".fontsize(3).sub();
	const compSub ="comp".fontsize(3).sub();;
	if(comp === 'RS'||comp === 'PR' ||comp === 'SP'){
		countUser +=1;
		displayLegend( `${convertToSymbol(userCh)}${userSub} destroys ${convertToSymbol(compCh)}${compSub} You win!`, '-win');
		displayPoints(countUser,countComputer);
	} else if(comp === 'RR'||comp === 'PP' ||comp === 'SS'){
		countUser +=1;
		countComputer +=1;
		
		displayLegend(`${convertToSymbol(userCh)}${userSub} hits ${convertToSymbol(compCh)}${compSub} One point each!`,'');
		displayPoints(countUser,countComputer);
	} else {
		countComputer+=1;
		displayPoints(countUser,countComputer);
		displayLegend( `${convertToSymbol(userCh)}${userSub} is destroyed by ${convertToSymbol(compCh)}${compSub} You lose!`, '-lose');
	}
	

	console.log('user points:',countUser);
	console.log('computer points:',countComputer);
	console.log(legend);
	console.log(convertToSymbol(userCh),convertToSymbol(compCh));
}


function convertToSymbol(choice){
	if(choice === 'R'){
		return '👊';
	} else if(choice === 'P'){
		return '🖐';
	} else {
		return '✌';
	}
}


function game(){
	let userPlay = this.id;
	// console.log('user:',this.id);
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


function displayLegend(text, action) {
  legend.innerHTML = text;
  legend.classList.add(`legend${action}`);
  // remove alert
  setTimeout(function () {
    legend.innerHTML = "";
    legend.classList.remove(`legend${action}`);
  }, 2500);
}


function displayPoints(textUser,textComp) {
  userPoints.innerText = textUser;
  computerPoints.innerText = textComp; 
}





