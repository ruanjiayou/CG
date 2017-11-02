/**
作者：阮家友
时间：2017-3-26 00:52:25
说明：

*/
var medianRadius = 1;
CCanvas.prototype.medianFilter = function(x,y){
    var o = this.getRGB(x,y);
    var res = { R: 0, G: 0, B: 0};
    
    //取中值
    this.setRGB(x, y, res);
}