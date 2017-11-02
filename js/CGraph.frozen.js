/**
作者：阮家友
时间：2017-3-26 16:03:32
说明：

*/
var medianRadius = 1;
CCanvas.prototype.frozen = function(x,y){
    var o = this.getRGB(x,y);
    var res = { R: 0, G: 0, B: 0};
    var v = 0;
    //R
    v = (o.R - o.G - o.B)*3/2;
    if(v<0) v = -v;
    if(v>255) v = 255;
    res.R = v;
    //G
    v = (o.G - o.R - o.B)*3/2;
    if(v<0) v = -v;
    if(v>255) v = 255;
    res.G = v;
    //B
    v = (o.B - o.G - o.R)*3/2;
    if(v<0) v = -v;
    if(v>255) v = 255;
    res.B = v;
    
    this.setRGB(x, y, res);
}