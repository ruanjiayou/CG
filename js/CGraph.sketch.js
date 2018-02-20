//时间：2016-7-24 22:28:18
//作者：阮家友
//功能：素描效果
//过程是一幅图灰化后的图与灰化反色高斯处理后的图进行运算得到新的图
//无法使用这种模式
CCanvas.prototype.sketch = function(){
    Gs = this.getGaussArr(GaussR);
    this.each(this.grey);
    var greyData = this.mData;
    this.mData = this.mGC.getImageData(0,0,this.mWidth,this.mHeight);
    this.each(this.reverse).each(this.rowGauss).each(this.colGauss);
    var reverseGaussData = this.mData;
    for(var i=0;i<this.mData.data.length;i++){
        var b = greyData.data[i];
        var a = reverseGaussData.data[i];
        var temp = a+a*b/(256-b);
        var ex = temp*temp/255/255;
        this.mData.data[i] = this.limit(ex*temp);
    }
    return this.mData;
}