
var view = {

	displayMessage: function(msg){
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location){
		var cell= document.getElementById(location);
		cell.setAttribute("class","hit");
	},

	displayMiss: function(location){
		var cell= document.getElementById(location);
		cell.setAttribute("class","miss");
	}
};


//logica/modelo del juego: primero tenemos que decidir como representar los barcos en el juego
//vamos a hacer un un array con un onjeto para cada barco, cada objeto tiene 2 propiedades

var model = {

	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	ships: [{locations:[0,0,0],hits:["","",""]},	
			{locations:[0,0,0],hits:["","",""]},
			{locations:[0,0,0],hits:["","",""]} ],

	fire: function(guess){


		for(var i = 0; i < this.numShips; i++){
			var ship = this.ships[i];
			//locations es un ARRAY y guess es un numero. Necesito compararlos, con lo cual podria iterar nuevamente con otro for loop, o usar indexOf property, que busca en un array si hay un valor que matchee el numero y te trae -1 si no encuentra nada
			//index va a guardar el -1, si no hay match, o el numero donde este el hit
			var index = ship.locations.indexOf(guess);
			if(index >= 0){

				ship.hits[index]="hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");
			//inmediatamente llamo a la funcion sunk para chequear si acumule 3 hist y hundi el barco
				if (this.isSunk(ship)){
					view.displayMessage("You sank my battleship!")
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},
	isSunk: function(ship){
		for(var i = 0; i < this.shipLength; i++){
			if(ship.hits[i] !== "hit"){
				return false;
			}
		}
		return true;
	},

	generateShipLocations: function() {
		var locations;
		for ( var i = 0; i < this.numShips; i++){
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	generateShip: function() {
		var direction = Math.floor(Math.random()*2);
		var row, col;
		// si da uno lo hacemos horizontal
		if (direction === 1){
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength)); // como estamos generando simplemente la posicion inicial, tenemos que dejar lugar para que las otras dos posiciones entren en el tablero
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];

		for (var i = 0; i < this.shipLength; i++){
			if (direction === 1){
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}

		return newShipLocations;

	},

	collision: function (locations) {

		for ( var i = 0; i < this.numShips; i++){
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++){
				if ( ship.locations.indexOf(locations[j]) >= 0){
					return true;
				}
			}
		}
		return false;
	}
};


var controller = {
	guesses: 0,
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location){
			this.guesses++;
			//ACA ES DONDE ACCIONAMOS EL MECANISMO DEL METODO FIRE, QUE LUEGO ACIONA VIEW Y SE ACTUALIZA EL JUEGO
			var hit = model.fire(location);
			if(hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships in " + this.guesses + " guesses.");
				document.getElementById("guessInput").disabled = true;
			}
		}
	}
};

function parseGuess(guess) {
	var alphabet = ["A","B","C","D","E","F","G"];
	if (guess === null || guess.length !== 2){
		alert('Ops, please enter a letter and a number on the board');
	} else {
		firstChar = guess.charAt(0); //letra en primer lugar
		var row = alphabet.indexOf(firstChar); //trae el numero en primer lugar
		var column = guess.charAt(1); //numero en segundo lugar
		
		if (isNaN(row) || isNaN(column)){
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}

window.onload = init;

function init() {

	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	model.generateShipLocations();


}

function handleFireButton(){
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress; // CODIGO ADICIONAL para agregar ENTER como trigger ademas del click.
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
}

function handleKeyPress (e){

	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13){
		fireButton.click();
		return false;
	}
}


















//controller.processGuess("A0");
//controller.processGuess("A6");
//controller.processGuess("B6");
//controller.processGuess("C6");
//controller.processGuess("C4");
//controller.processGuess("D4");
//controller.processGuess("E4");
//controller.processGuess("B0");
//controller.processGuess("B1");
//controller.processGuess("B2");
