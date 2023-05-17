import Canvas from "../lib/canvas.js"
import Vector from "../math/vector.js"
import Mouse from "../lib/mouse.js"
import Light from "./light.js"
const GRAVITY = new Vector(0, .15)
const POINTER = new Mouse();
export default class Fireworks extends Canvas {
    constructor(_lights = 3) {
        super()
        this.total_lights = _lights
        this.lights = []
        this.events()
        this.animate()
    }

    events() {
        const mouseMove = throttle(() => this.fire(), 80)
        document.addEventListener('pointermove', mouseMove, false)
    }

    fire() {
        if (!POINTER.pressed) return false
        for (let i = 0; i < this.total_lights; i++) {
            const light = new Light(POINTER.pos.x, POINTER.pos.y)
            this.lights.push(light)
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render()
    }

    render() {
        this.background("rgba(0,0,0,0.1)")
        for (let i = 0; i < this.lights.length; i++) {
            const light = this.lights[i]
            if (light.isLived) {
                light.update(GRAVITY)
                light.draw(this.context)
            } else this.removeLight(light)
        }
    }

    removeLight(_light) {
        const index = this.lights.indexOf(_light)
        this.lights.splice(index, 1)
    }
}