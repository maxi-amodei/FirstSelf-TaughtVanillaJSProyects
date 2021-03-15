
window.onload=init;

function init() {

	var newString = document.getElementById('newString');						
	newString.onclick = vowelCount;
	var textInput = document.getElementById('textInput');   //para que funcione tanto con click como con enter
	textInput.onkeypress = handleKeyPress;


} //final de init

count = 0;
myArray = ['a','e','i','o','u'];



function vowelCount () {

	var textInput = document.getElementById('textInput');
	string1 = textInput.value.toLocaleLowerCase(); 			// esto lo hace case insensitive

	for (var i = 0; i < string1.length; i++) {
    	for(var j = 0; j < myArray.length;j++){
        	if(string1.charAt(i) === myArray[j]){
         	count++;   
        	}
    	}
	}
	textInput.value = "";							// reseteo el for asi vuelve a vacio
	alert(count);
	count=0;
}



function handleKeyPress(e) {
	var newString = document.getElementById('newString');

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		newString.click();
		return false;
	}
}


// SEGUNDA FORMA DE HACERLO

/*

function vowelCount () {
	var textInput = document.getElementById('textInput');
	string1 = textInput.value.toLocaleLowerCase(); 			// esto lo hace case insensitive
	var index =  ;
	
	textInput.value = "";							// reseteo el for asi vuelve a vacio
	alert(count);
	count=0;
	
}

let str = 'You do not know what you do not know until you know.';
let substr = ['a','o'];

let count = 0;
for (var i = 0; i < substr.length; i++){
 let index = str.indexOf(substr[i]);
 while(index !== -1) {
     count++;
     index = str.indexOf(substr[i], index + 1);
 }
}
console.log(count)











let str = 'You do not know what you do not know until you know.';
let substr = 'know';

let count = 0;

let index = str.indexOf(substr);
while(index !== -1) {
    count++;
    index = str.indexOf(substr, index + 1);
}

console.log(count);

let str = 'JS indexOf';
let substr = 'js';

let index = str.toLocaleLowerCase().indexOf(substr.toLocaleLowerCase());

console.log(index); // 0
Summary
The indexOf() returns the index of the first occurrence of a substring in a string, or -1 if the string does not contain the substring.
The indexOf() is case-sensitive.



*/