import Vector from "../math/vector.js"
const PI_2 = Math.PI * 2

export default class Light {
    constructor(_x = innerWidth / 2, _y = innerHeight / 2) {
        this.radio = Math.random() + 3
        this.amp = Math.random() * 10
        this.fillStyle = `rgb(255, ${this.channel()},0)`
        this.pos = new Vector(_x, _y)
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
        this.radio -= .05
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