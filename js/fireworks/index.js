import Canvas from "../lib/canvas.js"
import Vector from "../math/vector.js"
import Mouse from "../lib/mouse.js"
import Light from "./light.js"
const POINTER = new Mouse()
export default class Fireworks extends Canvas {
    constructor(_lights = 3) {
        super()
        this.air = 0
        this.gravity = .1
        this.radio = 3
        this.amplitude = 10
        //
        this.update()
        //
        this.total_lights = _lights
        this.lights = []
        this.events()
        this.animate()
    }

    update() {
        this.force = new Vector(this.air, this.gravity)
    }

    events() {
        const mouseMove = throttle(() => this.fire(), 15)
        document.addEventListener('pointermove', mouseMove, false)
        document.addEventListener('keypress', () => this.clear(), false)
        document.querySelector("#clean-btn").addEventListener('click', () => this.clear(), false)
    }

    fire() {
        if (!POINTER.pressed) return false
        for (let i = 0; i < this.total_lights; i++) {
            const light = new Light({
                x: POINTER.pos.x,
                y: POINTER.pos.y,
                radio: Math.random() * this.radio,
                amplitude: Math.random() * this.amplitude
            })
            this.lights.push(light)
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render()
    }

    render() {
        for (let i = 0; i < this.lights.length; i++) {
            const light = this.lights[i]
            if (light.isLived) {
                light.update(this.force)
                light.draw(this.context)
            } else this.removeLight(light)
        }
    }

    removeLight(_light) {
        const index = this.lights.indexOf(_light)
        this.lights.splice(index, 1)
    }
}