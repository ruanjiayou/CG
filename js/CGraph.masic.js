//时间：2016-7-24 23:30:01
//作者：阮家友
//功能：图片马赛克效果
//2017-3-23 21:06:24 挂到CCanvas上
CCanvas.prototype.masic = function(x, y){
    var restX = x%this.v;
    var restY = y%this.v;
    var o = this.getRGB(x, y);
    var originX = x - restX;
    var originY = y - restY;
    o.R = this.getR(originX, originY);
    o.G = this.getG(originX, originY);
    o.B = this.getB(originX, originY);
    this.setRGB(x, y, o);
}