/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
import p5 from 'p5';
import Circles from './drawPeople';

const rendering = (p: typeof p5) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = () => {
    Circles(p, [[0, 0, 0, 0, 0], [0, 0.5, 0.5, 0.5, 0], [0, 1, 1, 1, 1]]);
  };
};

// eslint-disable-next-line new-cap
new p5(rendering);
