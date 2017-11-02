/**
作者：阮家友
时间：2017-3-26 16:29:18
说明：连环画效果

*/
var medianRadius = 1;
CCanvas.prototype.comics = function(x,y){
    var o = this.getRGB(x,y);
    var res = { R: 0, G: 0, B: 0};
    var v = 0;
    //R
    v = Math.round(Math.abs((o.G-o.B+o.G+o.R)*o.R/256));
    if(v > 255) v = 255;
    if(v < 0) v = 0;
    res.R = v;
    //G
    v = Math.round(Math.abs((o.B-o.G+o.B+o.R)*o.R/256));
    if(v > 255) v = 255;
    if(v < 0) v = 0;
    res.G = v;
    //B
    v = Math.round(Math.abs((o.B-o.G + o.B+o.R)*o.G/256));
    if(v > 255) v = 255;
    if(v < 0) v = 0;
    res.B = v;

    this.setRGB(x, y, res);
}