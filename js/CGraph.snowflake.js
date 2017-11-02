/**
作者：阮家友
时间：2017-4-2 14:58:34
说明：电视黑白雪花404效果

*/
CCanvas.prototype.snowflake = function(){
    this.mGC.fillStyle = "hsla(255,255%,255%,1)";
    this.mGC.fillRect(0,0,this.mWidth,this.mHeight);
    this.mGC.fill();
    var timer;
    var flicks = function () {
        this.mData = this.mGC.getImageData(0,0,this.mWidth,this.mHeight);
        this.each(function(x,y){
            var v = (Math.random() * 255) + 50;
            this.setRGB(x,y,{ R: v, G: v, B: v});
        }).render();
    };
    var oThis = this;
    timer = setInterval(function(){flicks.call(oThis);},30);
}