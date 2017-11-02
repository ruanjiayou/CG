/**
作者：阮家友
时间：2017-3-28 23:00:26
说明：形态学操作函数
      morphology
**/
//按指定值对灰度图进行二值化
function binarize(v){
    this.each(function(x,y){
        var o = this.getR(x,y);
        var res = { R: 0, G: 0, B: 0 };
        if(o>v)  res.R = res.G = res.B = 255;
        this.setRGB(x,y,res);
    });
}
//获取阈值
function getThreshold(){
    var inithreshold  = 127, finalthreshold = 0;
    var means1 = 0, means2 = 0, arr1 = [], arr2 = [];
    function getMeans(arr){
        var res = 0, size = arr.length==0?1:arr.length;
        for(var i=0;i<arr.length;i++){
            res+=arr[i];
        }
        return res/size;
    }
    //获取一个通道的所有数据
    var temp = [];
    this.each(function(x,y){
        temp.push(this.getR(x,y));
    });
    while(inithreshold != finalthreshold){
        finalthreshold = inithreshold;
        for(var i=0;i<temp.length;i++){
            if(temp[i]<=inithreshold){
                arr1.push(temp[i]);
            }
            else{
                arr2.push(temp[i]);
            }
        }
        means1 = getMeans(arr1);
        means2 = getMeans(arr2);
        arr1=[];
        arr2=[];
        inithreshold = Math.ceil(means1/2+means2/2);
    }
    return finalthreshold;
}