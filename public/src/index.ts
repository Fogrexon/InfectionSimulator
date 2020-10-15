/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
import p5 from 'p5';
import Circles from './drawPeople';
import Simulation, { getInfected } from './infection';

let column = 100, row = 100;

let prevStat = {
  s: row * column,
  i: 0,
  r: 0,
};
let stat = {
  s: row * column,
  i: 0,
  r: 0,
};
let index = 0;

const rendering = (p: typeof p5) => {
  let list: number[][];
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    list = getInfected(row, column);
  };

  p.draw = () => {
    stat = Simulation(list);
    Circles(p, list);
  };
};

const renderGraph = (p: typeof p5) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = () => {
    index += 2;
    p.strokeWeight(5);
    p.stroke(0,0,255);
    p.line(index - 2, (1 - prevStat.s / row / column) * p.height,
      index, (1 - stat.s / row / column) * p.height,
    );
    p.stroke(255,0,0);
    p.line(index - 2, (1 - prevStat.i / row / column) * p.height,
      index, (1 - stat.i / row / column) * p.height,
    );
    p.stroke(0,255,0);
    p.line(index - 2, (1 - prevStat.r / row / column) * p.height,
      index, (1 - stat.r / row / column) * p.height,
    );
    prevStat = stat;
  };
};

// eslint-disable-next-line new-cap
new p5(rendering);
// eslint-disable-next-line new-cap
new p5(renderGraph);
