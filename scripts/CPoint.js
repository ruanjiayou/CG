/**
 * 点对象
 */
class CPoint {
    constructor(x, y) {
        if (arguments.length === 2) {
            this.x = x;
            this.y = y;
        } else {
            this.x = 0;
            this.y = 0;
        }
    }
    // 克隆
    copy(p) {
        if (p) {
            this.x = p.x;
            this.y = p.y;
            return this;
        } else {
            return new CPoint(this.x, this.y);
        }
    }
    // 到原点的距离
    d() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    // 加法
    add({ x, y }) {
        this.x += x;
        this.y += y;
        return this;
    }
    // 减法
    substract({ x, y }) {
        this.x -= x;
        this.y -= y;
        return this;
    }
    // 乘法
    multiply(v) {
        this.x *= v;
        this.y *= v;
        return this;
    }
    // 除法
    divide(v) {
        if (v === 0) {
            v = 1;
        }
        this.x /= v;
        this.y /= v;
        return this;
    }
    // 点乘
    dot({ x, y }) {
        return this.x * x + this.y * y;
    }
    // 叉乘
    // cross: function({ x, y }) {
    //     return 
    // }
}

module.exports = CPoint;