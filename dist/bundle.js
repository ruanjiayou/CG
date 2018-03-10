/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(2);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	module.exports = __webpack_require__(26);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CGraph2.default.extend({
	    'atomization': function atomization(r) {
	        this.each(function (x, y) {
	            var rran = Math.round(Math.random() * r);
	            var dx = this.getOffsetX(rran, x, this.mWidth),
	                dy = this.getOffsetX(rran, y, this.mHeight);
	            this.setPoint(x, y, this.getPoint(x + dx, y + dy));
	        });
	        return this;
	    }
	}); /**
	     * 作者: 阮家友
	     * 时间: 2018-2-17 21:25:56
	     */

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	    2018-3-10 11:07:28
	    使用babel,编译class
	*/
	/** 
	 * 请求动画帧
	 */
	window.requestAnimateFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	}();
	/**
	 * 初始化一个封装的canvas对象
	 * @param {string|array} [obj] - 节点id或data数组
	 */

	var CGraph = function () {
	    function CGraph(obj) {
	        _classCallCheck(this, CGraph);

	        this.mCanvas = null;
	        this.mGC = null;
	        this.mWidth = 0;
	        this.mHeight = 0;
	        this.mData = [];
	        this.mObjects = [];
	        this.stop = false;
	        switch (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) {
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
	    }
	    /**
	     * 加载图片
	     * @param {string} url - 图片地址
	     */


	    _createClass(CGraph, [{
	        key: 'load',
	        value: function load(url, cb) {
	            var img = new Image();
	            var that = this;
	            img.onload = function () {
	                that.setSize(this.width, this.height);
	                that.mGC.drawImage(this, 0, 0);
	                that.mData = that.mGC.getImageData(0, 0, this.width, this.height);
	                cb.call(that);
	            };
	            img.src = url;
	        }
	        /**
	         * 将数据渲染为图片
	         * @param {array} data - 图像数据
	         */

	    }, {
	        key: 'render',
	        value: function render(data) {
	            if (data) {
	                this.mGC.putImageData(data, 0, 0);
	            } else {
	                this.mGC.putImageData(this.mData, 0, 0);
	            }
	            return this;
	        }
	        /**
	        * 动画系统
	        * @param {function} fn - 回调函数
	        * @param {array} args - 参数
	        */

	    }, {
	        key: 'run',
	        value: function run(fn) {
	            var that = this;
	            var anonymous = function anonymous() {
	                if (that.stop === false) {
	                    fn.call(that);
	                }
	                requestAnimateFrame(anonymous);
	            };
	            requestAnimateFrame(anonymous);
	            return this;
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            this.stop = false;
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.stop = true;
	        }
	        /**
	         * 清空画布
	         */

	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.mGC.clearRect(0, 0, this.mWidth, this.mHeight);
	            return this;
	        }
	        /**
	         * 文档相关方法
	         * @param {object} [obj] - node节点
	         */

	    }, {
	        key: 'appendTo',
	        value: function appendTo(obj) {
	            if (!obj) obj = document.body;
	            obj.appendChild(this.mCanvas);
	            return this;
	        }
	        /**
	         * 设置画布大小(解决style丢失的问题)
	         * @param {number} w - 宽度
	         * @param {number} h - 高度
	         */

	    }, {
	        key: 'setSize',
	        value: function setSize(w, h) {
	            var oldStrokeStyle = this.mGC.strokeStyle;
	            var oldFillStyle = this.mGC.fillStyle;
	            this.mWidth = this.mCanvas['width'] = w;
	            this.mHeight = this.mCanvas['height'] = h;
	            this.setStrokeStyle(oldStrokeStyle);
	            this.setFillStyle(oldFillStyle);
	            return this;
	        }
	        /**
	         * 设置画笔颜色样式
	         * @param {string} style - 颜色样式
	         */

	    }, {
	        key: 'setStrokeStyle',
	        value: function setStrokeStyle(style) {
	            var oldStyle = this.mGC.strokeStyle;
	            this.mGC.strokeStyle = style;
	            return oldStyle;
	        }
	        /**
	         * 设置填充的颜色样式
	         * @param {string} style - 颜色样式
	         */

	    }, {
	        key: 'setFillStyle',
	        value: function setFillStyle(style) {
	            var oldStyle = this.mGC.fillStyle;
	            this.mGC.fillStyle = style;
	            return oldStyle;
	        }
	        /**
	         * 限制大小在0-255
	         * @param {number} k - 数值
	         */

	    }, {
	        key: 'limit',
	        value: function limit(k) {
	            k = k < 0 ? 0 : k > 255 ? 255 : k;
	            return Math.ceil(k);
	        }
	        /**
	         * 几何距离
	         * @param {number} x 
	         * @param {number} y 
	         */

	    }, {
	        key: 'D',
	        value: function D(x, y) {
	            return Math.sqrt(x * x + y * y);
	        }
	        /**
	         * 计算欧式距离
	         * @param {number} offset - 距离
	         * @param {number} x0 - 左边界
	         * @param {number} end - 右边界
	         */

	    }, {
	        key: 'getOffsetX',
	        value: function getOffsetX(offset, x0, end) {
	            var res = x0 + offset;
	            if (res < 0) res = -offset;else if (res >= end) res = -offset;else res = offset;
	            return res;
	        }
	        /**
	         * 设置指定点的RGBA
	         * @param {number} i - 列
	         * @param {number} j - 行
	         * @param {object} o 设置对象
	         */

	    }, {
	        key: 'setPoint',
	        value: function setPoint(i, j, o) {
	            var index = (j * this.mWidth + i) * 4;
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
	        }
	        /**
	         * 获取指定点的RGBA
	         * @param {number} i - 列
	         * @param {number} j - 行
	         */

	    }, {
	        key: 'getPoint',
	        value: function getPoint(i, j) {
	            var index = (j * this.mWidth + i) * 4;
	            return {
	                R: this.mData.data[index],
	                G: this.mData.data[index + 1],
	                B: this.mData.data[index + 2],
	                A: this.mData.data[index + 3]
	            };
	        }
	        /**
	         * 用fn函数处理每个像素
	         * @param {function} fn - 回调函数
	         */

	    }, {
	        key: 'each',
	        value: function each(fn, p1, w, h) {
	            if (!p1) {
	                p1 = { x: 0, y: 0 };
	            }
	            w = w ? w : this.mWidth;
	            h = h ? h : this.mHeight;
	            var p2 = {
	                x: p1.x + w >= this.mWidth ? this.mWidth : p1.x + w,
	                y: p1.y + h >= this.mHeight ? this.mHeight : p1.y + h
	            };
	            for (var i = p1.x; i < p2.x; i++) {
	                for (var j = p1.y; j < p2.y; j++) {
	                    fn.call(this, i, j);
	                }
	            }
	            return this;
	        }

	        /**
	         * 复制当前对象
	         */

	    }, {
	        key: 'clone',
	        value: function clone() {
	            var o = new CGraph();
	            o.mWidth = o.mCanvas['width'] = this.mWidth;
	            o.mHeight = o.mCanvas['height'] = this.mHeight;
	            o.mData = this.mGC.getImageData(0, 0, this.mWidth, this.mHeight);
	            o.mGC.putImageData(o.mData, 0, 0);
	            return o;
	        }
	        /**
	         * 坐标转换
	         * @param {number} x 
	         * @param {number} y 
	         * @returns {object}
	         */

	    }, {
	        key: 'window2canvas',
	        value: function window2canvas(x, y) {
	            var rect = this.mCanvas.getBoundingClientRect();
	            return {
	                x: x - rect.left * (this.mCanvas.width / rect.width),
	                y: y - rect.top * (this.mCanvas.height / rect.height)
	            };
	        }
	        /**
	         * 拓展CGraph原型方法
	         */

	    }], [{
	        key: 'extend',
	        value: function extend() {
	            var json = void 0;
	            if (arguments.length === 2) {
	                json[arguments[0]] = arguments[1];
	            } else {
	                json = arguments[0];
	            }
	            for (var k in json) {
	                this.prototype[k] = json[k];
	            }
	        }
	    }]);

	    return CGraph;
	}();

	module.exports = CGraph;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-18 12:29:07
	   */
	(function () {
	    /**
	     * 给定两点和两控制点生成一段贝塞尔曲线点
	     * @param {object} startPoint - 起点
	     * @param {object} c1 - 控制点1
	     * @param {object} c2 - 控制点2
	     * @param {object} endPoint - 终点
	     * @returns {array} 点数组
	     */
	    function getBezierCurve(startPoint, c1, c2, endPoint) {
	        //方程系数
	        var XC = 3 * (c1.x - startPoint.x),
	            XB = 3 * (c2.x - c1.x) - XC,
	            XA = endPoint.x - startPoint.x - XC - XB,
	            YC = 3 * (c1.y - startPoint.y),
	            YB = 3 * (c2.y - c1.y) - YC,
	            YA = endPoint.y - startPoint.y - YC - YB;
	        //曲线点的数量
	        var number = 100,
	            i = 0,
	            dt = 1 / (number - 1),
	            dt1,
	            dt2,
	            dt3,
	            temp,
	            points = [];

	        for (; i < number; i++) {
	            dt1 = dt * i;
	            dt2 = dt1 * dt1;
	            dt3 = dt2 * dt1;
	            temp = new Object();
	            temp.x = XA * dt3 + XB * dt2 + XC * dt1 + startPoint.x;
	            temp.y = YA * dt3 + YB * dt2 + YC * dt1 + startPoint.y;
	            points.push(temp);
	        }
	        return points;
	    }
	    _CGraph2.default.extend({
	        /**
	         * 点是否在点数组围成的多边形内
	         */
	        'isInPolygon': function isInPolygon(p, area) {
	            var i = 0,
	                j = area.length - 1,
	                len = area.length,
	                oddNodes = false;
	            for (; i < len; i++) {
	                if (area[i].y < p.y && area[j].y >= p.y || area[j].y < p.y && area[i].y >= p.y) {
	                    if (area[i].x + (p.y - area[i].y) / (area[j].y - area[i].y) * (area[j].x - area[i].x) < p.x) oddNodes = !oddNodes;
	                }
	                j = i;
	            }
	            return oddNodes;
	        },
	        /**
	         * 获取散点数组组成的闭合贝塞尔曲线点
	         */
	        'getBezierPoints': function getBezierPoints(ps) {
	            var i = 1,
	                MidPoints = [],
	                //中点
	            VectorMid = [],
	                //中点连线向量
	            len = ps.length,
	                scale = 0.6,
	                BezierPoints = [];
	            if (len < 3) return [];
	            //中点坐标数组
	            MidPoints.push({ x: (ps[0][0] + ps[len - 1][0]) / 2, y: (ps[0][1] + ps[len - 1][1]) / 2 });
	            for (i = 1; i < len; i++) {
	                MidPoints.push({ x: (ps[i][0] + ps[i - 1][0]) / 2, y: (ps[i][1] + ps[i - 1][1]) / 2 });
	                //中点向量数组
	                VectorMid.push({ x: (MidPoints[i].x - MidPoints[i - 1].x) * scale, y: (MidPoints[i].y - MidPoints[i - 1].y) * scale });
	            }
	            VectorMid.push({ x: (MidPoints[0].x - MidPoints[len - 1].x) * scale, y: (MidPoints[0].y - MidPoints[len - 1].y) * scale });
	            //贝塞尔曲线
	            for (i = 1; i <= len; i++) {
	                BezierPoints = BezierPoints.concat(getBezierCurve({ x: ps[i - 1][0], y: ps[i - 1][1] }, { x: ps[i - 1][0] + VectorMid[i - 1].x, y: ps[i - 1][1] + VectorMid[i - 1].y }, { x: ps[i % len][0] - VectorMid[i % len].x, y: ps[i % len][1] - VectorMid[i % len].y }, { x: ps[i % len][0], y: ps[i % len][1] }));
	            }
	            return BezierPoints;
	        },
	        'drawBezier': function drawBezier(area) {
	            area = this.getBezierPoints(area);
	            var i = 1,
	                len = area.length;
	            if (len < 3) return;
	            this.mGC.beginPath();
	            this.mGC.moveTo(area[0].x, area[0].y);
	            for (; i < area.length; i++) {
	                this.mGC.lineTo(area[i].x, area[i].y);
	            }this.mGC.lineTo(area[0].x, area[0].y);
	            this.mGC.closePath();
	            //this.mGC.stroke();
	            this.mGC.fill();
	            return this;
	        }
	    });
	})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CGraph2.default.extend({
	    'binarize': function binarize(v) {
	        this.each(function (x, y) {
	            var p = this.getPoint(x, y).R;
	            var res = { R: 0, G: 0, B: 0 };
	            if (p > v) res.R = res.G = res.B = 255;
	            this.setPoint(x, y, res);
	        });
	        return this;
	    }
	}); /**
	     * 作者: 阮家友
	     * 时间: 2018-2-18 17:52:01
	     */

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-18 17:08:13
	   */
	(function () {
	    var CANDY_X = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
	    var CANDY_Y = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
	    function edgeLink(Aarr, lowThreshold, x, y, w, h) {
	        var index = y * w + x;
	        var x0 = x === 0 ? x : x - 1;
	        var x1 = x === w - 1 ? x : x + 1;
	        var y0 = y === 0 ? y : y - 1;
	        var y1 = y === h - 1 ? y : y + 1;
	        for (var i = x0; i <= x1; i++) {
	            for (var j = y0; j <= y1; j++) {
	                if ((i !== x || j !== y) && Aarr[index] !== 0) {
	                    edgeLink(Aarr, lowThreshold, i, j, w, h);
	                    return;
	                } else {
	                    Aarr[index] = 0;
	                }
	            }
	        }
	    }
	    _CGraph2.default.extend({
	        'canny': function canny(r) {
	            this.grey().gauss(r);
	            //振幅与相位数组
	            var Aarr = [];
	            var Marr = [];
	            //非最大信号压制最值
	            var min = 180,
	                max = 0,
	                sum = 0,
	                count = 0;
	            //双阈值
	            var lowThreshold = 0,
	                highThreshold = 0;
	            //1.梯度算法求振幅与相位数组
	            this.each(function (x, y) {
	                var index = y * this.mWidth + x;
	                var Xgrad = 0,
	                    Ygrad = 0,
	                    newrow = 0,
	                    newcol = 0;
	                for (var i = -1; i <= 1; i++) {
	                    for (var j = -1; j <= 1; j++) {
	                        newrow = y + i;
	                        newcol = x + j;
	                        if (newrow < 0 || newrow >= this.mHeight) newrow = y;
	                        if (newcol < 0 || newcol >= this.mWidth) newcol = x;
	                        Xgrad += CANDY_X[i + 1][j + 1] * this.getPoint(newcol, newrow).R;
	                        Ygrad += CANDY_Y[i + 1][j + 1] * this.getPoint(newcol, newrow).R;
	                    }
	                }
	                //振幅
	                Aarr[index] = this.D(Xgrad, Ygrad);
	                //相位
	                if (Xgrad === 0) {
	                    if (Ygrad > 0) {
	                        Marr[index] = 90;
	                    }
	                    if (Ygrad < 0) {
	                        Marr[index] = -90;
	                    }
	                } else {
	                    if (Ygrad === 0) {
	                        Marr[index] = 0;
	                    } else {
	                        Marr[index] = 180 * Math.atan(Ygrad / Xgrad) / Math.PI;
	                    }
	                }
	                //最终
	                //→ ↑  (-1, 0) ( 1, 0) ( 0,+1) ( 0,-1)
	                //↑ ←  (-1,+1) (-1,-1) (-1, 1) ( 0,-1)
	                //↗↖ ( 1,+1) (-1,-1) (-1, 1) ( 1,-1)
	                //↘↗ ( 1,-1) (-1, 1) ( 1,+1) (-1,-1)
	                //↓ →  ( 1,-1) (-1, 1) (-1, 0) ( 1, 0)
	                Marr[index] += 90;
	                if (Aarr[index] !== 0) {
	                    min = Math.min(min, Aarr[index]);
	                    max = Math.max(max, Aarr[index]);
	                    sum += Aarr[index];
	                    count++;
	                }
	            });
	            //2.非最大信号压制算法 3x3
	            this.each(function (x, y) {
	                var index = y * this.mWidth + x;
	                var angle = Marr[index]; //相位数组
	                var m0 = Aarr[index]; //振幅数组
	                Marr[index] = m0;
	                if (x === 0 || x === this.mWidth || y === 0 || y === this.mHeight) {
	                    Aarr[index] = Marr[index] = 0;
	                }
	                var x_1 = x + this.getOffsetX(-1, x, this.mWidth);
	                var x1 = x + this.getOffsetX(1, x, this.mWidth);
	                var y_1 = y + this.getOffsetX(-1, y, this.mHeight);
	                var y1 = y + this.getOffsetX(1, y, this.mHeight);
	                var m1, m2;
	                if (angle >= 0 && angle < 22.5) {
	                    m1 = this.getPoint(x_1, y).R;
	                    m2 = this.getPoint(x1, y).R;
	                } else if (angle >= 22.5 && angle < 67.5) {
	                    m1 = this.getPoint(x1, y_1).R;
	                    m2 = this.getPoint(x_1, y1).R;
	                } else if (angle >= 67.5 && angle < 112.5) {
	                    m1 = this.getPoint(x1, y).R;
	                    m2 = this.getPoint(x_1, y).R;
	                } else if (angle >= 112.5 && angle < 157.5) {
	                    m1 = this.getPoint(x_1, y_1).R;
	                    m2 = this.getPoint(x1, y1).R;
	                } else if (angle >= 157.5) {
	                    m1 = this.getPoint(x_1, y1).R;
	                    m2 = this.getPoint(x_1, y_1).R;
	                }
	                if (m1 > m0 || m2 > m0) {
	                    Aarr[index] = 0;
	                }
	                var v = Marr[index];
	                this.setPoint(x, y, { R: v, G: v, B: v });
	            });
	            sum = sum / count;
	            highThreshold = sum * 2;
	            lowThreshold = highThreshold / 4;
	            //3.边缘连接
	            this.each(function (x, y) {
	                var index = y * this.mWidth + x;
	                if (Aarr[index] >= highThreshold && Aarr[index] !== 0) {
	                    edgeLink(Aarr, lowThreshold, x, y, this.mWidth, this.mHeight);
	                } else {
	                    Aarr[index] = 0;
	                }
	            });
	            this.binarize(highThreshold);
	            return this;
	        }
	    });
	})();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CGraph2.default.extend({
	    'casting': function casting() {
	        this.each(function (x, y) {
	            var p = this.getPoint(x, y);
	            var pn = { R: 0, G: 0, B: 0 };
	            var v = 0;
	            //R
	            v = Math.round(p.R * 128 / (p.G + p.B + 1));
	            if (v > 255) v = 255;
	            if (v < 0) v = 0;
	            pn.R = v;
	            //G
	            v = Math.round(p.G * 128 / (p.R + p.B + 1));
	            if (v > 255) v = 255;
	            if (v < 0) v = 0;
	            pn.G = v;
	            //B
	            v = Math.round(p.B * 128 / (p.G + p.R + 1));
	            if (v > 255) v = 255;
	            if (v < 0) v = 0;
	            pn.B = v;

	            this.setPoint(x, y, pn);
	        });
	        return this;
	    }
	}); /**
	     * 作者: 阮家友
	     * 时间: 2018-2-17 21:35:54
	     */

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CGraph2.default.extend({
	    'comics': function comics() {
	        this.each(function (x, y) {
	            var p = this.getPoint(x, y);
	            var pn = { R: 0, G: 0, B: 0 };
	            var v = 0;
	            //R
	            v = Math.round(Math.abs((p.G - p.B + p.G + p.R) * p.R / 256));
	            if (v > 255) v = 255;
	            if (v < 0) v = 0;
	            pn.R = v;
	            //G
	            v = Math.round(Math.abs((p.B - p.G + p.B + p.R) * p.R / 256));
	            if (v > 255) v = 255;
	            if (v < 0) v = 0;
	            pn.G = v;
	            //B
	            v = Math.round(Math.abs((p.B - p.G + p.B + p.R) * p.G / 256));
	            if (v > 255) v = 255;
	            if (v < 0) v = 0;
	            pn.B = v;

	            this.setPoint(x, y, pn);
	        });
	        return this;
	    }
	}); /**
	     * 作者: 阮家友
	     * 时间: 
	     */

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CGraph2.default.extend({
	    'emboss': function emboss() {
	        this.each(function (x, y) {
	            var x1 = void 0,
	                y1 = void 0;
	            // 当前点减去下一点
	            var p = this.getPoint(x, y);
	            var pn = { R: 0, G: 0, B: 0 };
	            x1 = x < this.mWidth - 1 ? x + 1 : this.mWidth - 1;
	            y1 = y < this.mHeight - 1 ? y + 1 : this.mHeight - 1;
	            pn = this.getPoint(x1, y1);
	            pn.R = p.R - pn.R + 128;
	            pn.G = p.G - pn.G + 128;
	            pn.B = p.B - pn.B + 128;
	            this.setPoint(x, y, pn);
	        });
	        return this;
	    }
	}); /**
	     * 作者: 阮家友
	     * 时间: 2018-2-17 19:46:41
	     */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CGraph2.default.extend({
	    'addEvent': function addEvent(t, fn) {
	        var _this = this;

	        var obj = {},
	            that = this;
	        if (typeof t === 'string' && typeof fn === 'function') {
	            obj[t] = fn;
	        } else {
	            obj = t;
	        }

	        var _loop = function _loop(k) {
	            _this.mCanvas.addEventListener(k, function (e) {
	                obj[k].call(that, e);
	                window.event ? window.event.returnValue = false : e.preventDefault();
	            }, false);
	        };

	        for (var k in obj) {
	            _loop(k);
	        }
	        return this;
	    }
	}); /**
	     * 
	     */

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CGraph2.default.extend({
	    'frozen': function frozen() {
	        this.each(function (x, y) {
	            var p = this.getPoint(x, y);
	            var res = { R: 0, G: 0, B: 0 };
	            var v = 0;
	            //R
	            v = (p.R - p.G - p.B) * 3 / 2;
	            if (v < 0) v = -v;
	            if (v > 255) v = 255;
	            res.R = v;
	            //G
	            v = (p.G - p.R - p.B) * 3 / 2;
	            if (v < 0) v = -v;
	            if (v > 255) v = 255;
	            res.G = v;
	            //B
	            v = (p.B - p.G - p.R) * 3 / 2;
	            if (v < 0) v = -v;
	            if (v > 255) v = 255;
	            res.B = v;

	            this.setPoint(x, y, res);
	        });
	        return this;
	    }
	}); /**
	     * 作者: 阮家友
	     * 时间: 2018-2-17 21:20:01
	     */

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-17 10:58:53
	   */
	(function () {
	    /**
	     * 计算高斯权重系数-一维高斯算子
	     * @param {number} radius - 半径
	     */
	    function getGaussArr(radius) {
	        //高斯权重结果数组
	        var resArr = [];
	        //f(x)=1/(δ√2π)*e^(-x^2/2δ^2)   δ取3 
	        var x = radius / 3;
	        var args1 = 2 * x * x;
	        var args2 = x * Math.sqrt(2 * Math.PI);
	        //sum 用于权值归一化处理 
	        var sum = 0;
	        //被反复使用的临时变量
	        var t = null,
	            i = 0,
	            j = 0;
	        if (radius < 1) radius = 1;
	        for (j = 0, i = -radius; i <= radius; i++, j++) {
	            t = Math.pow(Math.E, -i * i / args1) / args2;
	            sum += t;
	            resArr.push(t);
	        }
	        //归一化处理
	        if (sum !== 1) {
	            for (i = resArr.length - 1; i >= 0; i--) {
	                resArr[i] /= sum;
	            }
	        }
	        return resArr;
	    }
	    _CGraph2.default.extend({
	        'gauss': function gauss(r) {
	            var gs = getGaussArr(r),
	                q = void 0;
	            this.each(function (x, y) {
	                var p = { R: 0, G: 0, B: 0 },
	                    m = void 0,
	                    k = void 0,
	                    off = void 0;
	                for (m = 0, k = -r; k <= r; k++, m++) {
	                    off = this.getOffsetX(k, x, this.mWidth);
	                    q = this.getPoint(x + off, y);
	                    p.R += q.R * gs[m];
	                    p.G += q.G * gs[m];
	                    p.B += q.B * gs[m];
	                }
	                this.setPoint(x, y, p);
	            }).each(function (x, y) {
	                var p = { R: 0, G: 0, B: 0 },
	                    m = void 0,
	                    k = void 0,
	                    off = void 0;
	                for (m = 0, k = -r; k <= r; k++, m++) {
	                    off = this.getOffsetX(k, y, this.mHeight);
	                    q = this.getPoint(x, off + y);
	                    p.R += q.R * gs[m];
	                    p.G += q.G * gs[m];
	                    p.B += q.B * gs[m];
	                }
	                this.setPoint(x, y, p);
	            });
	            return this;
	        }
	    });
	})();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CGraph2.default.extend({
	    'grey': function grey() {
	        return this.each(function (x, y) {
	            var o = this.getPoint(x, y);
	            o.R = o.G = o.B = o.R * 38 + o.G * 75 + o.B * 15 >> 7;
	            this.setPoint(x, y, o);
	        });
	    }
	}); /**
	     * 作者: 阮家友
	     * 时间: 2018-2-16 18:47:54
	     */

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CGraph2.default.extend({
	    'masic': function masic(v, p, w, h) {
	        this.each(function (x, y) {
	            var restX = x % v;
	            var restY = y % v;
	            var p = this.getPoint(x, y);
	            var originX = x - restX;
	            var originY = y - restY;
	            var p0 = this.getPoint(originX, originY);
	            p.R = p0.R;
	            p.G = p0.G;
	            p.B = p0.B;
	            this.setPoint(x, y, p);
	        }, p ? p : { x: 0, y: 0 }, w ? w : this.mWidth, h ? h : this.mHeight);
	        return this;
	    }
	}); /**
	     * 作者: 阮家友
	     * 时间: 2018-2-17 20:18:29
	     */

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-17 20:27:16
	   */
	(function (o) {
	    o.extend({
	        'medianFilter': function medianFilter(r) {
	            this.each(function (x, y) {
	                var arr = [];
	                for (var m1 = -r; m1 <= r; m1++) {
	                    arr.push(this.getPoint(x + this.getOffsetX(m1, x, this.mWidth), y));
	                }
	                arr.sort(function (a, b) {
	                    return a.R + a.G + a.B < b.R + b.G + b.B;
	                });
	                this.setPoint(x, y, arr[r]);
	            }).each(function (x, y) {
	                var arr = [];
	                for (var m1 = -r; m1 <= r; m1++) {
	                    arr.push(this.getPoint(x, y + this.getOffsetX(m1, y, this.mHeight)));
	                }
	                arr.sort(function (a, b) {
	                    return a.R + a.G + a.B < b.R + b.G + b.B;
	                });
	                this.setPoint(x, y, arr[r]);
	            });
	            return this;
	        }
	    });
	})(_CGraph2.default);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-16 20:03:32
	   */
	(function (obj) {
	    obj.extend({
	        'reverse': function reverse() {
	            this.each(function (x, y) {
	                var o = this.getPoint(x, y);
	                o.R = 255 - o.R;
	                o.G = 255 - o.G;
	                o.B = 255 - o.B;
	                this.setPoint(x, y, o);
	            });
	            return this;
	        }
	    });
	})(_CGraph2.default);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-20 00:05:31
	   */
	(function (o) {
	    o.extend({
	        'rotationBlur': function rotationBlur(angel) {
	            var centerPoint = { x: this.mWidth / 2, y: this.mHeight / 2 };
	            var validPoint = 1,
	                unit = angel * Math.PI / 180,
	                unit2 = unit * unit,
	                num = 30,
	                num2 = num * num;
	            this.each(function (x, y) {
	                var x1, y1;
	                var x0 = x - centerPoint.x,
	                    y0 = centerPoint.y - y;
	                var sum = this.getPoint(x, y);
	                validPoint = 1;
	                x1 = x0;
	                y1 = y0;
	                //x0
	                for (var k = 1; k < num; k++) {
	                    x0 = x1;
	                    y0 = y1;

	                    if (y >= centerPoint.y) {
	                        x1 = x0 - unit * y0 / num - unit2 * x0 / num2;
	                        y1 = y0 + unit * x0 / num - unit2 * y0 / num2;
	                    } else {
	                        x1 = x0 + unit * y0 / num - unit2 * x0 / num2;
	                        y1 = y0 - unit * x0 / num - unit2 * y0 / num2;
	                    }

	                    var xn = Math.floor(x1 + centerPoint.x);
	                    var yn = Math.floor(centerPoint.y - y1);

	                    if (xn > 0 && xn < this.mWidth && yn > 0 && yn < this.mHeight) {
	                        var t = this.getPoint(xn, yn);
	                        validPoint += 1;
	                        sum.R += t.R;
	                        sum.G += t.G;
	                        sum.B += t.B;
	                    }
	                }
	                sum.R = Math.floor(sum.R / validPoint);
	                sum.G = Math.floor(sum.G / validPoint);
	                sum.B = Math.floor(sum.B / validPoint);
	                this.setPoint(x, y, sum);
	            });
	            return this;
	        }
	    });
	})(_CGraph2.default);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-19 23:24:23
	   */
	(function (o) {
	    o.extend({
	        'LineBlur': function LineBlur(num) {
	            var centerPoint = { x: this.mWidth / 2, y: this.mHeight / 2 };
	            var angle = 0,
	                R = 0;
	            this.each(function (x, y) {
	                var new_x = 0,
	                    new_y = 0;
	                var t0 = 0,
	                    t1 = 0,
	                    t2 = 0;
	                angle = Math.atan2(y - centerPoint.y, x - centerPoint.x);
	                R = Math.sqrt((x - centerPoint.x) * (x - centerPoint.x) + (y - centerPoint.y) * (y - centerPoint.y));
	                var pn = { R: 0, G: 0, B: 0 };
	                for (var k = 0; k < num; k++) {
	                    //angle += 0.01;// 加上就是旋转模糊
	                    var temp = R - k > 0 ? R - k : 0;
	                    new_x = parseInt(temp * Math.cos(angle) + centerPoint.x);
	                    new_y = parseInt(temp * Math.sin(angle) + centerPoint.y);
	                    var p = this.getPoint(new_x, new_y);
	                    t0 += p.R;
	                    t1 += p.G;
	                    t2 += p.B;
	                }
	                pn.R = t0 / num;
	                pn.G = t1 / num;
	                pn.B = t2 / num;
	                this.setPoint(x, y, pn);
	            });
	            return this;
	        }
	    });
	})(_CGraph2.default);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-18 13:37:03
	   */
	(function (o) {
	    function draw_circle_8(p0, p) {
	        var arr = [];
	        arr.push({ 'x1': p0.x + p.x, 'y1': p0.y + p.y, 'x2': p0.x + p.x, 'y2': p0.y + p.y });
	        arr.push({ 'x1': p0.x - p.x, 'y1': p0.y + p.y, 'x2': p0.x - p.x, 'y2': p0.y + p.y });
	        arr.push({ 'x1': p0.x + p.x, 'y1': p0.y - p.y, 'x2': p0.x + p.x, 'y2': p0.y - p.y });
	        arr.push({ 'x1': p0.x - p.x, 'y1': p0.y - p.y, 'x2': p0.x - p.x, 'y2': p0.y - p.y });
	        arr.push({ 'x1': p0.x + p.x, 'y1': p0.y + p.y, 'x2': p0.x + p.x, 'y2': p0.y + p.y });
	        arr.push({ 'x1': p0.x - p.x, 'y1': p0.y + p.y, 'x2': p0.x - p.x, 'y2': p0.y + p.y });
	        arr.push({ 'x1': p0.x + p.x, 'y1': p0.y - p.y, 'x2': p0.x + p.x, 'y2': p0.y - p.y });
	        arr.push({ 'x1': p0.x - p.x, 'y1': p0.y - p.y, 'x2': p0.x - p.x, 'y2': p0.y - p.y });
	        this.drawLine(arr);
	    }
	    o.extend({
	        'drawLine': function drawLine(p0, p1) {
	            var argsArr = [];
	            if (arguments.length === 1) {
	                argsArr = p0;
	            } else {
	                argsArr.push([p0, p1]);
	            }
	            this.mGC.beginPath();
	            for (var i = 0; i < argsArr.length; i++) {
	                var point1 = argsArr[i][0];
	                var point2 = argsArr[i][1];
	                this.mGC.moveTo(point1.x + 0.5, point1.y + 0.5);
	                this.mGC.lineTo(point2.x + 0.5, point2.y + 0.5);
	            }
	            this.mGC.closePath();
	            this.mGC.stroke();
	            return this;
	        },
	        'drawDashed': function drawDashed(p0, p1, offset, percent) {
	            //TODO:
	        },
	        'drawCircle': function drawCircle(p0, r) {
	            this.mGC.beginPath();
	            this.mGC.arc(p0.x, p0.y, r, 0, Math.PI * 2, true);
	            this.mGC.closePath();
	            this.mGC.stroke();
	            return this;
	        },
	        'fillCircle': function fillCircle(p0, r) {
	            this.mGC.beginPath();
	            this.mGC.arc(p0.x, p0.y, r, 0, Math.PI * 2, true);
	            this.mGC.closePath();
	            this.mGC.fill();
	            return this;
	        },
	        'drawLine_bresenham': function drawLine_bresenham(p1, p2) {
	            var x1 = p1.x,
	                x2 = p2.x,
	                y1 = p1.y,
	                y2 = p2.y;
	            var dx = Math.abs(x2 - x1),
	                dy = Math.abs(y2 - y1),
	                gt45 = false;
	            if (dx < dy) {
	                x1 = x1 ^ y1, y1 = x1 ^ y1, x1 = x1 ^ y1;
	                x2 = x2 ^ y2, y2 = x2 ^ y2, x2 = x2 ^ y2;
	                dx = dx ^ dy, dy = dx ^ dy, dx = dx ^ dy;
	                gt45 = true;
	            }
	            var ix = x2 - x1 >= 0 ? 1 : -1;
	            var iy = y2 - y1 > 0 ? 1 : y2 === y1 ? 0 : -1;
	            var d = dy * 2 - dx;
	            //2017-10-8 14:19:40 修改bug y1初始值始终差一个iy。 y2===y1 时iy=0,
	            y1 -= iy;
	            while (x1 !== x2) {
	                if (d < 0) {
	                    d += dy * 2;
	                } else {
	                    y1 += iy;
	                    d += (dy - dx) * 2;
	                }
	                //TODO 点着色
	                if (gt45) {
	                    this.drawLine({ x1: y1, y1: x1, x2: y1, y2: x1 });
	                } else {
	                    this.drawLine({ x1: x1, y1: y1, x2: x1, y2: y1 });
	                }
	                x1 += ix;
	            }
	            return this;
	        },
	        'fillRing': function fillRing(p, r1, r2) {
	            this.mGC.beginPath();
	            this.mGC.arc(p.x, p.y, r2, 0, Math.PI * 2, false);
	            this.mGC.arc(p.x, p.y, r1, 0, Math.PI * 2, true);
	            this.mGC.closePath();
	            this.mGC.fill();
	            return this;
	        },
	        'drawCircle_bresenham': function drawCircle_bresenham(p0, r) {
	            //在区域外 直接退出
	            if (p0.x + r < 0 || p0.x - r >= this.mWidth || p0.y + r < 0 || p0.y - r >= this.mHeight) {
	                return this;
	            }
	            var p = { x: 0, y: r },
	                d = 3 - 2 * r;
	            while (p.x <= p.y) {
	                draw_circle_8.call(this, p0, p);
	                if (d < 0) {
	                    d = d + 4 * p.x + 6;
	                } else {
	                    d = d + 4 * (p.x - p.y) + 10;
	                    p.y--;
	                }
	                p.x++;
	            }
	        },
	        'fillCircle_bresenham': function fillCircle_bresenham(p0, r) {
	            //在区域外 直接退出
	            if (p0.x + r < 0 || p0.x - r >= this.mWidth || p0.y + r < 0 || p0.y - r >= this.mHeight) {
	                return this;
	            }
	            var p = { x: 0, y: 0 },
	                y = r,
	                d = 3 - 2 * r;
	            while (p.x <= y) {
	                for (p.y = p.x; p.y <= y; p.y++) {
	                    this._draw_circle_8(p0, p);
	                }
	                if (d < 0) {
	                    d = d + 4 * p.x + 6;
	                } else {
	                    d = d + 4 * (p.x - y) + 10;
	                    y--;
	                }
	                p.x++;
	            }
	        }
	    });
	})(_CGraph2.default);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-17 21:50:22
	   * 描述: 公式：基色+（基色×混合色）/（255-混合色）=结果色
	   */
	(function (o) {
	    o.extend({
	        'sketch': function sketch(r) {
	            var basedata = this.mData.data;
	            this.mData = this.mGC.getImageData(0, 0, this.mWidth, this.mHeight);
	            this.reverse().gauss(r);
	            var mixdata = this.mData.data;
	            // 颜色减淡混合 
	            for (var i = 0; i < basedata.length; i++) {
	                var a = basedata[i];
	                var b = mixdata[i];
	                var temp = a + a * b / (255 - b);
	                this.mData.data[i] = this.limit(temp);
	            }
	            return this;
	        }
	    });
	})(_CGraph2.default);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-18 15:36:18
	   */
	(function (o) {
	    o.extend({
	        'snowflake': function snowflake() {
	            this.setFillStyle = '#fff';
	            this.mGC.fillRect(0, 0, this.mWidth, this.mHeight);
	            this.mGC.fill();
	            var flicks = function flicks() {
	                this.mData = this.mGC.getImageData(0, 0, this.mWidth, this.mHeight);
	                this.each(function (x, y) {
	                    var v = Math.random() * 255 + 50;
	                    this.setPoint(x, y, { R: v, G: v, B: v });
	                }).render();
	            };
	            this.run(flicks);
	        }
	    });
	})(_CGraph2.default);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//TODO:
	; /**
	   * 作者: 阮家友
	   * 时间: 2018-2-18 14:20:24
	   */
	(function (o) {
	    o.extend({
	        /**
	         * 
	         * @param {string} txt - 字符串
	         * @param {object} t - CPoint或CRect
	         */
	        'drawText': function drawText(txt, t) {
	            if (t.width) {
	                this.mGC.fillText(txt, t.x, t.y, t.width);
	            } else {
	                this.mGC.fillText(txt, t.x, t.y);
	            }

	            return this;
	        }
	    });
	})(_CGraph2.default);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 作者: 阮家友
	 * 时间: 2018-2-27 20:31:27
	 * 描述: 粒子类
	 */
	var CParticle = function CParticle() {
	    // 粒子的位置
	    //this.position = pos;
	    // 粒子的速度
	    //this.velocity = v;
	    // 粒子的加速度
	    //this.g = gravity;
	    // 粒子的生命信息
	    //this.age = 0;
	    //this.life = life;
	    // 附加信息
	    //this.size = size;

	    _classCallCheck(this, CParticle);
	};

	module.exports = CParticle;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 作者: 阮家友
	 * 时间: 2018-2-27 20:35:14
	 * 描述: 处理粒子的粒子系统
	 */
	var CParticleSystem = function () {
	    function CParticleSystem() {
	        _classCallCheck(this, CParticleSystem);

	        this.dt = 0.01;
	        this.particles = [];
	        // 自定义事件集合
	        this.events = [];
	    }

	    /**
	     * 为所有粒子添加事件
	     */


	    _createClass(CParticleSystem, [{
	        key: "each",
	        value: function each(fn) {
	            for (var i = 0, len = this.particles.length; i < len; i++) {
	                fn.call(this, this.particles[i]);
	            }
	        }
	    }], [{
	        key: "extend",
	        value: function extend() {
	            var json = void 0;
	            if (arguments.length === 2) {
	                json[arguments[0]] = arguments[1];
	            } else {
	                json = arguments[0];
	            }
	            for (var k in json) {
	                this.prototype[k] = json[k];
	            }
	        }
	    }]);

	    return CParticleSystem;
	}();

	module.exports = CParticleSystem;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 点对象
	 */
	var CPoint = function () {
	    function CPoint(x, y) {
	        _classCallCheck(this, CPoint);

	        if (arguments.length === 2) {
	            this.x = x;
	            this.y = y;
	        } else {
	            this.x = 0;
	            this.y = 0;
	        }
	    }
	    // 克隆


	    _createClass(CPoint, [{
	        key: "copy",
	        value: function copy(p) {
	            if (p) {
	                this.x = p.x;
	                this.y = p.y;
	                return this;
	            } else {
	                return new CPoint(this.x, this.y);
	            }
	        }
	        // 到原点的距离

	    }, {
	        key: "d",
	        value: function d() {
	            return Math.sqrt(this.x * this.x + this.y * this.y);
	        }
	        // 加法

	    }, {
	        key: "add",
	        value: function add(p) {
	            this.x += p.x;
	            this.y += p.y;
	            return this;
	        }
	        // 减法

	    }, {
	        key: "substract",
	        value: function substract(p) {
	            this.x -= p.x;
	            this.y -= p.y;
	            return this;
	        }
	        // 乘法

	    }, {
	        key: "multiply",
	        value: function multiply(v) {
	            this.x *= v;
	            this.y *= v;
	            return this;
	        }
	        // 除法

	    }, {
	        key: "divide",
	        value: function divide(v) {
	            if (v === 0) {
	                v = 1;
	            }
	            this.x /= v;
	            this.y /= v;
	            return this;
	        }
	        // 点乘

	    }, {
	        key: "dot",
	        value: function dot(p) {
	            return this.x * p.x + this.y * p.y;
	        }
	        // 叉乘
	        // cross: function(p) {
	        //     return 
	        // }

	    }]);

	    return CPoint;
	}();

	module.exports = CPoint;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	; /**
	   * 作者: 阮家友
	   * 时间: 
	   */
	(function (o) {
	    function isSimilar(arr, angle, r) {
	        for (var i = 0; i < arr.length; i++) {
	            if (Math.abs(arr[i].angle - angle) < 3 && Math.abs(arr[i].R - r) < 3) {
	                return true;
	            }
	        }
	        return false;
	    }
	    o.extend({
	        'getHoughLine': function getHoughLine(unit) {
	            //hough参数
	            //var Ox = this.mWidth / 2, Oy = this.mHeight / 2;
	            var AgnleUnit = 180; //角度
	            var D = this.mHeight > this.mWidth ? this.mWidth : this.mHeight;
	            var Diagonal = Math.sqrt(D * D); //对角线长度一半
	            var Valve = Diagonal >> 2; //阈值 threshold感觉不像
	            var HoughArr = [];
	            var HoughAngleRArr = []; //[angle,r]
	            //初始化hough数组
	            for (var i = 0; i < AgnleUnit; i++) {
	                HoughAngleRArr[i] = new Array(Diagonal < 1);
	                for (var j = 0; j < 2 * Diagonal; j++) {
	                    HoughAngleRArr[i][j] = 0;
	                }
	            }
	            //获得初步数据
	            this.each(function (x, y) {
	                var red = this.getPoint(x, y).R;
	                if (red) for (var u = 0; u < AgnleUnit; u++) {
	                    var r = Math.ceil(x * Math.cos(unit * u) + y * Math.sin(unit * u));
	                    r += Diagonal;
	                    if (r <= 0 || r >= Diagonal || u === 0 || u === AgnleUnit - 1) ;else HoughAngleRArr[u][r] += 1;
	                }
	            });
	            //寻找hough阈值
	            for (var _i = 0; _i < AgnleUnit; _i++) {
	                for (var _j = 0; _j < 2 * Diagonal; _j++) {
	                    if (Valve < HoughAngleRArr[_i][_j] && false === isSimilar(HoughArr, _i, _j - Diagonal)) HoughArr.push({ angle: _i, value: HoughAngleRArr[_i][_j], R: _j - Diagonal });
	                }
	            }
	            return HoughArr;
	        },
	        'showHoughLine': function showHoughLine(color) {
	            var unit = Math.PI / 64;
	            var HoughArr = this.getHoughLine(unit);
	            this.each(function (x, y) {
	                for (var k = 0; k < HoughArr.length; k++) {
	                    if (HoughArr[k].R === Math.ceil(x * Math.cos(HoughArr[k].angle * unit) + y * Math.sin(HoughArr[k].angle * unit))) {
	                        this.setPoint(x, y, color);
	                        break;
	                    }
	                }
	            });
	            this.render();
	            return this;
	        }
	    });
	})(_CGraph2.default);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _CGraph = __webpack_require__(2);

	var _CGraph2 = _interopRequireDefault(_CGraph);

	var _CPoint = __webpack_require__(24);

	var _CPoint2 = _interopRequireDefault(_CPoint);

	var _CParticle = __webpack_require__(22);

	var _CParticle2 = _interopRequireDefault(_CParticle);

	var _CParticleSystem = __webpack_require__(23);

	var _CParticleSystem2 = _interopRequireDefault(_CParticleSystem);

	var _colorHelper = __webpack_require__(27);

	var _colorHelper2 = _interopRequireDefault(_colorHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.CGraph = _CGraph2.default; /**
	                                   * 作者: 阮家友
	                                   * 时间: 2018-3-10 16:22:19
	                                   * 描述: webpack模块中的js类,前端中无法访问,在这里挂载到window
	                                   */

	window.CPoint = _CPoint2.default;
	window.CParticle = _CParticle2.default;
	window.CParticleSystem = _CParticleSystem2.default;
	window.CColor = _colorHelper2.default;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	
	class Color {
	    /**
	     * @constructor
	     * @param {string|object} 
	     */
	    constructor(val) {
	        this._rgb = { R: 0, G: 0, B: 0 };
	        this._hsl = { H: 0, S: 0, L: 0 };
	        this.A = 1;
	        if (val) {
	            this.parse(val);
	        }
	    }
	    // RGB和HSL状态切换
	    _trans2(RGB) {
	        if (RGB) {
	            this._hsl = this._rgb2hsl(this._2rgb());
	        } else {
	            this._rgb = this._hsl2rgb(this._2hsl());
	        }
	    }
	    set R(n) {
	        this._rgb.R = this._limit(n, 255);
	        this._trans2(true);
	    }
	    set G(n) {
	        this._rgb.G = this._limit(n, 255);
	        this._trans2(true);
	    }
	    set B(n) {
	        this._rgb.B = this._limit(n, 255);
	        this._trans2(true);
	    }
	    set H(n) {
	        this._hsl.H = this._limit(n, 360);
	        this._trans2(false);
	    }
	    set S(n) {
	        this._hsl.S = this._limit(n);
	        this._trans2(false);
	    }
	    set L(n) {
	        this._hsl.L = this._limit(n);
	        this._trans2(false);
	    }
	    // 设置透明度 0-1 最小单位0.01
	    set A(n) {
	        this._a = this._limit(n);
	    }
	    get R() {
	        return this._rgb.R;
	    }
	    get G() {
	        return this._rgb.G;
	    }
	    get B() {
	        return this._rgb.B;
	    }
	    get H() {
	        return this._hsl.H;
	    }
	    get S() {
	        return this._hsl.S;
	    }
	    get L() {
	        return this._hsl.L;
	    }
	    get A() {
	        return this._a;
	    }
	    /**
	     * 
	     */
	    parse(str) {
	        let m = null;
	        this.A = 1;
	        // object RGB 或 object HSL 解析后返回
	        if (typeof str === 'object') {
	            this.A = str.A;
	            if (str.H && str.S && str.L) {
	                this.H = str.H;
	                this.S = str.S;
	                this.L = str.L;
	                return this;
	            } else if (str.R && str.G && str.B) {
	                this.R = str.R;
	                this.G = str.G;
	                this.B = str.B;
	                return this;
	            } else {
	                str = '#000';
	            }
	        }
	        if (str in this.NickName) {
	            str = this.NickName[str];
	        }
	        if (m = this.RE.hex3.exec(str)) {
	            // 格式: #789
	            m = parseInt(m[1], 16);
	            this.R = (m >> 8 & 0xf) | (m >> 4 & 0x0f0);
	            this.G = (m >> 4 & 0xf) | (m & 0xf0);
	            this.B = (m & 0xf) << 4 | (m & 0xf);
	        } else if (m = this.RE.hex6.exec(str)) {
	            // 格式: #778899
	            m = parseInt(m[1], 16);
	            this.R = m >> 16 & 0xff;
	            this.G = m >> 8 & 0xff;
	            this.B = m & 0xff;
	        } else if (m = this.RE.hex8.exec(str)) {
	            this.A = this._limit(parseInt(m[1].substring(6, 8), 16) / 255);
	            m = parseInt(m[1].substring(0, 6), 16);
	            this.R = m >> 16 & 0xff;
	            this.G = m >> 8 & 0xff;
	            this.B = m & 0xff;
	        } else if (m = this.RE.rgb.exec(str)) {
	            // 格式: rgb(255, 255, 255)
	            this.R = this._limit(m[1], 255);
	            this.G = this._limit(m[2], 255);
	            this.B = this._limit(m[3], 255);
	        } else if (m = this.RE.rgba.exec(str)) {
	            // 格式: rgba(255, 255, 255, 0.5)
	            this.R = this._limit(m[1], 255);
	            this.G = this._limit(m[2], 255);
	            this.B = this._limit(m[3], 255);
	            this.A = this._limit(m[4]);
	        } else if (m = this.RE.hsl.exec(str)) {
	            // 格式: hsl( 222, 55%, 43%)
	            var o = { H: this._limit(m[1], 360), S: this._limit(m[2]), L: this._limit(m[3]) };
	            this._rgb = this._hsl2rgb(o);
	        } else if (m = this.RE.hsla.exec(str)) {
	            // 格式: hsla( 222, 55%,43%, 0.8)
	            var o = { H: this._limit(m[1], 360), S: this._limit(m[2]), L: this._limit(m[3]) };
	            this._rgb = this._hsl2rgb(o);
	            this.A = this._limit(m[4]);
	        } else {
	            this.parse('#000');
	        }
	        return this;
	    }
	    toString(type) {
	        let T = Color.TYPE,
	            res;
	        switch (type) {
	            case T.RGB:
	                res = `rgb(${this.R}, ${this.G}, ${this.B})`;
	                break;
	            case T.RGBA:
	                res = `rgba(${this.R}, ${this.G}, ${this.B}, ${this.A})`;
	                break;
	            case T.HSL:
	                res = `hsl(${this.H}, ${this.S}, ${this.L})`;
	                break;
	            case T.HSLA:
	                res = `hsla(${this.H}, ${this.S}, ${this.L}, ${this.A})`;
	                break;
	            case T.HSB:
	                //TODO:
	                res = 'TODO';
	                break;
	            case T.LAB:
	                //TODO:
	                res = 'TODO';
	                break;
	            case T.CMYK:
	                //TODO:
	                res = 'TODO';
	                break;
	            case T.HSV:
	                //TODO:
	                res = 'TODO';
	                break;
	            case T.HEX8:
	                res = this._2hex8();
	            default:
	                return this._2hex6();
	                break;
	        }
	        return res;
	    }
	    // rgb hsl hsb 
	    toJSON(type) {
	        let T = Color.TYPE,
	            res = { R: this.R, G: this.G, B: this.B };
	        switch (type) {
	            case T.RGB: break;
	            case T.RGBA: res.A = this.A; break;
	            case T.HSL: res = { H: this._hsl.H, S: this.S, L: this.L }; break;
	            case T.HSLA:
	                res = { H: this.H, S: this.S, L: this.L };
	                res.A = this.A;
	                break;
	            case T.HSB: break;
	            case T.LAB: break;
	            case T.CMYK: break;
	            case T.HSV: break;
	            default: break;
	        }
	        return res;
	    }
	    /**
	     * 默认最大值是1 最大值不是1时返回整数 否则返回0-1
	     */
	    _limit(n, max) {
	        max = max || 1;
	        if (typeof n === 'string') {
	            if (n.charAt(n.length - 1) === '%') {
	                n = (parseFloat(n) || 0) * max;
	                n = n < 1 ? 0 : n / 100;
	            } else {
	                n = parseFloat(n) || 0;
	            }
	        } else if (typeof n !== 'number') {
	            n = max === 1 ? 1 : 0;
	        }
	        // 非0-1则转为整数 否则保留两位小数
	        n = max === 1 ? Math.round(n * 1000) / 1000 : Math.round(n);
	        // [0, max]限制
	        return (n < 0 ? 0 : (n > max ? max : n));
	    }
	    // 二位8bit转为16位
	    _2hex_str(n) {
	        n = parseInt(n) || 0;
	        n = (n > 255 ? 255 : (n > 0 ? n : 0)).toString(16);
	        return (n.length === 1 ? `0${n}` : n).toUpperCase();
	    }
	    // return json
	    _2rgb() {
	        return this._rgb;
	    }
	    _2rgba() {
	        let o = this._rgb;
	        o.A = this.A;
	        return o;
	    }
	    _2hsl() {
	        return this._hsl;
	    }
	    _2hex6() {
	        return `#${this._2hex_str(this.R)}${this._2hex_str(this.G)}${this._2hex_str(this.B)}`;
	    }
	    _2hex8() {
	        return `#${this._2hex_str(this.R)}${this._2hex_str(this.G)}${this._2hex_str(this.B)}${this._2hex_str(this.A * 255)}`;
	    }
	    _hueToRGB(p, q, h) {
	        if (h < 0)
	            h += 1;
	        else if (h > 1)
	            h -= 1;

	        if ((h * 6) < 1)
	            return p + (q - p) * h * 6;
	        else if ((h * 2) < 1)
	            return q;
	        else if ((h * 3) < 2)
	            return p + (q - p) * ((2 / 3) - h) * 6;
	        else
	            return p;
	    }
	    _hsl2rgb(hsl) {
	        var h = this._limit(hsl.H / 360);
	        var s = this._limit(hsl.S);
	        var l = this._limit(hsl.L);

	        if (l <= 0.5)
	            var q = l * (1 + s);
	        else
	            var q = l + s - (l * s);

	        var p = 2 * l - q;

	        var tr = h + (1 / 3);
	        var tg = h;
	        var tb = h - (1 / 3);

	        var r = Math.round(this._hueToRGB(p, q, tr) * 255);
	        var g = Math.round(this._hueToRGB(p, q, tg) * 255);
	        var b = Math.round(this._hueToRGB(p, q, tb) * 255);
	        return { R: r, G: g, B: b };
	    }
	    _rgb2hsl(o) {
	        var r = o.R / 255,
	            g = o.G / 255,
	            b = o.B / 255,
	            max = Math.max(r, g, b),
	            min = Math.min(r, g, b),
	            add = max + min,
	            diff = max - min,
	            h = 0,
	            s = 0,
	            l = 0;
	        if (min === max) {
	            h = 0;
	        } else if (r === max) {
	            h = (60 * (b - r) / diff + 360) % 360;
	        } else if (g === max) {
	            h = (60 * (b - r) / diff) + 120;
	        } else {
	            h = (60 * (r - g) / diff) + 240;
	        }
	        l = 0.5 * add;
	        if (l === 0 || max === min) {
	            s = 0;
	        } else if (l === 1) {
	            s = 1;
	        } else if (l <= 0.5) {
	            s = diff / add;
	        } else {
	            s = diff / (2 - add);
	        }
	        h = Math.round(h);
	        s = Math.round(s * 10000) / 10000;
	        l = Math.round(l * 10000) / 10000;
	        return { H: h, S: s, L: l };
	    }
	    _2hsb() {

	    }
	    _2hsv() {

	    }
	    _2lab() {

	    }
	    _2cmyk() {

	    }
	    reverse() {

	    }
	    lighten() {

	    }
	    darken() {

	    }
	}
	// 颜色正则
	Color.prototype.RE = {
	    'hex3': /^#([0-9a-f]{3})$/,
	    'hex6': /^#([0-9a-f]{6})$/,
	    'hex8': /^#([0-9a-f]{8})$/,
	    'rgb': /^rgb\(\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*\)$/,
	    'rgba': /^rgba\(\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*\)$/,
	    'hsl': /^hsl\(\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*\)$/,
	    'hsla': /^hsla\(\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*\)$/,
	}
	// 颜色简称
	Color.prototype.NickName = {
	    'aliceblue': 'F0F8FF',
	    'antiquewhite': 'FAEBD7',
	    'aqua': '00FFFF',
	    'aquamarine': '7FFFD4',
	    'azure': 'F0FFFF',
	    'beige': 'F5F5DC',
	    'bisque': 'FFE4C4',
	    'black': '000000',
	    'blanchedalmond': 'FFEBCD',
	    'blue': '0000FF',
	    'blueviolet': '8A2BE2',
	    'brown': 'A52A2A',
	    'burlywood': 'DEB887',
	    'cadetblue': '5F9EA0',
	    'chartreuse': '7FFF00',
	    'chocolate': 'D2691E',
	    'coral': 'FF7F50',
	    'cornflowerblue': '6495ED',
	    'cornsilk': 'FFF8DC',
	    'crimson': 'DC143C',
	    'cyan': '00FFFF',
	    'darkblue': '00008B',
	    'darkcyan': '008B8B',
	    'darkgoldenrod': 'B8860B',
	    'darkgray': 'A9A9A9',
	    'darkgreen': '006400',
	    'darkkhaki': 'BDB76B',
	    'darkmagenta': '8B008B',
	    'darkolivegreen': '556B2F',
	    'darkorange': 'FF8C00',
	    'darkorchid': '9932CC',
	    'darkred': '8B0000',
	    'darksalmon': 'E9967A',
	    'darkseagreen': '8FBC8F',
	    'darkslateblue': '483D8B',
	    'darkslategray': '2F4F4F',
	    'darkturquoise': '00CED1',
	    'darkviolet': '9400D3',
	    'deeppink': 'FF1493',
	    'deepskyblue': '00BFFF',
	    'dimgray': '696969',
	    'dodgerblue': '1E90FF',
	    'firebrick': 'B22222',
	    'floralwhite': 'FFFAF0',
	    'forestgreen': '228B22',
	    'fuchsia': 'FF00FF',
	    'gainsboro': 'DCDCDC',
	    'ghostwhite': 'F8F8FF',
	    'gold': 'FFD700',
	    'goldenrod': 'DAA520',
	    'gray': '808080',
	    'green': '008000',
	    'greenyellow': 'ADFF2F',
	    'honeydew': 'F0FFF0',
	    'hotpink': 'FF69B4',
	    'indianred': 'CD5C5C',
	    'indigo': '4B0082',
	    'ivory': 'FFFFF0',
	    'khaki': 'F0E68C',
	    'lavender': 'E6E6FA',
	    'lavenderblush': 'FFF0F5',
	    'lawngreen': '7CFC00',
	    'lemonchiffon': 'FFFACD',
	    'lightblue': 'ADD8E6',
	    'lightcoral': 'F08080',
	    'lightcyan': 'E0FFFF',
	    'lightgoldenrodyellow': 'FAFAD2',
	    'lightgreen': '90EE90',
	    'lightgrey': 'D3D3D3',
	    'lightpink': 'FFB6C1',
	    'lightsalmon': 'FFA07A',
	    'lightseagreen': '20B2AA',
	    'lightskyblue': '87CEFA',
	    'lightslategray': '778899',
	    'lightsteelblue': 'B0C4DE',
	    'lightyellow': 'FFFFE0',
	    'lime': '00FF00',
	    'limegreen': '32CD32',
	    'linen': 'FAF0E6',
	    'magenta': 'FF00FF',
	    'maroon': '800000',
	    'mediumaquamarine': '66CDAA',
	    'mediumblue': '0000CD',
	    'mediumorchid': 'BA55D3',
	    'mediumpurple': '9370D8',
	    'mediumseagreen': '3CB371',
	    'mediumslateblue': '7B68EE',
	    'mediumspringgreen': '00FA9A',
	    'mediumturquoise': '48D1CC',
	    'mediumvioletred': 'C71585',
	    'midnightblue': '191970',
	    'mintcream': 'F5FFFA',
	    'mistyrose': 'FFE4E1',
	    'moccasin': 'FFE4B5',
	    'navajowhite': 'FFDEAD',
	    'navy': '000080',
	    'oldlace': 'FDF5E6',
	    'olive': '808000',
	    'olivedrab': '6B8E23',
	    'orange': 'FFA500',
	    'orangered': 'FF4500',
	    'orchid': 'DA70D6',
	    'palegoldenrod': 'EEE8AA',
	    'palegreen': '98FB98',
	    'paleturquoise': 'AFEEEE',
	    'palevioletred': 'D87093',
	    'papayawhip': 'FFEFD5',
	    'peachpuff': 'FFDAB9',
	    'peru': 'CD853F',
	    'pink': 'FFC0CB',
	    'plum': 'DDA0DD',
	    'powderblue': 'B0E0E6',
	    'purple': '800080',
	    'red': 'FF0000',
	    'rosybrown': 'BC8F8F',
	    'royalblue': '4169E1',
	    'saddlebrown': '8B4513',
	    'salmon': 'FA8072',
	    'sandybrown': 'F4A460',
	    'seagreen': '2E8B57',
	    'seashell': 'FFF5EE',
	    'sienna': 'A0522D',
	    'silver': 'C0C0C0',
	    'skyblue': '87CEEB',
	    'slateblue': '6A5ACD',
	    'slategray': '708090',
	    'snow': 'FFFAFA',
	    'springgreen': '00FF7F',
	    'steelblue': '4682B4',
	    'tan': 'D2B48C',
	    'teal': '008080',
	    'thistle': 'D8BFD8',
	    'tomato': 'FF6347',
	    'turquoise': '40E0D0',
	    'violet': 'EE82EE',
	    'wheat': 'F5DEB3',
	    'white': 'FFFFFF',
	    'whitesmoke': 'F5F5F5',
	    'yellow': 'FFFF00',
	    'yellowgreen': '9ACD32'
	}
	//
	Color.TYPE = {
	    'HEX': 'HEX',
	    'HEX8': 'HEX8',
	    'RGB': 'RGB',
	    'RGBA': 'RGBA',
	    'HSL': 'HSL',
	    'HSLA': 'HSLA'
	};
	var o = new Color({ R: 51, G: 85, B: 170 });
	console.log(o.toJSON(Color.TYPE.HSL));
	module.exports = Color;

/***/ })
/******/ ]);