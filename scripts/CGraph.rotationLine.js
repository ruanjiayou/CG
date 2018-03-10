/**
 * 作者: 阮家友
 * 时间: 2018-2-19 23:24:23
 */
import CGraph from './CGraph';

; (function (o) {
    o.extend({
        'LineBlur': function (num) {
            let centerPoint = { x: this.mWidth / 2, y: this.mHeight / 2 };
            let angle = 0, R = 0;
            this.each(function (x, y) {
                let new_x = 0, new_y = 0;
                let t0 = 0, t1 = 0, t2 = 0;
                angle = Math.atan2(y - centerPoint.y, x - centerPoint.x);
                R = Math.sqrt((x - centerPoint.x) * (x - centerPoint.x) + (y - centerPoint.y) * (y - centerPoint.y));
                let pn = { R: 0, G: 0, B: 0 };
                for (let k = 0; k < num; k++) {
                    //angle += 0.01;// 加上就是旋转模糊
                    let temp = R - k > 0 ? R - k : 0;
                    new_x = parseInt(temp * Math.cos(angle) + centerPoint.x);
                    new_y = parseInt(temp * Math.sin(angle) + centerPoint.y);
                    let p = this.getPoint(new_x, new_y);
                    t0 += p.R;
                    t1 += p.G;
                    t2 += p.B;
                }
                pn.R = t0 / num;
                pn.G = t1 / num;
                pn.B = t2 / num;
                this.setPoint(x, y, pn);
            });
            return this;
        }
    });
})(CGraph);