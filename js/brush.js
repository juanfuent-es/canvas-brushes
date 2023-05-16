import Filament from "./components/filament.js";
import Canvas from "./lib/canvas.js";
import Mouse from "./lib/mouse.js";
const TAU = Math.PI * 2;
class LightBrush extends Canvas {
    constructor(args) {
        if (args === undefined) args = {};
        super();
        this.mouse = new Mouse();
        this.alpha = args.alpha || 0.1;
        
        this.bulb = [];
        this.vertex = args.vertex || 10;
        this.light = [];
        this.smooth = args.smooth || 500;
        this.filaments = args.filaments || 20;
        this.current = null;
        this.movement = args.movement || 0.1;
        
        this.guides = false;
        this.reset();
        this.events();
        this.animate();
    }

    events() {
        window["clear-stage"].addEventListener("click", this.reset.bind(this), false);
        this.mouse.onDown((pos) => {
            for (var i = 0; i < this.filaments; i++) {
                const _filament = new Filament({
                    movement: (Math.sin(i*3) * 0.1) + this.movement,
                    // movement: i * this.movement,
                    position: pos,
                    vertex: this.vertex
                });
                this.light.push(_filament);
            }
            this.bulb.push(this.light);
        });
        // 
        this.mouse.onUp((pos) => {
            for (var i = 0; i < this.light.length; i++) {
                this.light[i].die();
            }
            this.light = [];
        });
    }

    reset() {
        this.background("#000");
        this.bulb = [];
        this.light = [];
    }

    animate() {
        const time = new Date().getTime() / this.smooth;
        requestAnimationFrame(this.animate.bind(this));
        this.render(this.context, time);
    }

    get bg() {
        return 'rgba(0,0,0,'+this.alpha+')';
    }

    render(ctx, time) {
        this.background(this.bg);
        for (var i = 0; i < this.bulb.length; i++) {
            let light = this.bulb[i];
            for (var j = 0; j < light.length; j++) {
                const filament = light[j];
                filament.update(this.mouse, time);
                filament.render(ctx, time);
                if (this.guides) this.filamentGuide(filament);
            }
        }
    }

    filamentGuide(filament) {
        this.context.save();
        this.context.lineWidth = 0.5;
        for (var i = 0; i < filament.vertex.length; i++) {
            let vtx = filament.vertex[i];
            this.context.beginPath();
            this.context.arc(vtx.pos.x, vtx.pos.y, 1, 0, TAU, false);
            this.fill("#FFF");
        }
        this.context.restore();
    }
}

const path = new LightBrush({
    filaments: 10,
    alpha: 0.005,
    movement: 0.3
});

const gui = new dat.GUI();
gui.add(path, 'guides');
gui.add(path, 'alpha', 0.0001, 0.1);
gui.add(path, 'smooth', 100, 10000).step(500).onChange(path.reset.bind(path));
gui.add(path, 'vertex', 5, 30).step(1).onChange(path.reset.bind(path));
gui.add(path, 'movement', 0.1, 0.4).step(0.05).onChange(path.reset.bind(path));
gui.add(path, 'filaments', 1, 30).step(1).onChange(path.reset.bind(path));