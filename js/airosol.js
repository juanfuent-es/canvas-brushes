import Aerosol from "./aerosol.js"
const PX_RATIO = Math.min(window.devicePixelRatio, 1)

export default class Airosol {
    constructor() {
        this.aerosol = new Aerosol({
            radio: 35,
            amplitude: .42,
            died_steps: 25,
            total_psts: 3
        })
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(10, this.aspectRatio, 10, 10000)
        this.camera.position.z = 100
        this.setRenderer()
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        document.body.appendChild(this.renderer.domElement)
        this.renderer.setPixelRatio(PX_RATIO)
    }

    resize() {
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.aspectRatio
        this.camera.fov = this.fov
        this.camera.updateProjectionMatrix()
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render()
    }

    render() {
        this.aerosol.render(this.aerosol.context)
    }
    // getters
    get fov() {
        return 2 * Math.atan(this.width / this.aspectRatio / (2 * this.camera.position.z)) * (180 / Math.PI)
    }
    get aspectRatio() {
        return this.width / this.height
    }
    get width() {
        return window.innerWidth
    }
    get height() {
        return window.innerHeight
    }
}