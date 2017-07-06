var EC;
var saveBtn, loadBtn, inpKey, inpValue, resKey, resValue;

var COOKIE_KEY = 'SOM-EVERCOOKIE-TEST';

var OPTIONS = {
	history: false, // CSS history knocking or not .. can be network intensive
	java: true, // Java applet on/off... may prompt users for permission to run.
	tests: 10,  // 1000 what is it, actually?
	silverlight: false, // you might want to turn it off https://github.com/samyk/evercookie/issues/45,
	lso: true, // local storage
	domain: '.' + window.location.host.replace(/:\d+/, ''), // Get current domain
	baseurl: '', // base url for php, flash and silverlight assets
	asseturi: '/assets', // assets = .fla, .jar, etc
	phpuri: '/php', // php file path or route
	authPath: false, //'/evercookie_auth.php', // set to false to disable Basic Authentication cache
	swfFileName: '/evercookie.swf',
	xapFileName: '/evercookie.xap',
	jnlpFileName: '/evercookie.jnlp',
	pngCookieName: false, //'evercookie_png',
	pngPath: '/evercookie_png.php',
	etagCookieName: false, //'evercookie_etag',
	etagPath: '/evercookie_etag.php',
	cacheCookieName: false, //'evercookie_cache',
	cachePath: '/evercookie_cache.php',
	hsts: false,
	hsts_domains: [],
	db: true, // Database
	idb: true // Indexed DB
};

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
	EC = new evercookie(OPTIONS);

	EC.get(COOKIE_KEY, getCookie);		
}

function getCookie(best_candidate, all_candidates){
    log("The retrieved cookie is: " + best_candidate);

    if(best_candidate != 'undefined' && best_candidate != undefined && best_candidate != null){
    	var table = document.getElementById('table');
    	for (var item in all_candidates){
    		var row = table.insertRow(1);
    		var cell1 = row.insertCell(0);
    		var cell2 = row.insertCell(1);
    		cell1.innerHTML = item;
    		cell2.innerHTML = all_candidates[item];
    	}
		/*log("Storage mechanism " + item +
			" returned: " + all_candidates[item]);	*/
    }else{ //no cookie present create new one
    	var val = createNewCookieValue();
    	EC.set(COOKIE_KEY,val);
    	log('Created new cookie with value: ' + val);
    }
    document.getElementById('loading_indicator').style.display = 'none';	
}

function createNewCookieValue(){
	var val = 'SOM';
	var now = new Date();

	val = [val, now.getHours()+'h',now.getMinutes()+'m',now.getDate(),now.getMonth()+1,now.getFullYear(),].join('-');

	return val;
}


function log(msg){
	var l = document.getElementById('log');
	l.innerHTML += '<p>' + msg + '</p>';
}