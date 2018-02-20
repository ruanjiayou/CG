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
function _run(){
    animate()
    requestAnimateFrame(_run);
}
_run();
**/
window.requestAnimateFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){window.setTimeout(callback,1000/60);}
})();

//创建实例
////对象重新封装
function CCanvas(obj) {
    this.mCanvas = null;
    this.mGC = null;
    this.mWidth = 0;
    this.mHeight = 0;
    this.mData = [];//像素数组
    this.init(obj);
}
//初始化 封装原生canvas对象
CCanvas.prototype.init = function (obj) {
    //id 节点对象 
    if (typeof obj == "string") {
        this.mCanvas = document.getElementById(obj);
    }
    else {
        this.mCanvas = obj;
    }
    this.mGC = this.mCanvas.getContext("2d");
    this.mWidth = this.mCanvas.width;
    this.mHeight = this.mCanvas.height;
    this.mData = this.mGC.createImageData(this.mWidth,this.mHeight);
    for (var i=0;i<this.mData.data.length;i+=4){
        this.mData.data[i+0]=255;
        this.mData.data[i+1]=255;
        this.mData.data[i+2]=255;
        this.mData.data[i+3]=255;
    }
    this.mGC.putImageData(this.mData,0,0);
    //原点必须在canvas内
    this.mOriginX = this.mWidth/2;
    this.mOriginY = this.mHeight/2;
    this.mGC.lineWidth = 0.2;
    
    return this;
}
CCanvas.prototype.load = function(url,fn){
    var img = new Image();
    var oThis = this;
    img.onload = function(){
        oThis.mWidth = this.width;
        oThis.mHeight = this.height;
        oThis.mCanvas.width = this.width;
        oThis.mCanvas.height = this.height;
        oThis.mGC.drawImage(this,0,0);
        oThis.mData = oThis.mGC.getImageData(0,0,this.width,this.height);
        if(fn) fn.call(oThis);
    }
    img.src = url;
}
CCanvas.prototype.getData = function(){
    return this.mGC.getImageData(0, 0, this.mWidth, this.mHeight);
}
CCanvas.prototype.putData = function(data){
    this.mGC.putImageData(data, 0, 0);
    return this;
}
//清空画布
CCanvas.prototype.clear = function () {
    this.mGC.clearRect(0, 0, this.mWidth, this.mHeight);
}
// 根据自身创建画布 如果有data则draw
CCanvas.prototype.createCanvas = function(data){
    var blank = NewNode("canvas",{"width": this.mWidth, "height": this.mHeight });
    var res = new CCanvas(blank)
    if(data) res.putData(data);
    return res;
}
CCanvas.prototype.appendTo = function(obj){
    if(!obj) obj = document.body;
    obj.appendChild(this.mCanvas);
    return this;
}
//重设画布大小
CCanvas.prototype.setSize = function (p) {
    this.mWidth = this.mCanvas["width"] = p.width;
    this.mHeight = this.mCanvas["height"] = p.height;
    return this;
}
CCanvas.prototype.setStrokeColor = function(color){
    this.mGC.strokeStyle = color;
    return this;
}
CCanvas.prototype.setFillColor = function(color){
    this.mGC.fillStyle = color;
    return this;
}
CCanvas.prototype.attr = function (k,v) {
    var _json = {};
    if(v){
        _json[k] = v;
    }
    else {
        _json = k;
    }
    for (var key in _json) {
        switch (key) {
            case "width":
                this.mWidth = this.mCanvas["width"] = _json[key];
                break;
            case "height":
                this.mHeight = this.mCanvas["height"] = _json[key];
                break;
            default:
                this.mGC[k] = _json[key];
                break;
        }
    }
    return this;
}
//设置/获取 mCanvas的样式
CCanvas.prototype.css = function (css) {
    return this.proprety(css,true);
}
//设置/获取 mCanvas的属性
CCanvas.prototype.attr = function (attr) {
    //class 等要换成className
    return this.proprety(attr,true);
}
//设置/获取 mCanvas/mGC的属性
CCanvas.prototype.proprety = function (props, bCanvas) {
    var o = this.mGC, _props = {};
    if (bCanvas) {
        o = this.mCanvas;
    }
    if (typeof props == "string") {
        return o[props];
    }
    for (var k in props) {
        o[k] = props[k];
    }
    return this;
}
//约束像素RGB分量在0-255
CCanvas.prototype.limit = function(k){
    if(k < 0) k = 0;
    if(k > 255) k = 255;
    return Math.ceil(k);
};
CCanvas.prototype.setR = function(i, j, k){
    this.mData.data[(j*this.mWidth+i)*4] = this.limit(k);
};
CCanvas.prototype.setG = function(i, j, k){
    this.mData.data[(j*this.mWidth+i)*4+1] = this.limit(k);
};
CCanvas.prototype.setB = function(i, j, k){
    this.mData.data[(j*this.mWidth+i)*4+2] = this.limit(k);
};
CCanvas.prototype.getR = function(i, j){
    return this.mData.data[(j*this.mWidth+i)*4];
};
CCanvas.prototype.getG = function(i, j){
    return this.mData.data[(j*this.mWidth+i)*4+1];
};
CCanvas.prototype.getB = function(i, j){
    return this.mData.data[(j*this.mWidth+i)*4+2];
};
CCanvas.prototype.setRGB = function(i, j, o){
    var index = (j*this.mWidth+i)*4;
    this.mData.data[index]   = this.limit(o.R);
    this.mData.data[index+1] = this.limit(o.G);
    this.mData.data[index+2] = this.limit(o.B);
};
CCanvas.prototype.getRGB = function(i, j){
    var index = (j*this.mWidth+i)*4;
    return { "R": this.mData.data[index], "G": this.mData.data[index+1], "B": this.mData.data[index+2] };
};
CCanvas.prototype.run = function(fn,args){
    var arg = [];
    if(args) arg = args;
    fn.apply(this,args);
}
// 调用函数处理每个像素
CCanvas.prototype.each = function(fn){
    var i=0, j=0;
    for(i=0;i < this.mHeight;i++){
        for(j=0; j < this.mWidth; j++){
            fn.call(this, j, i );
        }
    }
    return this;
};
// 根据数据渲染画面
CCanvas.prototype.render = function (data) {
    if(data)
        this.mGC.putImageData(data,0,0)
    else
        this.mGC.putImageData(this.mData,0,0);
}
CCanvas.prototype.extend = function(){
    if(arguments.length==2){
        this[arguments[0]] = arguments[1];
    }
    else{
        for(var k in arguments[0]){
            this[k] = arguments[0][k];
        }
    }
}
//API重新封装
//参数必须是json，所有属性可选
//x：x坐标
//y：y坐标
//t：文本
CCanvas.prototype.drawText = function(argsJson){
    var _json = {
        "x": 0,
        "y": 0,
        "t": ""
    }
    for (var k in _json) _json[k] = argsJson[k];
    var style = this.mGC.fillStyle;
    this.setFillColor("#fff");
    this.mGC.fillText(_json["t"],_json["x"],_json["y"] + 5);
    this.setFillColor(style);
    return this;
}
//画圆   可传数组 
CCanvas.prototype.drawCircle = function (argsJson) {
    //必要参数 原点 x0,y0 半径 radius 
    //可选参数 填充颜色 描边颜色
    var _json = {
        "x0": 0,
        "y0": 0,
        "α": 0,
        "β": 2 * Math.PI,
        "R": 20
    }
    var argsArr = [];
    if(typeof argsJson.length == "number"){
        argsArr = argsJson;
    }
    else{
        argsArr.push(argsJson);
    }
    for(var i=0;i<argsArr.length;i++){
        this.mGC.beginPath();
        for (var k in argsArr[i]) _json[k] = argsArr[i][k];
        this.mGC.arc(_json["x0"] + 0.5, _json["y0"] + 0.5, _json["R"], _json["α"], _json["β"], true);
        this.mGC.closePath();
        this.mGC.stroke();
    }
    return this;
}
//填充圆 可传数组 
CCanvas.prototype.fillCircle = function(argsJson){
    //必要参数 原点 x0,y0 半径 radius 
    //可选参数 填充颜色 描边颜色
    var _json = {
        "x0": 0,
        "y0": 0,
        "α": 0,
        "β": 2 * Math.PI,
        "R": 10
    }
    var argsArr = [];
    if(typeof argsJson.length == "number"){
        argsArr = argsJson;
    }
    else{
        argsArr.push(argsJson);
    }
    for(var i=0;i<argsArr.length;i++){
        this.mGC.beginPath();
        for (var k in argsArr[i]) _json[k] = argsArr[i][k];
        this.mGC.arc(_json["x0"] + 0.5, _json["y0"] + 0.5, _json["R"], _json["α"], _json["β"], true);
        this.mGC.closePath();
        this.mGC.fill();
    }
    return this;
}
//直线
CCanvas.prototype.drawLine = function (argsJson) {
    var _json = {
        "x1": 0,
        "y1": 0,
        "x2": 0,
        "y2": 0
    }
    var argsArr = [];
    if(typeof argsJson.length == "number"){
        argsArr = argsJson;
    }
    else{
        argsArr.push(argsJson);
    }
    this.mGC.beginPath();
    for(var i=0;i<argsArr.length;i++){
        for (var k in argsArr[i]) _json[k] = argsArr[i][k];
        if (_json["width"] && _json["height"]) {
            _json["x2"] = _json["x1"] + _json["width"];
            _json["y2"] = _json["y1"] + _json["height"];
        }
        this.mGC.moveTo(_json["x1"]+0.5, _json["y1"]+0.5);
        this.mGC.lineTo(_json["x2"]+0.5, _json["y2"]+0.5);
    }
    this.mGC.closePath();
    this.mGC.stroke();
    return this;
}
//虚线
CCanvas.prototype.drawDashed = function(pos, len, percent){
    // x y w h 
    if(len===undefined){
        len = 10;
    }
    if(percent===undefined){
        percent = 0.5;
    } else {
        percent = percent > 1 ? 1: (percent < 0 ? 0 : percent);
    }
    if(pos.x2!==undefined && pos.y2!==undefined){
        pos.width = pos.x2 - pos.x;
        pos.height = pos.y2 - pos.y;
    }
    var l = Math.sqrt(pos.width*pos.width+pos.height*pos.height);
    if(l<=0) l = 1;
    var alpha = Math.acos(pos.width/l) * (pos.height > 0 ? 1 : -1);
    var dx = len * percent;
    var tempX = 0;
    //保存画布状态、移动到原点、将线移动到x正轴
    this.mGC.save();
    this.mGC.translate(pos.x + (pos.height===0? 1:0)*0.5,pos.y+(pos.width===0? 1:0)*0.5);
    this.mGC.rotate(alpha);
    this.mGC.beginPath();
    while(tempX < l) {
        this.mGC.moveTo(tempX, 0);
        this.mGC.lineTo( tempX + dx < l ? tempX + dx : l, 0);
        tempX += len;
    }
    this.mGC.closePath();
    this.mGC.stroke();
    this.mGC.restore();
    //恢复状态、画线
}
//辅助函数：给定两点和两控制点生成一段贝塞尔曲线点
CCanvas.prototype.getBezierCurve = function(startPoint, c1, c2, endPoint){
    //方程系数
    var XC = 3*(c1.x - startPoint.x),
        XB = 3*(c2.x - c1.x) - XC,
        XA = endPoint.x - startPoint.x - XC - XB,
        YC = 3*(c1.y - startPoint.y),
        YB = 3*(c2.y - c1.y) - YC,
        YA = endPoint.y - startPoint.y - YC - YB;
    //曲线点的数量
    var number = 100,
        i = 0,
        dt = 1/(number-1),
        dt1,
        dt2,
        dt3,
        temp,
        points = [];
    
    for(;i<number;i++){
        dt1 = dt*i;
        dt2 = dt1*dt1;
        dt3 = dt2*dt1;
        temp = new Object();
        temp.x = XA*dt3+XB*dt2+XC*dt1+startPoint.x;
        temp.y = YA*dt3+YB*dt2+YC*dt1+startPoint.y;
        points.push(temp);
    }
    return points;
}
//辅助函数：点是否在点数组围成的多边形内
CCanvas.prototype.isInPolygon = function(Point,area){
    var i=0,j=area.length-1,len=area.length,oddNodes=false;
    for(;i<len;i++){
        if((area[i].y<Point.y && area[j].y>=Point.y)||(area[j].y<Point.y && area[i].y>=Point.y)){
            if(area[i].x+(Point.y-area[i].y)/(area[j].y-area[i].y)*(area[j].x-area[i].x) < Point.x ) oddNodes=!oddNodes;
        }
        j=i;
    }
    return oddNodes;
}
//辅助函数：获取散点数组组成的闭合贝塞尔曲线点
CCanvas.prototype.getBezierPoints = function(points){
    var i=1,
        MidPoints = [],//中点
        VectorMid = [],//中点连线向量
        t = {x:0,y:0},
        len=points.length,
        scale=0.6,
        BezierPoints = [];
    if(len<3) return [];
    //中点坐标数组
    MidPoints.push({x:(points[0].x+points[len-1].x)/2,y:(points[0].y+points[len-1].y)/2});
    for(i=1;i<len;i++){
        MidPoints.push({x:(points[i].x+points[i-1].x)/2,y:(points[i].y+points[i-1].y)/2});
        //中点向量数组
        VectorMid.push({x:(MidPoints[i].x-MidPoints[i-1].x)/2,y:(MidPoints[i].y-MidPoints[i-1].y)/2});
    }
    VectorMid.push({x:(MidPoints[0].x-MidPoints[len-1].x)/2,y:(MidPoints[0].y-MidPoints[len-1].y)/2});
    //贝塞尔曲线
    for(i=1;i<=len;i++){
        BezierPoints = BezierPoints.concat(this.getBezierCurve(points[i-1],{x:points[i-1].x + VectorMid[i-1].x,y:points[i-1].y + VectorMid[i-1].y},{x:points[i%len].x - VectorMid[i%len].x,y:points[i%len].y - VectorMid[i%len].y},points[i%len]));
    }
    return BezierPoints;
}
//根据点数组填充描绘区域
CCanvas.prototype.fillPolygon = function(area){
    area = this.getBezierPoints(area);
    var i=1,len=area.length;
    if(len<3) return;
    this.mGC.beginPath();
    this.mGC.moveTo(area[0].x,area[0].y);
    for(;i<area.length;i++) this.mGC.lineTo(area[i].x,area[i].y);
    this.mGC.lineTo(area[0].x,area[0].y);
    this.mGC.closePath();
    //this.mGC.stroke();
    this.mGC.fill();
}
CCanvas.prototype.fillRing = function(x,y,r1,r2){
    this.mGC.beginPath();
    this.mGC.arc(x,y,r2,0,Math.PI*2,false);
    this.mGC.arc(x,y,r1,0,Math.PI*2,true);
    this.mGC.closePath();
    this.mGC.fill();
}
//bresenham光栅化
CCanvas.prototype.drawLine_bresenham = function(json){
    var x1 = json.x1,x2 = json.x2,y1 = json.y1,y2 = json.y2;
    var dx = Math.abs(x2-x1),dy = Math.abs(y2-y1),gt45 = false,color = { R: 255, G: 0, B: 0 };
    //保存老样式
    var old_stroke_style = this.mGC.strokeStyle;
    this.mGC.strokeStyle = '#f00';
    if(dx < dy){
        x1 = x1^y1, y1 = x1^y1, x1 = x1^y1;
        x2 = x2^y2, y2 = x2^y2, x2 = x2^y2;
        dx = dx^dy, dy = dx^dy, dx = dx^dy;
        gt45 = true;
    }
    var ix = (x2-x1) >= 0 ? 1: -1;
    var iy = (y2-y1) > 0 ? 1: (y2===y1?0:-1);
    var d = dy*2 - dx;
    //2017-10-8 14:19:40 修改bug y1初始值始终差一个iy。 y2===y1 时iy=0,
    y1-=iy;
    while(x1!=x2){
        if(d<0){
            d += dy*2;
        }
        else{
            y1+=iy;
            d += (dy-dx)*2;
        }
        //TODO 点着色
        if(gt45){
            //this.setRGB(y1,x1,color);
            this.drawLine({ x1: y1, y1: x1, x2: y1, y2: x1});
        }
        else{
            //this.setRGB(x1,y1,color);
            this.drawLine({ x1: x1, y1: y1, x2: x1, y2: y1});
        }
        x1+=ix;
    }
    //样式还原
    this.mGC.strokeStyle = old_stroke_style;
}
CCanvas.prototype._draw_circle_8 = function(x0,y0,x,y){
    var arr = [];
    arr.push({ 'x1': x0+x, 'y1': y0+y, 'x2': x0+x, 'y2': y0+y});
    arr.push({ 'x1': x0-x, 'y1': y0+y, 'x2': x0-x, 'y2': y0+y});
    arr.push({ 'x1': x0+x, 'y1': y0-y, 'x2': x0+x, 'y2': y0-y});
    arr.push({ 'x1': x0-x, 'y1': y0-y, 'x2': x0-x, 'y2': y0-y});
    arr.push({ 'x1': x0+x, 'y1': y0+y, 'x2': x0+x, 'y2': y0+y});
    arr.push({ 'x1': x0-x, 'y1': y0+y, 'x2': x0-x, 'y2': y0+y});
    arr.push({ 'x1': x0+x, 'y1': y0-y, 'x2': x0+x, 'y2': y0-y});
    arr.push({ 'x1': x0-x, 'y1': y0-y, 'x2': x0-x, 'y2': y0-y});
    this.drawLine(arr);
}
CCanvas.prototype.drawCircle_bresenham = function(x0,y0,r,color){
    var old_stroke_style = this.mGC.strokeStyle;
    this.mGC.strokeStyle = 'rgb('+ color.R + ',' + color.G + ',' + color.B +')';
    //在区域外 直接退出
    if(x0+r<0 || x0 - r>= this.mWidth || y0 + r < 0 || y0 - r >= this.mHeight){
        return;
    }
    var x=0,y=r,yi,d=3-2*r;
    while(x<=y){
        this._draw_circle_8(x0,y0,x,y);
        if(d<0){
            d=d+4*x+6;
        }
        else{
            d=d+4*(x-y)+10;
            y--;
        }
        x++;
    }
    this.mGC.strokeStyle = old_stroke_style;
}
CCanvas.prototype.fillCircle_bresenham = function(x0,y0,r,color){
    //在区域外 直接退出
    if(x0+r<0 || x0 - r>= this.mWidth || y0 + r < 0 || y0 - r >= this.mHeight){
        return;
    }
    var x=0,y=r,yi,d=3-2*r;
    while(x<=y){
        for(yi=x;yi<=y;yi++){
            this._draw_circle_8(x0,y0,x,yi);
        }
        if(d<0){
            d=d+4*x+6;
        }
        else{
            d=d+4*(x-y)+10;
            y--;
        }
        x++;
    }
}