/**
 * 作者: 阮家友
 * 时间: 2018-2-18 17:08:13
 */
; (function (o) {
    var CANDY_X = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    var CANDY_Y = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    function edgeLink(Aarr, lowThreshold, x, y, w, h) {
        var index = y * w + x;
        var x0 = (x === 0) ? x : x - 1;
        var x1 = (x === w - 1) ? x : x + 1;
        var y0 = (y === 0) ? y : y - 1;
        var y1 = (y === h - 1) ? y : y + 1;
        for (var i = x0; i <= x1; i++) {
            for (var j = y0; j <= y1; j++) {
                if ((i !== x || j !== y) && Aarr[index] !== 0) {
                    edgeLink(Aarr, lowThreshold, i, j, w, h);
                    return;
                }
                else {
                    Aarr[index] = 0;
                }
            }
        }
    }
    o.extend({
        'canny': function (r) {
            this.grey().gauss(r);
            //振幅与相位数组
            var Aarr = [];
            var Marr = [];
            //非最大信号压制最值
            var min = 180, max = 0, sum = 0, count = 0;
            //双阈值
            var lowThreshold = 0, highThreshold = 0;
            //1.梯度算法求振幅与相位数组
            this.each(function (x, y) {
                var index = y * this.mWidth + x;
                var Xgrad = 0, Ygrad = 0, newrow = 0, newcol = 0;
                for (var i = -1; i <= 1; i++) {
                    for (var j = -1; j <= 1; j++) {
                        newrow = y + i;
                        newcol = x + j;
                        if (newrow < 0 || newrow >= this.mHeight) newrow = y;
                        if (newcol < 0 || newcol >= this.mWidth) newcol = x;
                        Xgrad += CANDY_X[i + 1][j + 1] * this.getPoint(newcol, newrow).R;
                        Ygrad += CANDY_Y[i + 1][j + 1] * this.getPoint(newcol, newrow).R;
                    }
                }
                //振幅
                Aarr[index] = this.D(Xgrad, Ygrad);
                //相位
                if (Xgrad === 0) {
                    if (Ygrad > 0) {
                        Marr[index] = 90;
                    }
                    if (Ygrad < 0) {
                        Marr[index] = -90;
                    }
                }
                else {
                    if (Ygrad === 0) {
                        Marr[index] = 0;
                    }
                    else {
                        Marr[index] = 180 * Math.atan(Ygrad / Xgrad) / Math.PI;
                    }
                }
                //最终
                //→ ↑  (-1, 0) ( 1, 0) ( 0,+1) ( 0,-1)
                //↑ ←  (-1,+1) (-1,-1) (-1, 1) ( 0,-1)
                //↗↖ ( 1,+1) (-1,-1) (-1, 1) ( 1,-1)
                //↘↗ ( 1,-1) (-1, 1) ( 1,+1) (-1,-1)
                //↓ →  ( 1,-1) (-1, 1) (-1, 0) ( 1, 0)
                Marr[index] += 90;
                if (Aarr[index] !== 0) {
                    min = Math.min(min, Aarr[index]);
                    max = Math.max(max, Aarr[index]);
                    sum += Aarr[index];
                    count++;
                }
            });
            //2.非最大信号压制算法 3x3
            this.each(function (x, y) {
                var index = y * this.mWidth + x;
                var angle = Marr[index];//相位数组
                var m0 = Aarr[index];//振幅数组
                Marr[index] = m0;
                if (x === 0 || x === this.mWidth || y === 0 || y === this.mHeight) {
                    Aarr[index] = Marr[index] = 0;
                }
                var x_1 = x + this.getOffsetX(-1, x, this.mWidth);
                var x1 = x + this.getOffsetX(1, x, this.mWidth);
                var y_1 = y + this.getOffsetX(-1, y, this.mHeight);
                var y1 = y + this.getOffsetX(1, y, this.mHeight);
                var m1, m2;
                if (angle >= 0 && angle < 22.5) {
                    m1 = this.getPoint(x_1, y).R;
                    m2 = this.getPoint(x1, y).R;
                }
                else if (angle >= 22.5 && angle < 67.5) {
                    m1 = this.getPoint(x1, y_1).R;
                    m2 = this.getPoint(x_1, y1).R;
                }
                else if (angle >= 67.5 && angle < 112.5) {
                    m1 = this.getPoint(x1, y).R;
                    m2 = this.getPoint(x_1, y).R;
                }
                else if (angle >= 112.5 && angle < 157.5) {
                    m1 = this.getPoint(x_1, y_1).R;
                    m2 = this.getPoint(x1, y1).R;
                }
                else if (angle >= 157.5) {
                    m1 = this.getPoint(x_1, y1).R;
                    m2 = this.getPoint(x_1, y_1).R;
                }
                if (m1 > m0 || m2 > m0) {
                    Aarr[index] = 0;
                }
                var v = Marr[index];
                this.setPoint(x, y, { R: v, G: v, B: v });
            });
            sum = sum / count;
            highThreshold = sum * 2;
            lowThreshold = highThreshold / 4;
            //3.边缘连接
            this.each(function (x, y) {
                var index = y * this.mWidth + x;
                if (Aarr[index] >= highThreshold && Aarr[index] !== 0) {
                    edgeLink(Aarr, lowThreshold, x, y, this.mWidth, this.mHeight);
                }
                else {
                    Aarr[index] = 0;
                }
            });
            this.binarize(highThreshold);
            return this;
        }
    });
})(CGraph);