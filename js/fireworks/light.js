import Vector from "../math/vector.js"
const PI_2 = Math.PI * 2

export default class Light {
    constructor(_x = innerWidth / 2, _y = 100) {
        this.radio = Math.random() * 5
        this.pos = new Vector(_x, _y)
        this.vel = new Vector(Math.random() * 10 - 5, Math.random() * 10 - 5)
        this.acc = new Vector(Math.random() - .5, Math.random())
    }

    update(_gravity) {
        this.acc.addTo(_gravity)
        this.vel.addTo(this.acc)
        this.pos.addTo(this.vel)
        this.acc.multBy(0)
    }
      
    draw(_ctx) {
        _ctx.save()
        _ctx.beginPath()
        _ctx.arc(this.pos.x, this.pos.y, this.radio, 0, PI_2)
        _ctx.closePath()
        _ctx.fillStyle = "#FFF"
        _ctx.fill()
        _ctx.restore()
    }
}