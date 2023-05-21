const PX_RATIO = Math.min(window.devicePixelRatio, 2)
export default class Canvas {
    constructor(containerId) {
        if (containerId === undefined) this.container = document.body
        else this.container = document.querySelector(containerId)
        this.canvas = document.createElement("canvas")
        this.context = this.canvas.getContext("2d")
        //
        const onResizeHandler = debounce(this.onResize.bind(this), 250)
        window.addEventListener('resize', onResizeHandler, false)
        this.onResize()
    }

    pixelated() {
        this.context.webkitImageSmoothingEnabled = false
        this.context.mozImageSmoothingEnabled = false
        this.context.msImageSmoothingEnabled = false
        this.context.imageSmoothingEnabled = false
    }

    onResize(_width = innerWidth, _height = innerHeight) {
        [this.width, this.height] = [_width, _height]
        this.canvas.width = this.width * PX_RATIO
        this.canvas.height = this.height * PX_RATIO
        this.center = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    stroke(_color = "#000") {
        this.context.strokeStyle = _color
        this.context.stroke()
    }

    fill(_color = "#FFF") {
        this.context.fillStyle = _color
        this.context.fill()
    }

    background(_fill = "#000") {
        this.context.fillStyle = _fill
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    bg(_fill) {
        this.background(_fill)
    }
}