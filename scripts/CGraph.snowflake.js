/**
 * 作者: 阮家友
 * 时间: 2018-2-18 15:36:18
 */
import CGraph from './CGraph';

; (function (o) {
    o.extend({
        'snowflake': function () {
            this.setFillStyle = '#fff';
            this.mGC.fillRect(0, 0, this.mWidth, this.mHeight);
            this.mGC.fill();
            let flicks = function () {
                this.mData = this.mGC.getImageData(0, 0, this.mWidth, this.mHeight);
                this.each(function (x, y) {
                    var v = (Math.random() * 255) + 50;
                    this.setPoint(x, y, { R: v, G: v, B: v });
                }).render();
            };
            this.run(flicks);
        }
    });
})(CGraph);