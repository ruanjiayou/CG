
function CGraph(selector) {
    var w = window.innerWidth, h = window.innerHeight;
    this.dom = document.createElement('canvas');
    this.dom.width = w;
    this.dom.height = h;
    $(selector).append(this.dom);
    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ canvas: this.dom });
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0xffffff, 1.0);
    // 相机
    this.camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 200;
    this.camera.up.x = 0;
    this.camera.up.y = 1;
    this.camera.up.z = 0;
    this.camera.lookAt({
        x: 0,
        y: 0,
        z: 0
    });
    // 场景
    this.scene = new THREE.Scene();

    return this;
}
CGraph.prototype = {
    run: function (o) {
        let that = this;
        function inner() {
            requestAnimationFrame(inner);
            that.renderer.render(that.scene, that.camera);
        }
        inner();
    },
    add: function (o) {
        this.scene.add(o);
        return this;
    },
    window2canvas(x, y) {
        let rect = this.dom.getBoundingClientRect();
        return {
            x: x - rect.left * (this.dom.width / rect.width),
            y: y - rect.top * (this.dom.height / rect.height)
        };
    },
    addEvent: function (t, fn) {
        let obj = {}, that = this;
        if (typeof t === 'string' && typeof fn === 'function') {
            obj[t] = fn;
        } else {
            obj = t;
        }
        for (let k in obj) {
            this.dom.addEventListener(k, function (e) {
                obj[k].call(that, e);
                window.event ? window.event.returnValue = false : e.preventDefault();
            }, false);
        }
        return this;
    }
};