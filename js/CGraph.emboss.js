//时间：2016-7-23 01:27:02
//作者：阮家友
//功能：浮雕效果
//2017-3-23 20:47:28
//挂到 CGraph上
CCanvas.prototype.emboss = function(x,y){
    //当前点减去下一点的颜色
    var o = this.getRGB(x,y);
    var oNext = {"R": 0, "G": 0, "B": 0}, oNew = {"R": 0, "G": 0, "B": 0};
    if(x < this.mWidth-1){
        oNext = this.getRGB(x+1,y);
        oNew.R = o.R - oNext.R + 128;
        oNew.G = o.G - oNext.G + 128;
        oNew.B = o.B - oNext.B + 128;
        this.setRGB(x,y,oNew);
    }
    if(y < this.mHeight -1){
        oNext = this.getRGB(x,y+1);
        oNew.R = o.R - oNext.R + 128;
        oNew.G = o.G - oNext.G + 128;
        oNew.B = o.B - oNext.B + 128;
        this.setRGB(x,y,oNew);
    }
}