import Thread from "./components/thread.js";
import Canvas from "./lib/canvas.js";
import Mouse from "./lib/mouse.js";

class LightBrush extends Canvas {
    constructor(args) {
        if (args === undefined) args = {};
        super();
        this.mouse = new Mouse();
        this.bg = 'rgba(0,0,0,0.3)';
        this.threads = [];
        this.totalThreads = args.threads || 20;
        this.setup();
        this.background("black");
        this.animate();
    }

    setup() {
        this.threads = [];
        for (var i = 0; i < this.totalThreads; i++) {
            const _ringle = new Thread({
                spring: (Math.sin(i*3) * 0.1) + 0.4
            });
            this.threads.push(_ringle);
        }
    }

    animate() {
        const time = new Date().getTime() / 1000;
        requestAnimationFrame(this.animate.bind(this));
        this.render(this.context, time);
    }

    render(ctx, time) {
        this.background(this.bg);
        for (var i = 0; i < this.threads.length; i++) {
            const thread = this.threads[i];
            thread.update(this.mouse);
            thread.render(ctx, time);
        }
    }
}

const brush = new LightBrush({
    threads: 5
});