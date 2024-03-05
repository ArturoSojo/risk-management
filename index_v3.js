var domain="demo.paguetodo.com";
//var domain="localhost";
var base="https://"+domain+"/";
function baseApp(){
	return base;
}
function getDomain(){
	return domain;
}
function doLogout(){
	localStorage.clear();
	sessionStorage.clear();
}
function getClient(){
	return 'a5d61910-efb5-4771-91e7-ebabdd3c6b4f';
}
function getAppId(){
	return '99475e85-9623-40b5-8f45-0dfbc78adb77'
}
function getPaguetodoId(){
	return "dfb8aca9-5259-4582-ad81-9ffe0ae75ad3"
}
function getApi(){
	return "https://apid.paguetodo.com/demo/";
}
function getStatic(){
	return "https://staticd.paguetodo.com/"
}
function redirectUri(){
	return "/login";
}
function enabledProd(){
	return false;
}
function getEnlaceAuth(){
	return "deeglev2_auth";
}
function getEnlaceApi(){
	return "deeglev3";
}
function getEnlaceApiv2(){
	return "deeglev2";
}
function baseExtra(){
	return "demo/";
}
function getLoginUri(){
	
    return base+'login/';
}