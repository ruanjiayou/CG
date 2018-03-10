/**
 * 作者: 阮家友
 * 时间: 2018-2-18 14:20:24
 */
import CGraph from './CGraph';

//TODO:
; (function (o) {
    o.extend({
        /**
         * 
         * @param {string} txt - 字符串
         * @param {object} t - CPoint或CRect
         */
        'drawText': function (txt, t) {
            if (t.width) {
                this.mGC.fillText(txt, t.x, t.y, t.width);
            } else {
                this.mGC.fillText(txt, t.x, t.y);
            }

            return this;
        }
    });
})(CGraph);