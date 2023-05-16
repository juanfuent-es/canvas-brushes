export default class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(val) {
		this.x += val;
		this.y += val;
	}

	addTo(v2) {
		this.x += v2.x;
		this.y += v2.y;
	}

	multBy(f) {
		this.x *= f;
		this.y *= f;
	}

	set(x, y) {
		this.x = x || this.x;
		this.y = y || this.y;
	}

}