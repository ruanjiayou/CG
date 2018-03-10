/**
 * 作者: 阮家友
 * 时间: 2018-2-27 20:35:14
 * 描述: 处理粒子的粒子系统
 */
class CParticleSystem {
    constructor() {
        this.dt = 0.01;
        this.particles = [];
        // 自定义事件集合
        this.events = [];
    }

    /**
     * 为所有粒子添加事件
     */
    static extend() {
        let json;
        if (arguments.length === 2) {
            json[arguments[0]] = arguments[1];
        }
        else {
            json = arguments[0];
        }
        for (var k in json) {
            this.prototype[k] = json[k];
        }
    }
    each(fn) {
        for (let i = 0, len = this.particles.length; i < len; i++) {
            fn.call(this, this.particles[i]);
        }
    }
}

module.exports = CParticleSystem;