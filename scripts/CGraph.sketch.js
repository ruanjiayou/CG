/**
 * 作者: 阮家友
 * 时间: 2018-2-17 21:50:22
 * 描述: 公式：基色+（基色×混合色）/（255-混合色）=结果色
 */
import CGraph from './CGraph';

; (function (o) {
    o.extend({
        'sketch': function (r) {
            let basedata = this.mData.data;
            this.mData = this.mGC.getImageData(0, 0, this.mWidth, this.mHeight);
            this.reverse().gauss(r);
            let mixdata = this.mData.data;
            // 颜色减淡混合 
            for (let i = 0; i < basedata.length; i++) {
                let a = basedata[i];
                let b = mixdata[i];
                let temp = a + a * b / (255 - b);
                this.mData.data[i] = this.limit(temp);
            }
            return this;
        }
    });
})(CGraph);