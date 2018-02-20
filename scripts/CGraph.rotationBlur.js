/**
 * 作者: 阮家友
 * 时间: 2018-2-20 00:05:31
 */
; (function (o) {
    o.extend({
        'rotationBlur': function (angel) {
            var centerPoint = { x: this.mWidth / 2, y: this.mHeight / 2 };
            var validPoint = 1,
                unit = angel * Math.PI / 180,
                unit2 = unit * unit,
                num = 30,
                num2 = num * num;
            this.each(function (x, y) {
                var x1, y1;
                var x0 = x - centerPoint.x, y0 = centerPoint.y - y;
                var sum = this.getPoint(x, y);
                validPoint = 1;
                x1 = x0;
                y1 = y0;
                //x0
                for (var k = 1; k < num; k++) {
                    x0 = x1;
                    y0 = y1;

                    if (y >= centerPoint.y) {
                        x1 = x0 - unit * y0 / num - unit2 * x0 / num2;
                        y1 = y0 + unit * x0 / num - unit2 * y0 / num2;
                    } else {
                        x1 = x0 + unit * y0 / num - unit2 * x0 / num2;
                        y1 = y0 - unit * x0 / num - unit2 * y0 / num2;
                    }

                    let xn = Math.floor(x1 + centerPoint.x);
                    let yn = Math.floor(centerPoint.y - y1);

                    if (xn > 0 && xn < this.mWidth && yn > 0 && yn < this.mHeight) {
                        var t = this.getPoint(xn, yn);
                        validPoint += 1;
                        sum.R += t.R;
                        sum.G += t.G;
                        sum.B += t.B;
                    }
                }
                sum.R = Math.floor(sum.R / validPoint);
                sum.G = Math.floor(sum.G / validPoint);
                sum.B = Math.floor(sum.B / validPoint);
                this.setPoint(x, y, sum);
            });
            return this;
        }
    });
})(CGraph);