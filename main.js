var EC;
var saveBtn, loadBtn, inpKey, inpValue, resKey, resValue;

(function(){
	if(typeof evercookie != 'function'){
		document.addEventListener('DOMContentLoaded',function(){ //TODO: validate if this is needed as script should currently be loaded synchronous
		console.log('loaded init delayed.');
		init();
	},false);
	}else{
		console.log('loaded init directly.');
		init();
	}
})();

function init(){
	EC = new evercookie();

	saveBtn = document.getElementById('saveBtn');
	loadBtn = document.getElementById('loadBtn');

	inpKey =  document.getElementById('inpKey');
	inpValue = document.getElementById('inpValue');
	resKey = document.getElementById('resKey');
	resValue = document.getElementById('resValue'); 

	saveBtn.onclick = function(){
		createCookie(inpKey.value, inpValue.value);
	};

	loadBtn.onclick = function(){
		loadCookie(resKey.value);
	};	
}

function createCookie(key,value){
	EC.set(key,value);
	console.log('created cookie ' + key);	
}

function loadCookie(key){
	EC.get(key, function(value){
		console.log('loaded cookie ' + key + '. Value: ' + value);
		return value;
	});
}