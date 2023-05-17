import Vector from "../math/vector.js"
const PI_2 = Math.PI * 2

export default class Light {
    constructor(args = {}) {
        this.x = args.x || innerWidth / 2
        this.y = args.y || innerHeight / 2
        this.radio = args.radio || Math.random()
        this.amplitude = args.amplitude || 5
        //
        this.fillStyle = `rgba(255, 0, ${this.channel()},${Math.random() * .5})`
        this.amp = Math.random() * this.amplitude
        // forces
        this.pos = new Vector(this.x, this.y)
        this.acc = new Vector(Math.random() * this.amp - (this.amp/2), - Math.random() * this.amp)
        this.vel = new Vector(0, 0)
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
        this.radio -= .035
    }

    draw(_ctx) {
        _ctx.save()
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