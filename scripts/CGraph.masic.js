/**
 * 作者: 阮家友
 * 时间: 2018-2-17 20:18:29
 */
import CGraph from './CGraph';

CGraph.extend({
    'masic': function (v, p, w, h) {
        this.each(
            function (x, y) {
                let restX = x % v;
                let restY = y % v;
                let p = this.getPoint(x, y);
                let originX = x - restX;
                let originY = y - restY;
                let p0 = this.getPoint(originX, originY);
                p.R = p0.R;
                p.G = p0.G;
                p.B = p0.B;
                this.setPoint(x, y, p);
            },
            p ? p : { x: 0, y: 0 },
            w ? w : this.mWidth,
            h ? h : this.mHeight
        );
        return this;
    }
});
