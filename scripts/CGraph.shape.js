/**
 * 作者: 阮家友
 * 时间: 2018-2-18 13:37:03
 */
; (function (o) {
    function draw_circle_8(p0, p) {
        let arr = [];
        arr.push({ 'x1': p0.x + p.x, 'y1': p0.y + p.y, 'x2': p0.x + p.x, 'y2': p0.y + p.y });
        arr.push({ 'x1': p0.x - p.x, 'y1': p0.y + p.y, 'x2': p0.x - p.x, 'y2': p0.y + p.y });
        arr.push({ 'x1': p0.x + p.x, 'y1': p0.y - p.y, 'x2': p0.x + p.x, 'y2': p0.y - p.y });
        arr.push({ 'x1': p0.x - p.x, 'y1': p0.y - p.y, 'x2': p0.x - p.x, 'y2': p0.y - p.y });
        arr.push({ 'x1': p0.x + p.x, 'y1': p0.y + p.y, 'x2': p0.x + p.x, 'y2': p0.y + p.y });
        arr.push({ 'x1': p0.x - p.x, 'y1': p0.y + p.y, 'x2': p0.x - p.x, 'y2': p0.y + p.y });
        arr.push({ 'x1': p0.x + p.x, 'y1': p0.y - p.y, 'x2': p0.x + p.x, 'y2': p0.y - p.y });
        arr.push({ 'x1': p0.x - p.x, 'y1': p0.y - p.y, 'x2': p0.x - p.x, 'y2': p0.y - p.y });
        this.drawLine(arr);
    }
    o.extend({
        'drawLine': function (p0, p1) {
            var argsArr = [];
            if (arguments.length === 1) {
                argsArr = p0;
            }
            else {
                argsArr.push([p0, p1]);
            }
            this.mGC.beginPath();
            for (var i = 0; i < argsArr.length; i++) {
                let point1 = argsArr[i][0];
                let point2 = argsArr[i][1];
                this.mGC.moveTo(point1.x + 0.5, point1.y + 0.5);
                this.mGC.lineTo(point2.x + 0.5, point2.y + 0.5);
            }
            this.mGC.closePath();
            this.mGC.stroke();
            return this;
        },
        'drawDashed': function (p0, p1, offset, percent) {
            //TODO:
        },
        'drawCircle': function (p0, r) {
            this.mGC.beginPath();
            this.mGC.arc(p0.x, p0.y, r, 0, Math.PI * 2, true);
            this.mGC.closePath();
            this.mGC.stroke();
            return this;
        },
        'fillCircle': function (p0, r) {
            this.mGC.beginPath();
            this.mGC.arc(p0.x, p0.y, r, 0, Math.PI * 2, true);
            this.mGC.closePath();
            this.mGC.fill();
            return this;
        },
        'drawLine_bresenham': function (p1, p2) {
            var x1 = p1.x, x2 = p2.x, y1 = p1.y, y2 = p2.y;
            var dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1), gt45 = false;
            if (dx < dy) {
                x1 = x1 ^ y1, y1 = x1 ^ y1, x1 = x1 ^ y1;
                x2 = x2 ^ y2, y2 = x2 ^ y2, x2 = x2 ^ y2;
                dx = dx ^ dy, dy = dx ^ dy, dx = dx ^ dy;
                gt45 = true;
            }
            var ix = (x2 - x1) >= 0 ? 1 : -1;
            var iy = (y2 - y1) > 0 ? 1 : (y2 === y1 ? 0 : -1);
            var d = dy * 2 - dx;
            //2017-10-8 14:19:40 修改bug y1初始值始终差一个iy。 y2===y1 时iy=0,
            y1 -= iy;
            while (x1 !== x2) {
                if (d < 0) {
                    d += dy * 2;
                }
                else {
                    y1 += iy;
                    d += (dy - dx) * 2;
                }
                //TODO 点着色
                if (gt45) {
                    this.drawLine({ x1: y1, y1: x1, x2: y1, y2: x1 });
                }
                else {
                    this.drawLine({ x1: x1, y1: y1, x2: x1, y2: y1 });
                }
                x1 += ix;
            }
            return this;
        },
        'fillRing': function (p, r1, r2) {
            this.mGC.beginPath();
            this.mGC.arc(p.x, p.y, r2, 0, Math.PI * 2, false);
            this.mGC.arc(p.x, p.y, r1, 0, Math.PI * 2, true);
            this.mGC.closePath();
            this.mGC.fill();
            return this;
        },
        'drawCircle_bresenham': function (p0, r) {
            //在区域外 直接退出
            if (p0.x + r < 0 || p0.x - r >= this.mWidth || p0.y + r < 0 || p0.y - r >= this.mHeight) {
                return this;
            }
            var p = { x: 0, y: r }, d = 3 - 2 * r;
            while (p.x <= p.y) {
                draw_circle_8.call(this, p0, p);
                if (d < 0) {
                    d = d + 4 * p.x + 6;
                }
                else {
                    d = d + 4 * (p.x - p.y) + 10;
                    p.y--;
                }
                p.x++;
            }
        },
        'fillCircle_bresenham': function (p0, r) {
            //在区域外 直接退出
            if (p0.x + r < 0 || p0.x - r >= this.mWidth || p0.y + r < 0 || p0.y - r >= this.mHeight) {
                return this;
            }
            var p = { x: 0, y: 0 }, y = r, d = 3 - 2 * r;
            while (p.x <= y) {
                for (p.y = p.x; p.y <= y; p.y++) {
                    this._draw_circle_8(p0, p);
                }
                if (d < 0) {
                    d = d + 4 * p.x + 6;
                }
                else {
                    d = d + 4 * (p.x - y) + 10;
                    y--;
                }
                p.x++;
            }
        }
    });
})(CGraph);