/**
作者：阮家友
时间：2017-3-26 00:52:25
说明：medianRadius不能取太大 取1最佳
      原先的中值滤波 不知为什么感觉有问题和大学第一次的实现不同 字符水印没去掉
      现在的好了

*/
var medianRadius = 1;
CCanvas.prototype.medianFilter = function(x,y){
    var arr = [];
    //获取窗口所有像素 并排序
    for(var i=0, m1=-medianRadius; m1 <= medianRadius; m1++, i++){
        for(var j=0, m2=-medianRadius; m2 <= medianRadius; m2++, j++){
            arr.push(this.getRGB(x+getOffsetX(m1,x,this.mWidth),y+getOffsetX(m2,y,this.mHeight)));
        }
    }
    arr.sort(function(a,b){
        return a.R+a.G+a.B < b.R+b.G+b.B
    });
    //取中值
    this.setRGB(x, y, arr[2*medianRadius*(medianRadius+1)]);
}
CCanvas.prototype.medianFilterRow = function(x,y){
    var arr = [];
    //获取窗口所有像素 并排序
    for(var m1=-medianRadius; m1 <= medianRadius; m1++){
        arr.push(this.getRGB(x+getOffsetX(m1,x,this.mWidth),y));
    }
    arr.sort(function(a,b){
        return a.R+a.G+a.B < b.R+b.G+b.B
    });
    //取中值
    this.setRGB(x, y, arr[medianRadius]);
}
CCanvas.prototype.medianFilterCol = function(x,y){
    var arr = [];
    //获取窗口所有像素 并排序
    for(var m1=-medianRadius; m1 <= medianRadius; m1++){
        arr.push(this.getRGB(x,y+getOffsetX(m1,y,this.mHeight)));
    }
    arr.sort(function(a,b){
        return a.R+a.G+a.B < b.R+b.G+b.B
    });
    //取中值
    this.setRGB(x, y, arr[medianRadius]);
}