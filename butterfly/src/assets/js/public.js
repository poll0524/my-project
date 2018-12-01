var axios = require('axios');
var urlPro = 'https://api.maxbutterfly.com/api/star/v1/';
var mainLogoImageUrl = '';
// let urlPro = 'http://192.168.3.196:8888/api/star/v1/';

//axios get请求
const axiosReqGet = (url,sucFunc,token,errFunc)=>{
  var errFunc = errFunc?errFunc:function(){}
  axios({
    method:'get',
    url:urlPro+url,
    headers:{
      'X-Request-Timestamp': new Date().valueOf(),
      'Authorization': 'Bearer ' + token
    }
  })
    .then(function (res) {
      sucFunc(res.data)
    })
    .catch(function (error) {
      errFunc(error)
    });
}

const axiosWxReqGet = (url,sucFunc,token,errFunc)=>{
  var errFunc = errFunc?errFunc:function(){}
  axios({
    method:'get',
    // url:'http://192.168.3.196:8888/api/star/'+url,
    url:'https://api.maxbutterfly.com/api/star/'+url,
    headers:{
      'X-Request-Timestamp': new Date().valueOf(),
      'Authorization': 'Bearer ' + token
    }
  })
    .then(function (res) {
      sucFunc(res.data)
    })
    .catch(function (error) {
      errFunc(error)
    });
}
//axios post请求


const axiosReqPost = (url,sucFunc,token,data,type,errorFun)=>{
  let contentType = type?type:'application/json'
  let errorFuns = errorFun?errorFun:null
  axios({
    method:'post',
    url:urlPro+url,
    data:data,
    headers:{
      "Content-Type": contentType,
      "X-Request-Timestamp": new Date().valueOf(),
      "Authorization": "Bearer " + token
    }
  })
    .then(function (res) {
      sucFunc(res.data)
    })
    .catch(function (error) {
      errorFuns(error)
    });
}
//axios put请求
const axiosReqMethods = (url,sucFunc,errFunc,token,bodyValue,methods)=>{

  axios({
    method:methods,
    url:urlPro+url,
    data:bodyValue,
    headers:{
      'Content-Type':'application/json',
      'X-Request-Timestamp': new Date().valueOf(),
      'Authorization': 'Bearer ' + token
    }
  })
    .then(function (res) {
      sucFunc(res.data)
    })
    .catch(function (error) {
      errFunc(error)
    });
}
//delete

const axiosReqDelete = (url,sucFunc,token)=>{

  axios({
    method:'DELETE',
    url:urlPro+url,
    headers:{
      'X-Request-Timestamp': new Date().valueOf(),
      'Authorization': 'Bearer ' + token
    }
  })
    .then(function (res) {
      sucFunc(res.data)
    })
    .catch(function (error) {

    });
}
//获取几天后的时间戳
const getDateAfter=(value)=>{
  return new Date(new Date().setDate(new Date().getDate()+value));
}

//cookie存取token
const saveReadToken=(token,expire)=>{
  document.cookie = 'token='+token + (getDateAfter(expire).toGMTString() ? ";expires="+getDateAfter(expire).toGMTString() :" ");
}



//获取token
const getToken=()=>{
  let token = null;
  let tokenArr = document.cookie.split(';');
  for(var i in tokenArr){
    var tokenStr = tokenArr[i].replace(" ","")
    if(/^token=/.test(tokenStr)){
      token = tokenArr[i].split("=")[1];
    }
  }
  return token;
}

//获取的当前登录的用户角色
const getCurrentRole = (sucFun,errFunc) =>{
  let url = 'user';
  let token = getToken();
  axiosReqGet(url,sucFun,token,errFunc);

};

//时间错转换
//
const formatTime = (value,tool) => {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(tool) + ' ' + [hour, minute].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//base64
const base64_encode = (str) => { // 编码，配合encodeURIComponent使用
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var i = 0, len = str.length, strin = '';
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
      strin += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
      strin += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    strin += base64EncodeChars.charAt(c1 >> 2);
    strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    strin += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return strin
}

//正则表达式
const regEX = (value)=>{
  let regObj = {
    checkPhone: /^[1][3,4,5,7,8][0-9]{9}$/.test(value),
    checkBudget: /^[5][1-9]|[6-9]\d{1}|\d{3,}$/.test(value),
    checkNumber:/^\d+$/.test(value),
    checkChinese:/^[\u4e00-\u9fa5]{2,15}$/.test(value),

    checkEmail:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value),
    checkAccount:/^[0-9a-zA-Z_]{6,11}$/.test(value),
    checkNickName:/^[0-9a-zA-z\u4e00-\u9fa5_]{2,11}$/g.test(value)

  }
  return regObj;
}

//  前端分页
const webPagination = (pageNum,pageSize,array) =>{
  let offset = (pageNum - 1) * pageSize;
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
}

//验证手机号是否注册
const verifyPhoneNum =(value,sucFun,errFun) =>{
  let uri = 'sms/'+value;
  axiosReqGet(uri,sucFun,null,errFun);
}

//请求公共的配置数据
const getPublicConfigData =(value,sucFunc,token,errFunc) =>{
  axios({
    method:'get',
    url:urlPro+'config?field='+value,
    headers:{
      'X-Request-Timestamp': new Date().valueOf(),
      'Authorization': 'Bearer ' + token
    }
  })
    .then(function (res) {
      sucFunc(res.data)
    })
    .catch(function (error) {
      errFunc(error)
    });
}



module.exports ={
  axiosReqGet:axiosReqGet,
  axiosWxReqGet:axiosWxReqGet,
  axiosReqMethods:axiosReqMethods,
  axiosReqPost:axiosReqPost,
  axiosReqDelete:axiosReqDelete,
  saveReadToken:saveReadToken,
  getToken:getToken,
  formatTime:formatTime,
  formatNumber:formatNumber,
  base64_encode:base64_encode,
  getCurrentRole:getCurrentRole,
  regEX:regEX,
  webPagination:webPagination,
  verifyPhoneNum:verifyPhoneNum,
  getPublicConfigData:getPublicConfigData

}
