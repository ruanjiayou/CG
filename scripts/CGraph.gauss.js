/**
 * 作者: 阮家友
 * 时间: 2018-2-17 10:58:53
 */
; (function (o) {
    /**
     * 计算高斯权重系数-一维高斯算子
     * @param {number} radius - 半径
     */
    function getGaussArr(radius) {
        //高斯权重结果数组
        var resArr = [];
        //f(x)=1/(δ√2π)*e^(-x^2/2δ^2)   δ取3 
        var x = radius / 3;
        var args1 = 2 * x * x;
        var args2 = x * Math.sqrt(2 * Math.PI);
        //sum 用于权值归一化处理 
        var sum = 0;
        //被反复使用的临时变量
        var t = null, i = 0, j = 0;
        if (radius < 1) radius = 1;
        for (j = 0, i = -radius; i <= radius; i++ , j++) {
            t = Math.pow(Math.E, -i * i / args1) / (args2);
            sum += t;
            resArr.push(t);
        }
        //归一化处理
        if (sum !== 1) {
            for (i = resArr.length - 1; i >= 0; i--) {
                resArr[i] /= sum;
            }
        }
        return resArr;
    }
    o.extend({
        'gauss': function (r) {
            let gs = getGaussArr(r), q;
            this.each(function (x, y) {
                let p = { R: 0, G: 0, B: 0 }, m, k, off;
                for (m = 0, k = -r; k <= r; k++ , m++) {
                    off = this.getOffsetX(k, x, this.mWidth);
                    q = this.getPoint(x + off, y);
                    p.R += q.R * gs[m];
                    p.G += q.G * gs[m];
                    p.B += q.B * gs[m];
                }
                this.setPoint(x, y, p);
            }).each(function (x, y) {
                let p = { R: 0, G: 0, B: 0 }, m, k, off;
                for (m = 0, k = -r; k <= r; k++ , m++) {
                    off = this.getOffsetX(k, y, this.mHeight);
                    q = this.getPoint(x, off + y);
                    p.R += q.R * gs[m];
                    p.G += q.G * gs[m];
                    p.B += q.B * gs[m];
                }
                this.setPoint(x, y, p);
            });
            return this;
        }
    });
})(CGraph);