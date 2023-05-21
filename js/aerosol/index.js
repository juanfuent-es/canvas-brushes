import Canvas from "../lib/canvas.js"
import Vector from "../math/vector.js"
import Mouse from "../lib/mouse.js"
import Light from "./../fireworks/light.js"
const THROTTLE = 18 //ms
const POINTER = new Mouse(THROTTLE)

export default class Aerosol extends Canvas {
    constructor(args = {}) {
        super()
        //
        this.scale = .5
        this.helper = new Canvas()
        this.container.appendChild(this.helper.canvas)
        this.scaleHelper(this.scale)
        this.pixelated()

        this.radio = args.radio || 24
        this.amplitude = args.amplitude || 4
        this.died_steps = args.died_steps || 15
        this.gravity = new Vector(0, 0.1)
        //
        this.total_psts = args.total_psts || 10 // Yep, noise of aerosol
        this.pssts = []
        this.composite = "hard-light"
        this.events()
        this.animate()
    }

    events() {
        const mouseMove = throttle(() => this.pssssst(), THROTTLE)
        document.addEventListener('mousemove', mouseMove, false)
        document.addEventListener('touchmove', mouseMove, false)
        document.addEventListener('keypress', () => this.clear(), false)
        document.querySelector("#clean-btn").addEventListener('click', () => this.clear(), false)
    }

    pssssst() {
        if (!POINTER.pressed) return false
        for (let i = 0; i < this.total_psts; i++) {
            const pst = new Light({
                x: POINTER.pos.x,
                y: POINTER.pos.y,
                died_steps: this.died_steps,
                radio: Math.random() * this.radio,
                amplitude: Math.random() * this.amplitude
            })
            this.pssts.push(pst)
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render(this.context)
        this.pixelize(this.helper.context)
    }

    render(_ctx) {
        _ctx.save()
        for (let i = 0; i < this.pssts.length; i++) {
            const pst = this.pssts[i]
            if (pst.isLived) {
                pst.update(this.gravity)
                pst.draw(_ctx)
            } else this.removePst(pst)
            _ctx.globalCompositeOperation = this.composite
        }
        _ctx.restore()
    }

    scaleHelper(_scale = .1) {
        this.scale = _scale
        let _width = ~~(window.innerWidth * this.scale)
        let _height = ~~(window.innerHeight * this.scale)
        this.helper.onResize(_width, _height)
    }

    pixelize(_ctx) {
        this.helper.clear()
        _ctx.drawImage(this.canvas, 0, 0, this.helper.width, this.helper.height)
    }

    removePst(_pst) {
        const index = this.pssts.indexOf(_pst)
        this.pssts.splice(index, 1)
    }
}