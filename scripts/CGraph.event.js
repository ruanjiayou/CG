/**
 * 
 */
import CGraph from './CGraph';

CGraph.extend({
    'addEvent': function (t, fn) {
        let obj = {}, that = this;
        if (typeof t === 'string' && typeof fn === 'function') {
            obj[t] = fn;
        } else {
            obj = t;
        }
        for (let k in obj) {
            this.mCanvas.addEventListener(k, function (e) {
                obj[k].call(that, e);
                window.event ? window.event.returnValue = false : e.preventDefault();
            }, false);
        }
        return this;
    }
});