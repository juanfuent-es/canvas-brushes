import Canvas from "../lib/canvas.js"
import Vector from "../math/vector.js"
import Mouse from "../lib/mouse.js"
import Psst from "./../fireworks/psst.js"
const THROTTLE = 20 //ms
const POINTER = new Mouse(THROTTLE)

export default class Aerosol extends Canvas {
    constructor(args = {}) {
        super()
        this.container.appendChild(this.canvas)
        // this.scale = 1
        // this.helper = new Canvas()
        // this.pixelated()
        this.radio = args.radio || 50
        this.amplitude = args.amplitude || 4
        this.died_steps = args.died_steps || 15
        this.gravity = new Vector(0, 0.1)
        //
        this.total_psts = args.total_psts || 10 // Yep, noise of aerosol
        this.pssts = []
        this.composite = "hard-light"
        this.mouseEvents()
        this.animate()
    }

    // onResize() {
    //     this.setSize()
    //     if (this.helper) {
    //         let _width = ~~(window.innerWidth * this.scale)
    //         let _height = ~~(window.innerHeight * this.scale)
    //         this.helper.setSize(_width, _height)
    //     }
    // }

    mouseEvents() {
        const mouseMove = throttle(() => this.pssssst(), THROTTLE)
        document.addEventListener('mousemove', mouseMove, false)
        document.addEventListener('touchmove', mouseMove, false)
        document.addEventListener('keypress', () => this.clear(), false)
        document.querySelector("#clean-btn").addEventListener('click', () => this.clear(), false)
    }

    pssssst() {
        if (!POINTER.pressed) return false
        for (let i = 0; i < this.total_psts; i++) {
            const pst = new Psst({
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
        // this.pixelize(this.helper.context)
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

    // pixelize(_ctx) {
    //     this.helper.clear()
    //     _ctx.drawImage(this.canvas, 0, 0, this.helper.width, this.helper.height)
    // }

    removePst(_pst) {
        const index = this.pssts.indexOf(_pst)
        this.pssts.splice(index, 1)
    }
}