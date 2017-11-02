/**
作者：阮家友
时间：2017-4-10 23:13:16
说明：旋转模糊 应该叫spin blur的

*/
var medianRadius = 1;
CCanvas.prototype.rotationBlur = function(){
    var centerPoint = {x: this.mWidth/2, y: this.mHeight/2};
    var validPoint = 1,
        unit = 5*Math.PI/180,
        unit2 = unit*unit,
        num = 30,
        num2 = num*num;
    this.each(function(x,y){
        var x0,y0;
        var x1 = x-centerPoint.x,y1 = centerPoint.y-y;
        var sum = this.getRGB(x,y);
        validPoint = 1;
        //x0
        for(var k=1;k<num;k++){
            x0=x1;
            y0=y1;
            if(x<centerPoint.x){
                x1 = x0-unit*y0/num-unit2*x0/num2;
                y1 = y0+unit*x0/num-unit2*y0/num2;
            }
            else{
                x1 = x0+unit*y0/num-unit2*x0/num2;
                y1 = y0-unit*x0/num-unit2*y0/num2;
            }
            
            x0 = Math.floor(x1+centerPoint.x);
            y0 = Math.floor(centerPoint.y-y1);
            if(x0>1 && x0<this.mWidth && y0>1 && y0<this.mHeight){
                var t = this.getRGB(x0,y0);
                validPoint += 1;
                sum.R += t.R;
                sum.G += t.G;
                sum.B += t.B;
            }
        }
        sum.R = Math.floor(sum.R/validPoint);
        sum.G = Math.floor(sum.G/validPoint);
        sum.B = Math.floor(sum.B/validPoint);
        this.setRGB(x,y,sum);
    });
    //console.log(res);
}