import Vector from "../math/vector.js";

export default class Vertex {
	constructor(x, y) {
		this.pos = new Vector(x, y);
		this.accel = new Vector(Math.random() - 0.5, Math.random() - 0.5);
		this.vel = new Vector(0, 0);
	}

	integration(v2, force) {
        this.vel.x += (v2.x - this.pos.x) * force;
        this.vel.y += (v2.y - this.pos.y) * force;
	}

	quadTo(v2) {
		return {
			x: (this.pos.x + v2.pos.x) / 2,
			y: (this.pos.y + v2.pos.y) / 2
		}
	}
}