const PX_RATIO = Math.min(window.devicePixelRatio, 2)
import Vector from "../math/vector.js"
export default class Mouse {
    constructor() {
        this.pos = new Vector(window.innerWidth / 2, window.innerHeight / 2)
        this.pressed = false
        this.addEvents()
    }

    addEvents() {
        const mouseMove = throttle(this.update.bind(this), 15)
        document.addEventListener('pointermove', mouseMove, false)
        document.addEventListener('pointerdown', () => {
            this.pressed = true
        }, false)
        document.addEventListener('pointerup', () => {
            this.pressed = false
        }, false)
    }

    onDown(callback) {
        document.addEventListener('mousedown', () => callback(this.pos), false)
        document.addEventListener('touchstart', () => callback(this.pos), false)
    }

    onUp(callback) {
        document.addEventListener('mouseup', () => callback(this.pos), false)
        document.addEventListener('touchend', () => callback(this.pos), false)
    }

    update(e) {
        if (e.touches) e = e.touches[0]
        this.pos.set(e.clientX * PX_RATIO, e.clientY * PX_RATIO)
    }

}