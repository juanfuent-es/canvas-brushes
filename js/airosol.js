import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.152.2/three.module.js'
import Aerosol from "./aerosol.js"

const PX_RATIO = Math.min(window.devicePixelRatio, 1)

export default class Airosol {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 )
        this.setRenderer()
        this.setMesh()
        this.events()
        this.animate()
    }
    
    events() {
        const onResizeHandler = debounce(() => this.resize(), 250)
        window.addEventListener('resize', onResizeHandler, false)
        this.resize()
    }

    setMesh() {
        this.aerosol = new Aerosol({
            radio: 35,
            amplitude: 3,
            died_steps: 25,
            total_psts: 3
        })
        // this.aerosol.container.appendChild(this.aerosol.canvas)
        //
        this.texture = new THREE.Texture(this.aerosol.canvas)
        this.material = new THREE.ShaderMaterial({
            vertexShader: document.getElementById( 'vertexShader' ).textContent,
		    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
            uniforms: {
                uTime: {
                    value: 1.0
                },
                uTexture: {
                    value: this.texture
                }
            }
        })
        this.geometry = new THREE.PlaneGeometry(2, 2)
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
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
        this.aerosol.onResize()
        this.aerosol.bg(this.aerosol.fillColor)
        this.renderer.setSize(this.width, this.height)
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.mesh.material.uniforms.uTime.value = new Date().getTime() * .1
        this.mesh.material.uniforms.uTexture.value.needsUpdate = true
        this.render()
    }

    render() {
        this.renderer.render(this.scene, this.camera)
        this.aerosol.render(this.aerosol.context)
    }

    get width() {
        return window.innerWidth
    }
    get height() {
        return window.innerHeight
    }
}