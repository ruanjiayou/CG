//时间：2016-7-23 00:07:31
//作者：阮家友
//功能：灰化变换
//2017-3-23 20:47:28
//  挂到 CCanvas上
CCanvas.prototype.grey = function(x,y){
    var o = this.getRGB(x,y);
    o.R = o.G = o.B = (o.R*38 + o.G*75 + o.B*15) >> 7;
    this.setRGB(x,y,o);
}