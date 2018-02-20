/**
 * 作者: 阮家友
 * 时间: 2018-2-17 21:25:56
 */
; (function (o) {
    o.extend({
        'atomization': function (r) {
            this.each(function (x, y) {
                let rran = Math.round(Math.random() * r);
                let dx = this.getOffsetX(rran, x, this.mWidth),
                    dy = this.getOffsetX(rran, y, this.mHeight);
                this.setPoint(x, y, this.getPoint(x + dx, y + dy));
            });
            return this;
        }
    });
})(CGraph);