/**
作者：阮家友
时间：2017-3-26 16:22:26
说明：熔铸效果 与 冰冻效果相反

*/
CCanvas.prototype.casting = function(x,y){
    var o = this.getRGB(x,y);
    var res = { R: 0, G: 0, B: 0};
    var v = 0;
    //R
    v = Math.round(o.R*128/(o.G+o.B+1));
    if(v > 255) v = 255;
    if(v < 0) v = 0;
    res.R = v;
    //G
    v = Math.round(o.G*128/(o.R+o.B+1));
    if(v > 255) v = 255;
    if(v < 0) v = 0;
    res.G = v;
    //B
    v = Math.round(o.B*128/(o.G+o.R+1));
    if(v > 255) v = 255;
    if(v < 0) v = 0;
    res.B = v;

    this.setRGB(x, y, res);
}