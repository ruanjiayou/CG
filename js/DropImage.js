/**
作者：阮家友
时间：2017-4-11 22:29:01
说明：拖拽图片并执行回调函数

**/
function DropImage(data){
    var config = {
        selector: "",
        callback: null
    }
    for(var k in data) config[k] = data[k];
    var reader = new FileReader();
    var obj = $(config.selector);
    obj.on("dragover",function(e){
        window.event? window.event.returnValue = false: e.preventDefault() ;
        window.event? window.event.cancelBubble = true : e.stopPropagation();
    });
    obj.on("drop",function(e){
        window.event? window.event.returnValue = false: e.preventDefault() ;
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        var e = e.originalEvent;
        reader.onload = function(ev){
            //获取图片的url
            var _img_src = ev.target.result;
            //图片预览处理
            if(config.callback) config.callback.call(obj[0],_img_src);
        }
        reader.readAsDataURL(e.dataTransfer.files[0]);
    });
}