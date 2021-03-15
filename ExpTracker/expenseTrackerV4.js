
//localStorage.clear();

// ****** select items **********
let createNewExpense = document.getElementById('addNewExpense');
let clearAllButton = document.getElementById("clear_button");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let numberInput = document.getElementById("numberInput");
let table = document.getElementById("expenseTable");
let totalBalance = document.getElementById("balance");
let income = document.getElementById("income");
let expense = document.getElementById("expense");

// ****** event listeners **********
createNewExpense.addEventListener("click", createExpense);
clearAllButton.addEventListener("click",clearAllExpenses);

// display items onload (queremos mostrar todo lo que tenemos guardado en localStorage)
window.addEventListener("DOMContentLoaded", setupItems);



function createExpense(){							
	//esta funcion se encarga de guardar en localStorage el input del form Y LLAMAR A LA FUNCION QUE LA AÑADE AL DOM	
	// debugger;
	//e.preventDefault();
	let key = new Date().getTime().toString();
	let valueObj = {
		expenseText:textInput.value,
		expenseDate:dateInput.value,
		expenseAmount:numberInput.valueAsNumber
	};

	if(!valueObj.expenseText | !valueObj.expenseDate | !valueObj.expenseAmount){
		document.getElementById('note').hidden = false;
	} else {
		addAmountToBalance(valueObj);										
		addExpenseToDOM(key,valueObj);	
		// set local storage
    addToLocalStorage(key, valueObj);	
	}																	
	//reseteo  los forms a vacio
	setBackToDefault();																					
}

function addAmountToBalance(valueObj){
	let totIncome = parseInt(income.children[1].innerText);
	let totExpense = parseInt(expense.children[1].innerText);

	if(valueObj.expenseAmount > 0){
		totIncome += valueObj.expenseAmount;
		income.children[1].innerHTML =` ${totIncome}`;
	} else{
		totExpense += valueObj.expenseAmount;
		expense.children[1].innerHTML =` ${totExpense}`;
	}
	let totBalance = totIncome + totExpense;
	totalBalance.children[1].innerHTML = totBalance;
	balanceColor(totBalance);

	// console.log(totIncome,totExpense,totBalance);
}

function removeExpenseFromBalance(key){
	let storedExpenses= getLocalStorage(); 	
  	let deleted = storedExpenses.filter((item) => item.key === key);
  	let totIncome = parseInt(income.children[1].innerText);
	let totExpense = parseInt(expense.children[1].innerText);

	if(deleted[0].value.expenseAmount> 0){
		totIncome -= deleted[0].value.expenseAmount;
		income.children[1].innerHTML =` ${totIncome}`;
	} else{
		totExpense -= deleted[0].value.expenseAmount;
		expense.children[1].innerHTML =` ${totExpense}`;
	}
	let totBalance = totIncome + totExpense;
	totalBalance.children[1].innerHTML = totBalance;
	balanceColor(totBalance);

	// console.log(deleted[0].value.expenseAmount);
}
function balanceColor(balance){
	balance > 0 ? totalBalance.children[1].style.color= '#38b000' 
	: balance < 0 ? totalBalance.children[1].style.color= '#d90429'
	: totalBalance.children[1].style.color= '#FFFFF1';
}

function addExpenseToDOM(key,valueObj){									
// console.log(valueObj);
let noData = document.getElementById("no-data");
noData ? noData.remove() : noData = false;	
// (recibe el VALUE) esta funcion maneja la interaccion con el DOM una vez que ya tenemos el valor de la nota, la insertamos
let elementCount = table.childNodes[1] ? table.childNodes[1].childElementCount : 1;
// console.log(elementCount);
let row = table.insertRow(elementCount);
let cell0 = row.insertCell(0);
let cell1 = row.insertCell(1);
let cell2 = row.insertCell(2);
let cell3 = row.insertCell(3);
			
	cell0.innerHTML = valueObj.expenseText;
	cell1.innerHTML = valueObj.expenseDate;
	cell2.innerHTML = valueObj.expenseAmount;

	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'x';
	deleteButton.className = 'deleteButton';
	deleteButton.addEventListener("click",deleteExpense);
	cell3.appendChild(deleteButton);
	row.id = key;
}

function setBackToDefault() {
 	textInput.value="";
	dateInput.value="";
	numberInput.value="";	 
}

function deleteExpense(event){
	let elementClicked = event.target;   
	let key = elementClicked.parentNode.parentNode.id;
	let expense = document.getElementById(key);
	expense.parentNode.removeChild(expense);
	removeExpenseFromBalance(key);
	removeExpenseFromLocalStorage(key);
	//funciona rapido por ser mini app. Lopongo para que aparezca NO DATA al borrar lo ultimo
	window.location.reload()
}


// FUNCION PARA BOTON EN DESUSO
function clearAllExpenses() {
	let expenseTable = document.getElementById("expenseTable");
	let expenses = expenseTable.childNodes; 								//esto es un array de todos los "children" del elemento table, es decir cada row
	for (let i = expenses.length-1; i >= 0; i--) {
		expenseTable.removeChild(expenses[i]);								//itero por cada child del array y lo remuevo
	}
	setBackToDefault();
	localStorage.removeItem("expenseTable");	
}


 // ******************* local storage *********************
function addToLocalStorage(key,value){
	let expense = {key:key,value:value};
	//console.log(expense);
	let storedExpenses = getLocalStorage();
	storedExpenses.push(expense);
	localStorage.setItem('expenseTable',JSON.stringify(storedExpenses));
}

function getLocalStorage() {
	let storedExpenses = localStorage.getItem("expenseTable");
	if (storedExpenses == null || storedExpenses == "") {
		storedExpenses = [];
	}
	else {
		storedExpenses = JSON.parse(storedExpenses);
	}
	return storedExpenses;
}

function removeExpenseFromLocalStorage(key) {

	let storedExpenses= getLocalStorage(); 	

  //sobreescribo el array con este nuevo array filtrado que no posee el elemento con el ID indicado
  storedExpenses = storedExpenses.filter(function (item) {
    if (item.key !== key) {
      return item;
    }
  });
//guardo el nuevo array sin el elemento que acabo de eliminar
  localStorage.setItem("expenseTable", JSON.stringify(storedExpenses));																		
}

// ****** setup items **********
//PARA CARGAR LA INFO DEL LOCAL STORAGE
function setupItems() {
  let storedExpenses= getLocalStorage();

  if (storedExpenses.length > 0) {
    storedExpenses.forEach(function (item) {
      addExpenseToDOM(item.key, item.value);
      addAmountToBalance(item.value);
    });
  } else {
		table.innerHTML = "<tr><th>Name</th><th>Date</th><th>Amount</th><th>Delete</th></tr><tr><td id='no-data' colspan='4' style = text-align:center;color:#F6B352;padding:50px 0;>NO DATA</td></tr> ";
        return;
	}
}







