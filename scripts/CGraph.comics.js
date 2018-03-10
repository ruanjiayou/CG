/**
 * 作者: 阮家友
 * 时间: 
 */
import CGraph from './CGraph';

CGraph.extend({
    'comics': function () {
        this.each(function (x, y) {
            let p = this.getPoint(x, y);
            let pn = { R: 0, G: 0, B: 0 };
            let v = 0;
            //R
            v = Math.round(Math.abs((p.G - p.B + p.G + p.R) * p.R / 256));
            if (v > 255) v = 255;
            if (v < 0) v = 0;
            pn.R = v;
            //G
            v = Math.round(Math.abs((p.B - p.G + p.B + p.R) * p.R / 256));
            if (v > 255) v = 255;
            if (v < 0) v = 0;
            pn.G = v;
            //B
            v = Math.round(Math.abs((p.B - p.G + p.B + p.R) * p.G / 256));
            if (v > 255) v = 255;
            if (v < 0) v = 0;
            pn.B = v;

            this.setPoint(x, y, pn);
        });
        return this;
    }
});