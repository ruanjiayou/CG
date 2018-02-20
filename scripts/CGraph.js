/*
作者：max
时间：2017-3-10 14:49:14
说明：
    2017-3-23 08:52:17
    整理CG.js
    2017-3-23 13:04:31
    createImageData后才能getImageData 而且create后要初始化
    canvas的offsetWidth在ff中有毒！
    2017-5-3 17:09:03 增加requestAnimateFrame
    2017-10-10 22:31:07 缺Label对象 { text, font, color, width, height, }
    prototype处理的函数太混乱 处理的对象与返回值太乱
*/
/** 
 * 请求动画帧
 */
window.requestAnimateFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
})();
/**
 * 初始化一个封装的canvas对象
 * @param {string|array} obj - 节点id或data数组
 */
function CGraph(obj) {
    this.mCanvas = null;
    this.mGC = null;
    this.mWidth = 0;
    this.mHeight = 0;
    this.mData = [];
    switch (typeof obj) {
        case 'string':
            this.mCanvas = document.getElementById(obj);
            break;
        case 'object':
            this.mCanvas = document.createElement('canvas');
            break;
        default:
            this.mCanvas = document.createElement('canvas');
            break;
    }
    this.mGC = this.mCanvas.getContext('2d');
    this.mWidth = this.mCanvas['width'];
    this.mHeight = this.mCanvas['height'];
    return this;
}
/**
 * 加载图片
 * @param {string} url - 图片地址
 */
CGraph.prototype.load = function (url, cb) {
    let img = new Image();
    let that = this;
    img.onload = function () {
        that.setSize(this.width, this.height);
        that.mGC.drawImage(this, 0, 0);
        that.mData = that.mGC.getImageData(0, 0, this.width, this.height);
        cb.call(that);
    };
    img.src = url;
};
/**
 * 将数据渲染为图片
 * @param {array} data - 图像数据
 */
CGraph.prototype.render = function (data) {
    if (data) {
        this.mGC.putImageData(data, 0, 0);
    } else {
        this.mGC.putImageData(this.mData, 0, 0);
    }
    return this;
};
/**
 * 动画系统
 * @param {function} fn - 回调函数
 * @param {array} args - 参数
 */
CGraph.prototype.run = function (fn) {
    let that = this;
    let anonymous = function () {
        fn.call(that);
        requestAnimateFrame(anonymous);
    };
    requestAnimateFrame(anonymous);
    return this;
};
/**
 * 清空画布
 */
CGraph.prototype.clear = function () {
    this.mGC.clearRect(0, 0, this.mWidth, this.mHeight);
    return this;
};
/**
 * 文档相关方法
 * @param {object} [obj] - node节点
 */
CGraph.prototype.appendTo = function (obj) {
    if (!obj) obj = document.body;
    obj.appendChild(this.mCanvas);
    return this;
};
/**
 * 设置画布大小(解决style丢失的问题)
 * @param {number} w - 宽度
 * @param {number} h - 高度
 */
CGraph.prototype.setSize = function (w, h) {
    let oldStrokeStyle = this.mGC.strokeStyle;
    let oldFillStyle = this.mGC.fillStyle;
    this.mWidth = this.mCanvas['width'] = w;
    this.mHeight = this.mCanvas['height'] = h;
    this.setStrokeStyle(oldStrokeStyle);
    this.setFillStyle(oldFillStyle);
    return this;
};
/**
 * 设置画笔颜色样式
 * @param {string} style - 颜色样式
 */
CGraph.prototype.setStrokeStyle = function (style) {
    let oldStyle = this.mGC.strokeStyle;
    this.mGC.strokeStyle = style;
    return oldStyle;
};
/**
 * 设置填充的颜色样式
 * @param {string} style - 颜色样式
 */
CGraph.prototype.setFillStyle = function (style) {
    let oldStyle = this.mGC.fillStyle;
    this.mGC.fillStyle = style;
    return oldStyle;
};
/**
 * 限制大小在0-255
 * @param {number} k - 数值
 */
CGraph.prototype.limit = function (k) {
    k = k < 0 ? 0 : ((k > 255) ? 255 : k);
    return Math.ceil(k);
};
/**
 * 几何距离
 * @param {number} x 
 * @param {number} y 
 */
CGraph.prototype.D = function (x, y) {
    return Math.sqrt(x * x + y * y);
};
/**
 * 计算欧式距离
 * @param {number} offset - 距离
 * @param {number} x0 - 左边界
 * @param {number} end - 右边界
 */
CGraph.prototype.getOffsetX = function (offset, x0, end) {
    var res = x0 + offset;
    if (res < 0) res = -offset;
    else if (res >= end) res = - offset;
    else res = offset;
    return res;
};
/**
 * 设置指定点的RGBA
 * @param {number} i - 列
 * @param {number} j - 行
 * @param {object} o 设置对象
 */
CGraph.prototype.setPoint = function (i, j, o) {
    let index = (j * this.mWidth + i) * 4;
    if (o.R !== undefined) {
        this.mData.data[index] = o.R;
    }
    if (o.G !== undefined) {
        this.mData.data[index + 1] = o.G;
    }
    if (o.B !== undefined) {
        this.mData.data[index + 2] = o.B;
    }
    if (o.A !== undefined) {
        this.mData.data[index + 3] = o.A;
    }
    return this;
};
/**
 * 获取指定点的RGBA
 * @param {number} i - 列
 * @param {number} j - 行
 */
CGraph.prototype.getPoint = function (i, j) {
    let index = (j * this.mWidth + i) * 4;
    return {
        R: this.mData.data[index],
        G: this.mData.data[index + 1],
        B: this.mData.data[index + 2],
        A: this.mData.data[index + 3]
    };
};
/**
 * 用fn函数处理每个像素
 * @param {function} fn - 回调函数
 */
CGraph.prototype.each = function (fn, p1, w, h) {
    if (!p1) {
        p1 = { x: 0, y: 0 };
    }
    w = w ? w : this.mWidth;
    h = h ? h : this.mHeight;
    let p2 = {
        x: p1.x + w >= this.mWidth ? this.mWidth : p1.x + w,
        y: p1.y + h >= this.mHeight ? this.mHeight : p1.y + h
    };
    for (let i = p1.x; i < p2.x; i++) {
        for (let j = p1.y; j < p2.y; j++) {
            fn.call(this, i, j);
        }
    }
    return this;
};

/**
 * 复制当前对象
 */
CGraph.prototype.clone = function () {
    let o = new CGraph();
    o.mWidth = o.mCanvas['width'] = this.mWidth;
    o.mHeight = o.mCanvas['height'] = this.mHeight;
    o.mData = this.mGC.getImageData(0, 0, this.mWidth, this.mHeight);
    o.mGC.putImageData(o.mData, 0, 0);
    return o;
};
/**
 * 拓展CGraph原型方法
 */
CGraph.extend = CGraph.prototype.extend = function () {
    let json;
    if (arguments.length === 2) {
        json[arguments[0]] = arguments[1];
    }
    else {
        json = arguments[0];
    }
    for (var k in json) {
        this.prototype[k] = json[k];
    }
};

