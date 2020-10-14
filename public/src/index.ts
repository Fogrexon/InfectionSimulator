/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
import p5 from 'p5';
import Circles from './drawPeople';
import Simulation, { getInfected } from './infection';

const rendering = (p: typeof p5) => {
  let list: number[][];
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    list = getInfected(100, 100);
  };

  p.draw = () => {
    Simulation(list);
    Circles(p, list);
  };
};

// eslint-disable-next-line new-cap
new p5(rendering);
