/**
作者：阮家友
时间：2016-7-23 01:24:28
说明：高斯滤波
      2017-3-23 13:12:32 定义默认的半径和数组 依赖offset.js
      this.Width ~~ this.mWidth
      colGauss里用的mWidth造成黑块！
      2017-3-23 20:47:28
      挂到 CGraph上
**/
var GaussR = 10;
var Gs = [];
CCanvas.prototype.rowGauss = function(x,y){
    var t = {"R": 0, "G": 0, "B": 0},o;
    var m=0, k=0, off=0;
    for(m=0, k=-GaussR; k <= GaussR; k++, m++){
        off = getOffsetX(k, x, this.mWidth);
        o = this.getRGB(x+off, y);
        t.R += o.R*Gs[m];
        t.G += o.G*Gs[m];
        t.B += o.B*Gs[m];
    }
    this.setRGB(x, y, t);
}
CCanvas.prototype.colGauss = function(x,y){
    var t = {"R": 0, "G": 0, "B": 0},o;
    var m=0, k=0, off=0;
    for(m=0, k=-GaussR; k <= GaussR;k++, m++){
        off = getOffsetX(k, y, this.mHeight);
        o = this.getRGB(x,off+y);
        t.R += o.R*Gs[m];
        t.G += o.G*Gs[m];
        t.B += o.B*Gs[m];
    }
    this.setRGB(x, y, t);
}
//计算高斯权重系数 一维高斯算子
CCanvas.prototype.getGaussArr = function(radius){
    //高斯权重结果数组
    var resArr = [];
    //直径 2R+1
    var d =0;
    //f(x)=1/(δ√2π)*e^(-x^2/2δ^2)   δ取3 
    var x = radius/3;
    var args1 = 2*x*x;
    var args2 = x*Math.sqrt(2*Math.PI);
    //sum 用于权值归一化处理 
    var sum=0;
    //被反复使用的临时变量
    var t=null,i=0,j=0;
    if(radius < 1) radius = 1;
    d = 2*radius+1;
    for(j=0,i=-radius;i <= radius;i++,j++){
        t = Math.pow(Math.E,-i*i/args1)/(args2);
        sum += t;
        resArr.push(t);
    }
    //归一化处理
    if(sum!=1){
        for(i=resArr.length-1;i>=0;i--){
            resArr[i] /= sum;
        }
    }
    return resArr;
};
