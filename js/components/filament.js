import Vector from "../math/vector.js";
import Vertex from "../components/vertex.js";

let SCREEN = {
    x: window.innerWidth * window.devicePixelRatio,
    y: window.innerHeight * window.devicePixelRatio
};

SCREEN.center = {
    x: SCREEN.x / 2,
    y: SCREEN.y / 2
};

export default class Filament {
    constructor(args) {
        if (args === undefined) args = {};
        this.movement = args.movement || (Math.random() * 0.1) + 0.4;
        this.size = args.vertex || 20;
        this.vertex = [];
        this.live = true;
        this.guide = null;
        this.lineWidth = args.movement * 1;
        this.hsl = 'hsl(360, 100%, 100%)';
        this.start(args.position);
    }

    start(pos) {
        for (let i = 0; i < this.size; i++)
            this.vertex.push(new Vertex(pos.x, pos.y));
    }

    update(prev, t) {
        this.guide = this.live ? prev : this.vertex[0];
        // this.guide = prev;
        let movement = this.movement;
        for (let i = 0; i < this.vertex.length; i++) {
            let vtx = this.vertex[i];
            vtx.integration(this.guide.pos, this.movement);
            vtx.vel.multBy(0.5);
            vtx.pos.addTo(vtx.vel);
            movement *= 0.99;
            this.guide = this.vertex[i];
        }
        this.hsl = this.updateHSL(t);
        // this.live -= 0.025;
    }

    updateHSL(t) {
        const hue = ~~Math.abs(Math.sin(this.lineWidth + t) * 360);
        const sat = ~~Math.abs(Math.cos(this.lineWidth - t) * 50) + 50;
        const light = ~~Math.abs(Math.sin(t) * 50) + 50;
        return `hsl(${hue}, ${sat}%, ${light}%)`;
    }

    render(ctx, t) {
        let a = this.vertex[0];
        let b = this.vertex[1];
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.lineWidth = this.lineWidth;
        ctx.moveTo(a.pos.x, a.pos.y);
        for (var i = 1; i < this.vertex.length - 2; i++) {
            a = this.vertex[i];
            b = this.vertex[i + 1];
            const endPoint = a.quadTo(b);
            ctx.quadraticCurveTo(a.pos.x, a.pos.y, endPoint.x, endPoint.y);
        }
        a = b;
        b = this.vertex[this.vertex.length - 1];
        ctx.quadraticCurveTo(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
        ctx.strokeStyle = this.hsl;
        ctx.stroke();
        ctx.restore();
    }

    die() {
        this.live = false;
    }

    isLive() {
        return this.live;
    }
}