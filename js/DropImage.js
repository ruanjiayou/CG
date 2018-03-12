/**
作者：阮家友
时间：2017-4-11 22:29:01
说明：拖拽图片并执行回调函数

**/
function DropImage(data) {
    var config = {
        selector: '',
        callback: null
    };
    for (var k in data) config[k] = data[k];
    var reader = new FileReader();
    var obj = $(config.selector);
    // 拖动选图片
    obj.on('dragover', function (e) {
        window.event ? window.event.returnValue = false : e.preventDefault();
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
    });
    obj.on('drop', function (e) {
        window.event ? window.event.returnValue = false : e.preventDefault();
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        e = e.originalEvent;
        reader.onload = function (ev) {
            //获取图片的url
            var _img_src = ev.target.result;
            //图片预览处理
            if (config.callback) config.callback.call(obj[0], _img_src);
        };
        reader.readAsDataURL(e.dataTransfer.files[0]);
    });
    // 单击选图片
    obj.click(function () {
        var oinput = document.createElement('input');
        oinput.type = 'file';
        oinput.style = 'display:none;';
        document.body.appendChild(oinput);
        oinput.onchange = function () {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(oinput.files[0]);
            if (oinput.files.length !== 0) {
                oFReader.onload = function (oFREvent) {
                    // 图片路径
                    var path = oFREvent.target.result;
                    if (config.callback)
                        config.callback.call(obj[0], path);
                    document.body.removeChild(oinput);
                };
            }
        };
        oinput.click();
    });
}

/**
 * 使元素能放被拖动的元素
 * @param {string} selector 
 */
function enableDrop(selector) {
    let obj = $(selector);
    obj.on('drop', function (evt) {
        evt.originalEvent.preventDefault();
        evt.originalEvent.stopPropagation();
        let data = evt.originalEvent.dataTransfer.getData('Text');
        $(evt.target).append($(data));
    });
    obj.on('dragover', function (evt) {
        evt.preventDefault();
    });
}

/**
 * 使一个元素能被拖动
 * @param {string} selector - 必须是id
 */
function enableDrag(selector) {
    let obj = $(selector);
    let ts = new Date().getTime();
    let s = typeof selector === 'object' ? '[did=' + ts + ']' : selector + '[did=' + ts + ']';
    obj.attr({ 'draggable': true, 'did': ts });
    obj.on('dragstart', function (evt) {
        evt.originalEvent.dataTransfer.setData('Text', s);
    });
}