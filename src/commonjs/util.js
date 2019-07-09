import { message } from 'antd';

function randomString(len) {
　　len = len || 32;
　　/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (var i = 0; i < len; i++) {
　　　	pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

/**
 * html5 本地存储 存值
 * @param key
 * @param data
 */
function setLocalStorage(key,data){
	var storage = null;
	if(window.localStorage){
		storage = window.localStorage;
		storage.setItem(key,data);
	}
	else{
		console.log('此版本浏览器不支持localStorage本地存储');
	}
}

/**
 * html5 本地存储 取值
 * @param key
 * @returns
 */
function getLocalStorage(key){
	var storage = null;
	if(window.localStorage){
		storage = window.localStorage;
		var value = storage.getItem(key);
		return value;
	}
	else{
		console.log('此版本浏览器不支持localStorage本地存储');
		return null;
	}
}

function getParams(param,method) {
    let obj = {
        header:{
            "agent":"gh",
            "version":"1.0",
            "device":"",
            "platform":"",
            "locale":"CN",
            "ext":"0"
        },
        request:{
            params:{
                uID: "admin",
                pwd: "admin",
                luID: "",
            }
        }
    }
    obj['request']['method'] = method;
    for(var key in param) {
        obj['request']['params'][key] = param[key];
    }
    return obj;
}

function getParamter(param) {
    var reg = new RegExp("(^|&)"+ param +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
   	 	return  unescape(r[2]); 
    return null;
}

function bubbleAutoClose(msg,fn,seconds=2) {
    message.info(msg,seconds,fn);
}

export {
    randomString,
    setLocalStorage,
    getLocalStorage,
    getParams,
    getParamter,
    bubbleAutoClose
}