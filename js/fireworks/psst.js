import Vector from "../math/vector.js"
const PI_2 = Math.PI * 2
const COLORS = ["#95F8E8", "#FCA2CF", "#8979F2", "#FAC4B2", "#94CEF2"]
export default class Light {
    constructor(args = {}) {
        this.x = args.x || innerWidth / 2
        this.y = args.y || innerHeight / 2
        this.died_steps = args.died_steps || 10
        this.radio = args.radio || Math.random()
        this.diameter = this.radio * 2
        this.amplitude = args.amplitude || 5
        this.half_amp = this.amplitude / 2
        this.alpha = Math.abs(Math.cos(new Date().getTime() * .0001 + this.radio)*.45)
        //
        this.fillStyle = COLORS[~~(Math.random() * COLORS.length)]
        this.amp = Math.random() * this.amplitude
        // forces
        this.pos = new Vector(this.x, this.y)
        this.acc = new Vector(Math.random() * this.amp - this.half_amp, -Math.random() * (this.amp*3)) // aerosol
        // this.acc = new Vector(Math.random() * this.amp - (this.amp / 2), -Math.random() * this.amp) // fireworks
        this.vel = new Vector(0, 0)
    }

    update(_gravity) {
        this.acc.addTo(_gravity)
        this.vel.addTo(this.acc)
        this.pos.addTo(this.vel)
        this.acc.multBy(0)
        //
        this.radio -= (this.radio / this.died_steps)
        this.alpha -= (this.alpha / this.died_steps)
    }
    
    draw(_ctx) {
        _ctx.save()
        _ctx.globalAlpha = this.alpha
        _ctx.beginPath()
        _ctx.arc(this.pos.x, this.pos.y, this.radio, 0, PI_2)
        _ctx.closePath()
        _ctx.fillStyle = this.fillStyle
        _ctx.fill()
        _ctx.restore()
    }

    get isLived() {
        return this.radio > 0.1
    }
}