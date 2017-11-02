//时间：2016-7-23 01:27:02
//作者：阮家友
//功能：计算移动窗口中 目标点与原点的偏离值  一般是 Math.abs(x0-x2). 当周边没有足够的点时  做镜像
//      2017-4-8 13:18:32 添加了D计算距离
function getOffsetX(offset,x0,end){
    var res = x0+offset;
    if(res < 0) res = -offset;
    else if(res >= end) res = - offset;
    else res = offset;
    return res;
}
//距离
function D(x,y){
    return Math.sqrt(x*x+y*y);
}