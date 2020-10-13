import p5 from 'p5';
const rendering = (p: p5) => {
    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
    }

    p.draw = () => {
        p.fill(0);
        p.ellipse(p.mouseX, p.mouseY, 80, 80);
    }
}

new p5(rendering);