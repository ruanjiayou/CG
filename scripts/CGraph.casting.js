/**
 * 作者: 阮家友
 * 时间: 2018-2-17 21:35:54
 */
import CGraph from './CGraph';

CGraph.extend({
    'casting': function () {
        this.each(function (x, y) {
            let p = this.getPoint(x, y);
            let pn = { R: 0, G: 0, B: 0 };
            let v = 0;
            //R
            v = Math.round(p.R * 128 / (p.G + p.B + 1));
            if (v > 255) v = 255;
            if (v < 0) v = 0;
            pn.R = v;
            //G
            v = Math.round(p.G * 128 / (p.R + p.B + 1));
            if (v > 255) v = 255;
            if (v < 0) v = 0;
            pn.G = v;
            //B
            v = Math.round(p.B * 128 / (p.G + p.R + 1));
            if (v > 255) v = 255;
            if (v < 0) v = 0;
            pn.B = v;

            this.setPoint(x, y, pn);
        });
        return this;
    }
});