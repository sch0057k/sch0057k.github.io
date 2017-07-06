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

	//configure which methods to use


	EC.get(COOKIE_KEY, getCookie);		
}

function getCookie(best_candidate, all_candidates){
    log("The retrieved cookie is: " + best_candidate);

    if(best_candidate != 'undefined'){
    	for (var item in all_candidates)
		log("Storage mechanism " + item +
			" returned: " + all_candidates[item]);	
    }else{ //no cookie present create new one
    	EC.set(COOKIE_KEY,createNewCookieValue);
    }	
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