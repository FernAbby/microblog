"use strict";
function  Ajax(options){
    var defualt = {
        type: 'GET',
        url: '',
        data: null,
        contentType: 'application/x-www-form-urlencoded',
        beforeSend: function(){},
        success: function(){},
        error: function(){}
    };
    var xmlHttp = false,headType = false;
    var opts = extend(defualt,options);
    function extend(objA,objB){
        var result = '';
        for(var p in objA){
            if(objB.hasOwnProperty(p)){
                result[p] = objB[p];
            }
        }
        return result;
    }
    function createXMLRequest(){
        if(window.ActiveXObject){
            try{
                xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
            }catch(err){
                try{
                    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                }catch(err){
                    xmlHttp = false;
                }
            }
        }else if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest();
        }
        if(!xmlHttp){
            console.log('创建XMLRequest失败!');
        }
    }
    function HeadRequest(request){
        createXMLRequest();
        headType = request;
        //回调函数
        xmlHttp.onreadystatechange = getHeadInfo;
        //类型、链接、是否异步
        xmlHttp.open('POST','/test',true);
        //设置请求头部
        xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        //发送数据
        xmlHttp.send({
            name: 'wenzhen',
            password: '123456'
        });
    }
    function getHeadInfo(){
        var state = document.getElementById('state');
        if(xmlHttp.readyState == 4){
            if(xmlHttp.response){
                console.log(xmlHttp.response);
                console.log(JSON.parse(xmlHttp.response));
            }
            if(headType == 'All'){
                state.innerHTML = xmlHttp.getAllResponseHeaders();
            }else{
                state.innerHTML = headType + " : " + xmlHttp.getResponseHeader(headType);
            }
        }
    }
}