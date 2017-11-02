/**
作者：阮家友
时间：2017-3-26 16:12:41
说明：雾化效果 实在不咋地

*/
var medianRadius = 1;
CCanvas.prototype.atomization = function(x,y){
    var ran = Math.round(Math.random()*100)%3;
    var dx = getOffsetX(ran,x,this.mWidth), dy = getOffsetX(ran,y,this.mHeight);
    //取中值
    this.setRGB(x, y, this.getRGB(x+dx,y+dy));
}