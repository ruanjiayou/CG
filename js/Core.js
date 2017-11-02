//IE78支持trim()方法
if (String.trim == undefined) {
    String.prototype.trim = function () {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
}
//事件
var Event = {
    //绑定事件
    addEvent: function (o, type, fn) {
        var handler = fn;
        if (o.addEventListener) {
            o.addEventListener(type, handler, false);
        }
        else if (o.attachEvent) {
            handler = function (e) {
                fn.call(o);
            };
            o.attachEvent('on' + type, handler);
        }
    },
    //取消绑定
    delEvent: function (o, type, fn) {
        if (o.removeEventListener) {
            o.removeEventListener(type, fn, false);
        }
        else {
            if (o.detachEvent) {
                o.detachEvent('on' + type, fn);
            }
        }
    },
    //取消默认函数
    cancelDefault: function (e) {
        window.event? window.event.returnValue = false : e.preventDefault();
    },
    //取消冒泡
    stopBubble: function(e){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
    }
}
//将url中的参数转为json对象 toURL方法接受url(空字符串代表当前页面的url)和json对象并转为有参数的url形式
if(window.location.origin===void 0) window.location.origin = window.location.protocol + "" + window.location.hostname + "" + window.location.port;
function URL(args) {
    var urlArgObj = {};
    if(args && args.length!==0) {
        urlArgObj.url = args;
        urlArgObj.baseUrl = args;
    }
    else{
        urlArgObj.url = window.location.href;
        urlArgObj.baseUrl = window.location.origin + window.location.pathname;
    }
    urlArgObj.data = {};
    var temp = urlArgObj.url.substring(urlArgObj.url.indexOf("?") + 1);
    var tempArr = temp.split("&");
    for (var i = 0; i < tempArr.length; i++) {
        temp = tempArr[i].split("=");
        if (temp.length == 2 && temp[0] != "") {
            urlArgObj.data[temp[0]] = temp[1];
        }
    }
    urlArgObj.toUrl = function (url, data) {
        var str;
        if (this.isUrl(url)) str = url + "?";
        else str = this.baseUrl + "?";
        for (var k in data) {
            str += k + "=" + data[k] + "&";
        }
        if (/&$/.test(str)) str = str.substring(0, str.length - 1);
        return str;
    }
    urlArgObj.isUrl = function (v) {
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(v);
    }
    urlArgObj.hasKey = function (str) {
        var res = false;
        if (str != "" && this.data[str] !== null) res = true;
        return res;
    };
    urlArgObj.getValue = function (k) {
        if (this.data[k] != null) return this.data[k];
        else return "";
    }
    urlArgObj.getValues = function () {
        return this.data;
    }
    urlArgObj.setValue = function (keys) {
        for (var k in keys) this.data[k] = keys[k];
        return this;
    };
    urlArgObj.setValues = function (keys) {
        this.data = {};
        for (var k in keys) this.data[k] = keys[k];
        return this;
    }
    return urlArgObj;
}
//3.Cookie
var Cookie = {
    data: {},
    Init: function(){
        var cookieArr = document.cookie.split(";");
        var temp;
        var s="";
        for(var i=0; i< cookieArr.length; i++){
            temp = cookieArr[i].split("=");
            s = temp[0].trim();
            if(s!="")
                this.data[temp[0].trim()] = temp[1];
        }
    },
    setKey: function(k, v){
        switch(arguments.length){
            case 1:
                if(typeof k == "object"){
                    for(var attr in k){
                        this.data[attr] = k[attr];
                        document.cookie = attr + "=" + k[attr] + "; ";
                    }
                }
            break;
            case 2:
                if(typeof k == "string" && k!="" && typeof v == "string"){
                    this.data[k] = v;
                    document.cookie = k + "=" + v + "; ";
                }
            break;
            default:console.log("setKey函数参数不匹配！");break;
        }
        this.log();
    },
    getKey: function(k){
        this.log();
        if(this.data[k]==undefined || this.data[k]==null){
            return "";
        }
        else{
            return this.data[k];
        }
    },
    clearKey: function(k){
        var Days = 30;
        var exp = new Date();
        //exp.setTime(exp.getTime() + Days*24*60*60*1000);
        exp.setTime(exp.getTime()-1);
        document.cookie = k+"=x;expires="+exp.toGMTString();
        delete this.data[k];
        this.log();
    },
    log: function(){
        //console.log(document.cookie);
        //console.log(this.data);
    }
};
Cookie.Init();
//创建Node节点
function NewNode(tag, attrs, txt) {
    var res = document.createElement(tag);
    if (attrs != null)
        for (var k in attrs) {
            if(k=="className"){
                res.className = attrs[k];
                continue;
            }
            if (typeof attrs[k] == "object" && k == "style") $(res).css(attrs[k]);
            else $(res).attr(k, attrs[k]);
        };
    if (txt != null) {
        if(tag=="input" || tag=="select" || tag=="textarea")
            res.value = txt;
        else
        res.appendChild(document.createTextNode(txt));
    }
    return res;
}
//使用：<script>new CSheet().addCSSRulers({".temp":"background-color: #ccc; color: #c00;"});</script>
//当样式识别不了时会报错(IE)
function CSheet(rulers,win){
    this.style = (function(){
        var doc = document;
        if(win){
            doc = win.document;
        }
        var style = doc.createElement("style");
        doc.getElementsByTagName("head")[0].appendChild(style);
        //style.appendChild(doc.createTextNode(""));/* For Safari */
        return style;
    })();
    this.sheet = this.style.styleSheet || this.style.sheet;;
    if(rulers) this.addCSSRulers(rulers);
    return this;
}
CSheet.prototype.addCSSRulers = function(rulerJson){
    for(var k in rulerJson)
        this.addCSSRuler(k,rulerJson[k]);
    return this;
}
CSheet.prototype.addCSSRuler = function(selector,ruler){
    try{
        if(this.sheet.insertRule)
            this.sheet.insertRule(selector+" {"+ruler+"}",this.sheet.cssRules.length);
        else if("addRule" in this.sheet)
            this.sheet.addRule(selector,ruler,-1);
        return this;
    }
    catch(e){
        console.log("浏览器无法识别这种样式："+selector+" "+ruler)
    }
    
}
CSheet.prototype.empty = function(){
    return this;
}
