/**
 * 作者: 阮家友
 * 时间: 2018-2-16 18:47:54
 */
import CGraph from './CGraph';

CGraph.extend({
    'grey': function () {
        return this.each(function (x, y) {
            let o = this.getPoint(x, y);
            o.R = o.G = o.B = (o.R * 38 + o.G * 75 + o.B * 15) >> 7;
            this.setPoint(x, y, o);
        });

    }
});