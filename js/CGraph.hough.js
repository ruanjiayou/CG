﻿/**
作者：阮家友
时间：2017-4-6 00:04:15
说明：

*/
CCanvas.prototype.GetHoughLine = function(){
    //hough参数
    var Ox = this.mWidth/2, Oy = this.mHeight/2;
    var AgnleUnit = 180, unit = Math.PI/64;//角度
    var D = this.mHeight > this.mWidth ? this.mWidth : this.mHeight;
    var Diagonal = Math.sqrt(D*D);//对角线长度一半
    var Valve = Diagonal>>2;//阈值 threshold感觉不像
    var HoughArr = [];
    var HoughAngleRArr = [];//[angle,r]
    console.log("Valve:"+Valve);
    //初始化hough数组
    for(var i=0;i<AgnleUnit;i++){
        HoughAngleRArr[i] = new Array(Diagonal<1);
        for(var j=0;j<2*Diagonal;j++){
            HoughAngleRArr[i][j] = 0;
        }
    }
    //获得初步数据
    this.each(function(x,y){
        var red = this.getR(x,y);
        if(red)
            for(var u=0;u<AgnleUnit;u++){
                var r = Math.ceil(x*Math.cos(unit*u)+y*Math.sin(unit*u));
                r+=Diagonal;
                if(r<=0||r>=Diagonal||u==0||u==AgnleUnit-1);
                else HoughAngleRArr[u][r] +=1;
            }
    });
    function isSimilar(arr, angle, r){
        for(var i=0;i<arr.length;i++){
            if(Math.abs(arr[i].angle-angle) < 3 && Math.abs(arr[i].R - r) < 3){
                return true;
            }
        }
        return false;
    }
    //寻找hough阈值
    for(var i=0;i<AgnleUnit;i++){
        for(var j=0;j<2*Diagonal;j++){
            if(Valve<HoughAngleRArr[i][j] && false === isSimilar(HoughArr, i, j-Diagonal))
                HoughArr.push({"angle": i, "value": HoughAngleRArr[i][j], "R": j-Diagonal });
        }
    }
    //显示所有点
    this.each(function(x,y){
        for(var k=0;k < HoughArr.length;k++){
            if(HoughArr[k].R == Math.ceil(x*Math.cos(HoughArr[k].angle*unit)+y*Math.sin(HoughArr[k].angle*unit))){
                this.setRGB(x,y,{ R: 255, G: 11, B: 0 });
                break;
            }
        }
    });
    this.createCanvas(this.mData).appendTo();
    return HoughArr;
}