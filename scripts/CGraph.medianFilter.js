/**
 * 作者: 阮家友
 * 时间: 2018-2-17 20:27:16
 */
; (function (o) {
    o.extend({
        'medianFilter': function (r) {
            this.each(function (x, y) {
                let arr = [];
                for (let m1 = -r; m1 <= r; m1++) {
                    arr.push(this.getPoint(x + this.getOffsetX(m1, x, this.mWidth), y));
                }
                arr.sort(function (a, b) {
                    return a.R + a.G + a.B < b.R + b.G + b.B;
                });
                this.setPoint(x, y, arr[r]);
            }).each(function (x, y) {
                let arr = [];
                for (let m1 = -r; m1 <= r; m1++) {
                    arr.push(this.getPoint(x, y + this.getOffsetX(m1, y, this.mHeight)));
                }
                arr.sort(function (a, b) {
                    return a.R + a.G + a.B < b.R + b.G + b.B;
                });
                this.setPoint(x, y, arr[r]);
            });
            return this;
        }
    });
})(CGraph);