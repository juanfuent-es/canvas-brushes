import Vector from "../math/vector.js";
const pxRatio = window.devicePixelRatio;
export default class Mouse {
    constructor() {
        this.pos = new Vector(window.innerWidth / 2, window.innerHeight / 2);
        this.addEvents();
    }

    addEvents() {
        const mouseMove = throttle(this.update.bind(this), 80);
        document.addEventListener('mousemove', mouseMove, false);
        document.addEventListener('touchmove', mouseMove, false);
    }

    onDown(callback) {
        document.addEventListener('mousedown', () => callback(this.pos), false);
        document.addEventListener('touchstart', () => callback(this.pos), false);
    }

    onUp(callback) {
        document.addEventListener('mouseup', () => callback(this.pos), false);
        document.addEventListener('touchend', () => callback(this.pos), false);
    }

    update(e) {
        if (e.touches) e = e.touches[0];
        this.pos.set(e.clientX * pxRatio, e.clientY * pxRatio);
    }

}