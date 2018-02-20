/**
 * 作者: 阮家友
 * 时间: 2018-2-18 17:52:01
 */
; (function (o) {
    o.extend({
        'binarize': function (v) {
            this.each(function (x, y) {
                var p = this.getPoint(x, y).R;
                var res = { R: 0, G: 0, B: 0 };
                if (p > v) res.R = res.G = res.B = 255;
                this.setPoint(x, y, res);
            });
            return this;
        }
    });
})(CGraph);