/**
 * 点对象
 */
function CPoint(x, y) {
    if (arguments.length === 2) {
        this.x = x;
        this.y = y;
    } else {
        this.x = 0;
        this.y = 0;
    }
}