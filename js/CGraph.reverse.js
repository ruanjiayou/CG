//时间：2016-7-23 01:57:24
//作者：阮家友
//灰化取反
//2017-3-23 20:47:28
//  挂到 CGraph上
CCanvas.prototype.reverse = function(x,y){
    var o = this.getRGB(x,y);
    o.R = o.G = o.B = 255 - ((o.R*38 + o.G*75 + o.B*15) >> 7);
    this.setRGB(x,y,o);
}