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

export default class Thread {
    constructor(args) {
        if (args === undefined) args = {};
        this.spring = args.spring || (Math.random() * 0.1) + 0.4;
        this.size = args.size || 50;
        this.vertex = [];
        this.lineWidth = Math.random()*window.devicePixelRatio;
        this.hsl = 'hsl(360, 100%, 100%)';
        this.setVertices();
    }

    setVertices() {
        for (let i = 0; i < this.size; i++)
            this.vertex.push(new Vertex(SCREEN.center.x, SCREEN.center.y));
    }

    update(prev) {
        let spring = this.spring;
        for (let i = 0; i < this.vertex.length; i++) {
            let vtx = this.vertex[i];
            vtx.integration(prev.pos, this.spring);
            vtx.vel.multBy(0.5);
            vtx.pos.addTo(vtx.vel);
            spring *= 0.99;
            prev = this.vertex[i];
        }
    }

    HSL(t) {
        const hue = ~~Math.abs(Math.sin(t + this.lineWidth) * 260) + 100;
        const sat = ~~Math.abs(Math.cos(t - this.lineWidth) * 50) + 50;
        const light = ~~Math.abs(Math.sin(t) * 50) + 50;
        return `hsl(${hue}, ${sat}%, ${light}%)`;
    }

    render(ctx, t) {
        let a = this.vertex[0];
        let b = this.vertex[1];
        ctx.save();
        ctx.beginPath();
        // ctx.setLineDash([1, 2]);
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
        ctx.strokeStyle = this.HSL(t);
        ctx.stroke();
        ctx.restore();
    }
}