/**
 * 作者: 阮家友
 * 时间: 2018-2-18 14:20:24
 */
function CLabel() {
    this.text = '';
    this.rangle;
    this.align = 'left';
    this.style;
}
//TODO:
; (function (o) {
    o.extend({
        'drawText': function (label) {
            let oldstyle = null;
            if (label.style) {
                oldstyle = this.setStrokeStyle(label.style);
            }
            this.mGC.fillText(label.text);
            if (oldstyle) {
                this.setStrokeStyle(oldstyle);
            }
            return this;
        }
    });
})(CGraph);