export default class Canvas {
    constructor(containerId) {
        if (containerId === undefined) this.container = document.body;
        else this.container = window[containerId];
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.container.appendChild(this.canvas);
        //
        const onResizeHandler = debounce(this.onResize.bind(this), 250);
        window.addEventListener('resize', onResizeHandler, false);
        this.onResize();
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pxRatio = window.devicePixelRatio;
        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";
        this.canvas.width = this.width * this.pxRatio;
        this.canvas.height = this.height * this.pxRatio;
        this.center = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stroke(_color) {
        this.context.strokeStyle = _color;
        this.context.stroke();
    }

    fill(_color) {
        this.context.fillStyle = _color;
        this.context.fill();
    }

    background(_fill) {
        this.context.fillStyle = _fill;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}