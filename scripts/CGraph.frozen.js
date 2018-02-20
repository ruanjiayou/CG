/**
 * 作者: 阮家友
 * 时间: 2018-2-17 21:20:01
 */

; (function (o) {
    o.extend({
        'frozen': function () {
            this.each(function (x, y) {
                var p = this.getPoint(x, y);
                var res = { R: 0, G: 0, B: 0 };
                var v = 0;
                //R
                v = (p.R - p.G - p.B) * 3 / 2;
                if (v < 0) v = -v;
                if (v > 255) v = 255;
                res.R = v;
                //G
                v = (p.G - p.R - p.B) * 3 / 2;
                if (v < 0) v = -v;
                if (v > 255) v = 255;
                res.G = v;
                //B
                v = (p.B - p.G - p.R) * 3 / 2;
                if (v < 0) v = -v;
                if (v > 255) v = 255;
                res.B = v;

                this.setPoint(x, y, res);
            });
            return this;
        }
    })
})(CGraph);