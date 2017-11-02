/**
作者：阮家友
时间：2017-4-13 21:34:08
说明：所有滤波操作的集合 gauss/middle/

*/
//
function getOffsetX(offset,x0,end){
    var res = x0+offset;
    if(res < 0) res = -offset;
    else if(res >= end) res = - offset;
    else res = offset;
    return res;
}
//距离
function D(x,y){
    return Math.sqrt(x*x+y*y);
}

//1.高斯滤波
//计算高斯权重系数 一维高斯算子
function getGaussArr(radius){
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
}
function rowGauss(x,y){
    var t = {"R": 0, "G": 0, "B": 0},o;
    var m=0, k=0, off=0;
    for(m=0, k=-Filter.GaussR; k <= Filter.GaussR; k++, m++){
        off = getOffsetX(k, x, this.mWidth);
        o = this.getRGB(x+off, y);
        t.R += o.R*Filter.Gs[m];
        t.G += o.G*Filter.Gs[m];
        t.B += o.B*Filter.Gs[m];
    }
    this.setRGB(x, y, t);
}
function colGauss(x,y){
    var t = {"R": 0, "G": 0, "B": 0},o;
    var m=0, k=0, off=0;
    for(m=0, k=-Filter.GaussR; k <= Filter.GaussR;k++, m++){
        off = getOffsetX(k, y, this.mHeight);
        o = this.getRGB(x,off+y);
        t.R += o.R*Filter.Gs[m];
        t.G += o.G*Filter.Gs[m];
        t.B += o.B*Filter.Gs[m];
    }
    this.setRGB(x, y, t);
}
//2.中值滤波
function rowMiddle(x,y){
    var arr = [];
    //获取窗口所有像素 并排序
    for(var m1=-Filter.middleV; m1 <= Filter.middleV; m1++){
        arr.push(this.getRGB(x+getOffsetX(m1,x,this.mWidth),y));
    }
    arr.sort(function(a,b){
        return a.R+a.G+a.B < b.R+b.G+b.B
    });
    //取中值
    this.setRGB(x, y, arr[Filter.middleV]);
}
function colMiddle(x,y){
    var arr = [];
    //获取窗口所有像素 并排序
    for(var m1=-Filter.middleV; m1 <= Filter.middleV; m1++){
        arr.push(this.getRGB(x,y+getOffsetX(m1,y,this.mHeight)));
    }
    arr.sort(function(a,b){
        return a.R+a.G+a.B < b.R+b.G+b.B
    });
    //取中值
    this.setRGB(x, y, arr[Filter.middleV]);
}
var Filter = {
    //1.高斯滤波
    GaussR: 10,
    Gs:[],
    gauss: function(){
        Filter.Gs = getGaussArr(Filter.GaussR);
        this.each(rowGauss).each(colGauss);
        return this;
    },
    //2.中值滤波
    middleV: 1,
    middle: function(){
        this.each(rowMiddle).each(colMiddle);
        return this;
    }
}