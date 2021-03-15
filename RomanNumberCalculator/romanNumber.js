	
	var newString = document.querySelectorAll('.newString');
	var container = document.querySelector('.result');
	
							
	newString[0].onclick = romanToArabic;
	newString[1].onclick = ArabicToRoman;
	var textInput = document.querySelectorAll('.textInput');   //para que funcione tanto con click como con enter
	textInput[0].onkeypress = handleKeyPress;
	textInput[1].onkeypress = handleKeyPress;

	

let count=0;
let count2='';


function romanToArabic () {
	//debugger;
	removeResultFromDOM();
	var textInput = document.querySelectorAll('.textInput');
	string1 = textInput[0].value.toLocaleUpperCase();
	romanArray = string1.split('');	
	if(string1 ===''){return}else{																	
		for (var i = 0; i < romanArray.length; i++) {
			//debugger;
    		if (romanArray[i] ==="M"){
    			count = count+1000;
    			if(romanArray[i-1]==="C"){
    				count = count-200;
    			}
    		}
    		if (romanArray[i] ==="D"){
    			count = count+ 500;
    			console.log(count);
    			if(romanArray[i-1]==="C"){
    				count = count-200;
    			}
    			if(romanArray[i+1]==="D" || romanArray[i+1]==="M"){
    				alert("Enter a valid number!");
    				count=0;
    				return
    			}
    		}

    		if (romanArray[i] ==="C"){
    			count = count + 100;
    			if(romanArray[i-1]==="X"){
    				count = count-20;
    			}
    			if(romanArray[i+1]==="C" && (romanArray[i+2]==="D" || romanArray[i+2]==="M") || romanArray[i+2]==="M" ){
    				alert("Enter a valid number!");
    				count=0;
    				return
    			}
    		}
    		if (romanArray[i] ==="L"){
    			count = count + 50;
    			if(romanArray[i-1]==="X"){
    				count = count-20;
    			}
    			if(romanArray[i+1]==="L" || romanArray[i+1]==="C" || romanArray[i+1]==="D" || romanArray[i+1]==="M"){
    				alert("Enter a valid number!");
    				count=0;
    				return
    			}
    		}
    		if (romanArray[i] ==="X"){
    			count = count + 10;
    			if(romanArray[i-1]==="I"){
    				count = count-2;
    			}
    			if( romanArray[i+1]==="D" || romanArray[i+1]==="M" || romanArray[i+2]==="C" ){
    				alert("Enter a valid number!");
    				count=0;
    				return
    			}
    		}
    		if (romanArray[i] ==="V"){
    			count = count + 5;
    			if(romanArray[i-1]==="I"){
    				count = count-2;
    			}
    			if(romanArray[i+1]==="V" || romanArray[i+1]==="X" || romanArray[i+1]==="L" || romanArray[i+1]==="C" | romanArray[i+1]==="D" || romanArray[i+1]==="M"){
    				alert("Enter a valid number!");
    				count=0;
    				return
    			}
    		}
    		if (romanArray[i] ==="I"){
    			count = count + 1;
    			if(romanArray[i+1]==="L" || romanArray[i+1]==="C" || romanArray[i+1]==="D" || romanArray[i+1]==="M"){
    				alert("Enter a valid number!");
    				count=0;
    				return
    			}
    		}
		}
		textInput[0].value = "";
		if (count===0){return};	// asi no se activa cuando hago enter para activar la otra funcion
		addResultToDOM(count);
		count=0;							
	}
}


//**************Arrays para arabig to roman******************

myUnitArray = ['','I','II','III','IV','V','VI','VII','VIII','IX'];
myTenArray = ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'];
myHundredArray = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM','M'];

function ArabicToRoman (){
	//debugger;
	removeResultFromDOM();
	
	var textInput = document.querySelectorAll('.textInput');

	numberInput = textInput[1].value;
	if(numberInput<0 || numberInput>4000 ){
		textInput[1].value = ""
		alert("Please enter a value between 1 - 3999.")
	}else{
		if(numberInput.length === 4) {
			for(var i = 0; i< numberInput[0]; i++){
				count2 += 'M';
			}
		
			let hundred = myHundredArray[numberInput[1]];
			count2 += hundred;

			let ten = myTenArray[numberInput[2]];
			count2 += ten;

			let unit = myUnitArray[numberInput[3]];
			count2 += unit;	
			addResultToDOM(count2);
			textInput.value = "";
			count2 = '';
			return
		} else if(numberInput.length === 3){
			let hundred = myHundredArray[numberInput[0]];
			count2 += hundred;

			let ten = myTenArray[numberInput[1]];
			count2 += ten;

			let unit = myUnitArray[numberInput[2]];
			count2 += unit;
			addResultToDOM(count2);
			textInput.value = "";
			count2 = '';
			return
		} else if (numberInput.length === 2){
			let ten = myTenArray[numberInput[0]];
			count2 += ten;

			let unit = myUnitArray[numberInput[1]];
			count2 += unit;
			addResultToDOM(count2);
			textInput.value = "";
			count2 = '';
			return
		} else if (numberInput.length === 1){
			let unit = myUnitArray[numberInput[0]];
			count2 += unit;
			if (count2===''){return};
			addResultToDOM(count2);
			textInput[1].value = "";
			count2 = '';
			return
		}else{
			return
		}
	}
}

function addResultToDOM (value){
	const element = document.createElement("p");
    element.classList.add('textResult');
    element.innerHTML = value;
   // console.log(container);
   // console.log(element);
    container.appendChild(element);
    //container.removeChild(element);
}

function removeResultFromDOM() {
    // Find the parent element
    var parent = document.querySelector('.result');

    if (parent) {
        // Find all the child nodes in parent element
        var child = parent.children;
        //console.log(child.item(0));
        // If the child exists, remove it
        if (child.item(0)) {
            child.item(0).remove();
        }
    }
}

function handleKeyPress(e) {
	var newString = document.querySelectorAll('.newString');

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		newString[0].click();
		newString[1].click();
		return false;
	}
}


