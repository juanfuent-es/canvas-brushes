import Vector from "../math/vector.js"
const PI_2 = Math.PI * 2

export default class Light {
    constructor(args = {}) {
        this.x = args.x || innerWidth / 2
        this.y = args.y || innerHeight / 2
        this.died_steps = args.died_steps || 10
        this.radio = args.radio || Math.random()
        this.amplitude = args.amplitude || 5
        this.half_amp = this.amplitude / 2
        //
        this.setColors()
        this.amp = Math.random() * this.amplitude
        // forces
        this.pos = new Vector(this.x, this.y)
        this.acc = new Vector(Math.random() * this.amp - this.half_amp, -Math.random() * 3.5) // aerosol
        // this.acc = new Vector(Math.random() * this.amp - (this.amp / 2), -Math.random() * this.amp) // fireworks
        this.vel = new Vector(0, 0)
    }

    setColors() {
        this.r = 255
        this.g = 255
        this.b = 0
        this.alpha = Math.random() * .35
        const random = Math.random()
        if (random > .66) {
            this.r = this.channel()
            this.g = 0
            this.b = this.channel()
        } else if (random > .33) {
            this.g = this.channel()
            this.b = this.channel()
        } else {
            this.g = this.channel()
        }
    }

    channel() {
        return ~~(Math.random() * 255)
    }

    update(_gravity) {
        this.acc.addTo(_gravity)
        this.vel.addTo(this.acc)
        this.pos.addTo(this.vel)
        this.acc.multBy(0)
        //
        this.radio -= (this.radio / this.died_steps)
        this.alpha -= (this.alpha / this.died_steps)
        // this.radio -= .035
    }

    draw(_ctx) {
        _ctx.save()
        _ctx.beginPath()
        _ctx.arc(this.pos.x, this.pos.y, this.radio, 0, PI_2)
        _ctx.closePath()
        _ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.alpha})`
        _ctx.fill()
        _ctx.restore()
    }

    get isLived() {
        return this.radio > 0.1
    }
}