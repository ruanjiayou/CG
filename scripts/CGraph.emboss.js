/**
 * 作者: 阮家友
 * 时间: 2018-2-17 19:46:41
 */
; (function (o) {
    o.extend({
        'emboss': function () {
            this.each(function (x, y) {
                let x1, y1;
                // 当前点减去下一点
                let p = this.getPoint(x, y);
                let pn = { R: 0, G: 0, B: 0 };
                x1 = x < this.mWidth - 1 ? x + 1 : this.mWidth - 1;
                y1 = y < this.mHeight - 1 ? y + 1 : this.mHeight - 1;
                pn = this.getPoint(x1, y1);
                pn.R = p.R - pn.R + 128;
                pn.G = p.G - pn.G + 128;
                pn.B = p.B - pn.B + 128;
                this.setPoint(x, y, pn);
            });
            return this;
        }
    });
})(CGraph);