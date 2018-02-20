/**
作者：阮家友
时间：2017-11-7 22:23:25
说明：

*/
; (function (o) {
    /**
     * 判断一点 (px ,py) 是否在胶囊体 ( 两端为(ax, ay)、(bx, by), 半径 r) 之中
     */
    function capsuleSDF(px, py, ax, ay, bx, by, r) {
        var pax = px - ax,
            pay = py - ay,
            bax = bx - ax,
            bay = by - ay,
            h = Math.max(Math.min((pax * bax + pay * bay) / (bax * bax + bay * bay), 1), 0),
            dx = pax - bax * h,
            dy = pay - bay * h;
        return Math.sqrt(dx * dx + dy * dy) - r;
    }
    /**
     * 对坐标 (x, y) 进行超采样
     */
    /*
    function sample(x, y) {
        var s = 0,
            cx = W * 0.5,
            cy = H * 0.5,
            j, i, r1, r2, t, r, ct, st, s;
        for (j = 0; j < 5; j++) {
            r1 = Math.max(w, h) * (j + 0.5) * 0.085;
            r2 = Math.max(w, h) * (j + 1.5) * 0.085;
            t = j * Math.PI / 64;
            r = (j + 1) * 0.5;
            for (i = 1; i <= 64; i++) {
                ct = Math.cos(t);
                st = Math.sin(t);
                s = Math.max(s, capsule(x, y, cx + r1 * ct, cy - r1 * st, cx + r2 * ct, cy - r2 * st, r)) ? true : false;
            }
        }
        return s;
    }
    */
    o.prototype.alphaBlend = function(x, y, alpha, r, g, b) {
        var rgb = this.getRGB(x, y);
        rgb.R = rgb.R * (1 - alpha) + r * alpha * 255;
        rgb.G = rgb.G * (1 - alpha) + g * alpha * 255;
        rgb.B = rgb.B * (1 - alpha) + b * alpha * 255;
        this.setRGB(x, y, rgb);
    };
    o.prototype.lineSDFAABB = function(ax, ay, bx, by, r) {
        var x0 = Math.floor(Math.min(ax, bx) - r),
            x1 = Math.ceil(Math.max(ax, bx) + r),
            y0 = Math.floor(Math.min(ay, by) - r),
            y1 = Math.ceil(Math.max(ay, by) + r),
            y, x;
        for (y = y0; y <= y1; y++) {
            for (x = x0; x <= x1; x++) {
                this.alphaBlend( x, y, Math.max(Math.min(0.5 - capsuleSDF(x, y, ax, ay, bx, by, r), 1), 0), 0, 0, 0);
            }
        }
    };
})(CCanvas);