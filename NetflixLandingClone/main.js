const tabs = document.querySelectorAll('.tab-item');
const content = document.querySelectorAll('.tab-content-item');

console.log(content);

tabs.forEach(item =>item.addEventListener('click',selectItem));

function selectItem(){
	removeBorder();
	this.classList.add('tab-border');
	let item = document.getElementById(`${this.id}`+'-content');
	removeShow();
	item.classList.add('show');
}



function removeBorder(){
	return tabs.forEach(item =>item.classList.remove('tab-border'));
}

function removeShow(){
	return content.forEach(item =>item.classList.remove('show'));
}