import Canvas from "../lib/canvas.js"
import Vector from "../math/vector.js"
import Mouse from "../lib/mouse.js"
import Light from "./../fireworks/light.js"
const THROTTLE = 15 //ms
const POINTER = new Mouse(THROTTLE)

export default class Aerosol extends Canvas {
    constructor(_lights = 3) {
        super()
        this.gravity = .1
        this.radio = 12
        this.amplitude = 4
        this.died_steps = 15
        //
        this.update()
        //
        this.total_lights = _lights
        this.lights = []
        this.events()
        this.animate()
    }

    update() {
        this.force = new Vector(0, this.gravity)
    }

    events() {
        const mouseMove = throttle(() => this.fire(), THROTTLE)
        document.addEventListener('mousemove', mouseMove, false)
        document.addEventListener('touchmove', mouseMove, false)
        document.addEventListener('keypress', () => this.clear(), false)
        document.querySelector("#clean-btn").addEventListener('click', () => this.clear(), false)
    }

    fire() {
        if (!POINTER.pressed) return false
        for (let i = 0; i < this.total_lights; i++) {
            const light = new Light({
                x: POINTER.pos.x,
                y: POINTER.pos.y,
                died_steps: this.died_steps,
                radio: Math.random() * this.radio,
                amplitude: Math.random() * this.amplitude
            })
            this.lights.push(light)
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render(this.context)
    }

    render(_ctx) {
        _ctx.save()
        for (let i = 0; i < this.lights.length; i++) {
            const light = this.lights[i]
            if (light.isLived) {
                light.update(this.force)
                light.draw(_ctx)
                // _ctx.globalCompositeOperation = "lighter"
            } else this.removeLight(light)
        }
        _ctx.restore()
    }

    removeLight(_light) {
        const index = this.lights.indexOf(_light)
        this.lights.splice(index, 1)
    }
}