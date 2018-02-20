/**
 * 作者: 阮家友
 * 时间: 2018-2-16 20:03:32
 */
; (function (obj) {
    obj.extend({
        'reverse': function () {
            this.each(function (x, y) {
                let o = this.getPoint(x, y);
                o.R = 255 - o.R;
                o.G = 255 - o.G;
                o.B = 255 - o.B;
                this.setPoint(x, y, o);
            });
            return this;
        }
    });
})(CGraph);