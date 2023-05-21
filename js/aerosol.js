import Canvas from "./lib/canvas.js"
import Vector from "./math/vector.js"
import Mouse from "./lib/mouse.js"
import Psst from "./fireworks/psst.js"
const THROTTLE = 20 //ms
const POINTER = new Mouse(THROTTLE)
const COLORS = ["#95F8E8", "#FCA2CF", "#8979F2", "#FAC4B2", "#94CEF2"]
export default class Aerosol extends Canvas {
    constructor(args = {}) {
        super()
        this.fillColor = COLORS[~~(Math.random() * COLORS.length)]
        this.radio = args.radio || 50
        this.amplitude = args.amplitude || 4
        this.died_steps = args.died_steps || 15
        this.gravity = new Vector(0, 0.1)
        //
        this.total_psts = args.total_psts || 10 // Yep, noise of aerosol
        this.pssts = []
        this.composite = "source-atop" //hard-light, soft-light
        this.events()
    }
    
    events() {
        const mouseMove = throttle(() => this.pssssst(), THROTTLE)
        document.addEventListener('mousemove', mouseMove, false)
        document.addEventListener('touchmove', mouseMove, false)
        // clean
        document.addEventListener('keypress', () => this.bg(this.fillColor), false)
        document.querySelector("#clean-btn").addEventListener('click', () => this.bg(this.fillColor), false)
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

    removePst(_pst) {
        const index = this.pssts.indexOf(_pst)
        this.pssts.splice(index, 1)
    }
}