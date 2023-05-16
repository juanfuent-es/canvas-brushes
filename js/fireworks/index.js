import Canvas from "../lib/canvas.js";
import Vector from "../math/vector.js"
import Light from "./light.js"
const GRAVITY = new Vector(0, .15)
export default class Fireworks extends Canvas {
    constructor(_lights = 10) {
        super()
        this.lights = []
        this.setup(_lights)
        this.animate()
    }

    setup(total_lights) {
        for (let i = 0; i < total_lights; i++) {
            const light = new Light()
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
            } else {

            }
        }
    }
}