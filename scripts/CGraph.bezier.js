/**
 * 作者: 阮家友
 * 时间: 2018-2-18 12:29:07
 */
; (function (o) {
    /**
     * 给定两点和两控制点生成一段贝塞尔曲线点
     * @param {object} startPoint - 起点
     * @param {object} c1 - 控制点1
     * @param {object} c2 - 控制点2
     * @param {object} endPoint - 终点
     * @returns {array} 点数组
     */
    function getBezierCurve(startPoint, c1, c2, endPoint) {
        //方程系数
        var XC = 3 * (c1.x - startPoint.x),
            XB = 3 * (c2.x - c1.x) - XC,
            XA = endPoint.x - startPoint.x - XC - XB,
            YC = 3 * (c1.y - startPoint.y),
            YB = 3 * (c2.y - c1.y) - YC,
            YA = endPoint.y - startPoint.y - YC - YB;
        //曲线点的数量
        var number = 100,
            i = 0,
            dt = 1 / (number - 1),
            dt1,
            dt2,
            dt3,
            temp,
            points = [];

        for (; i < number; i++) {
            dt1 = dt * i;
            dt2 = dt1 * dt1;
            dt3 = dt2 * dt1;
            temp = new Object();
            temp.x = XA * dt3 + XB * dt2 + XC * dt1 + startPoint.x;
            temp.y = YA * dt3 + YB * dt2 + YC * dt1 + startPoint.y;
            points.push(temp);
        }
        return points;
    }
    o.extend({
        /**
         * 点是否在点数组围成的多边形内
         */
        'isInPolygon': function (p, area) {
            var i = 0, j = area.length - 1, len = area.length, oddNodes = false;
            for (; i < len; i++) {
                if ((area[i].y < p.y && area[j].y >= p.y) || (area[j].y < p.y && area[i].y >= p.y)) {
                    if (area[i].x + (p.y - area[i].y) / (area[j].y - area[i].y) * (area[j].x - area[i].x) < p.x) oddNodes = !oddNodes;
                }
                j = i;
            }
            return oddNodes;
        },
        /**
         * 获取散点数组组成的闭合贝塞尔曲线点
         */
        'getBezierPoints': function (ps) {
            var i = 1,
                MidPoints = [],//中点
                VectorMid = [],//中点连线向量
                len = ps.length,
                scale = 0.6,
                BezierPoints = [];
            if (len < 3) return [];
            //中点坐标数组
            MidPoints.push({ x: (ps[0][0] + ps[len - 1][0]) / 2, y: (ps[0][1] + ps[len - 1][1]) / 2 });
            for (i = 1; i < len; i++) {
                MidPoints.push({ x: (ps[i][0] + ps[i - 1][0]) / 2, y: (ps[i][1] + ps[i - 1][1]) / 2 });
                //中点向量数组
                VectorMid.push({ x: (MidPoints[i].x - MidPoints[i - 1].x) * scale, y: (MidPoints[i].y - MidPoints[i - 1].y) * scale });
            }
            VectorMid.push({ x: (MidPoints[0].x - MidPoints[len - 1].x) * scale, y: (MidPoints[0].y - MidPoints[len - 1].y) * scale });
            //贝塞尔曲线
            for (i = 1; i <= len; i++) {
                BezierPoints = BezierPoints.concat(getBezierCurve({ x: ps[i - 1][0], y: ps[i - 1][1] }, { x: ps[i - 1][0] + VectorMid[i - 1].x, y: ps[i - 1][1] + VectorMid[i - 1].y }, { x: ps[i % len][0] - VectorMid[i % len].x, y: ps[i % len][1] - VectorMid[i % len].y }, { x: ps[i % len][0], y: ps[i % len][1] }));
            }
            return BezierPoints;
        },
        'drawBezier': function (area) {
            area = this.getBezierPoints(area);
            var i = 1, len = area.length;
            if (len < 3) return;
            this.mGC.beginPath();
            this.mGC.moveTo(area[0].x, area[0].y);
            for (; i < area.length; i++) this.mGC.lineTo(area[i].x, area[i].y);
            this.mGC.lineTo(area[0].x, area[0].y);
            this.mGC.closePath();
            //this.mGC.stroke();
            this.mGC.fill();
            return this;
        }
    });
})(CGraph);