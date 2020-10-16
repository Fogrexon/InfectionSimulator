/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
import p5 from 'p5';
import Circles from './drawPeople';
import { initialize, move } from './simulation';
import { HumanStatus, Stat } from './types';

const num = 2000;

let prevStat: Stat = {
  s: num,
  i: 0,
  r: 0,
};
let stat: Stat = {
  s: num,
  i: 0,
  r: 0,
};
let index = 0;
const deltaIndex = 0.5;

const rendering = (p: typeof p5) => {
  let list: HumanStatus[];
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    list = initialize(p, num);
    list[0].state = 0.5;
  };

  p.draw = () => {
    p.clear();
    stat = move(p, list);
    Circles(p, list);
  };
};

const renderGraph = (p: typeof p5) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = () => {
    index += deltaIndex;
    p.strokeWeight(5);
    p.stroke(0, 0, 255);
    p.line(index - deltaIndex, (1 - prevStat.s / num) * p.height,
      index, (1 - stat.s / num) * p.height);
    p.stroke(255, 0, 0);
    p.line(index - deltaIndex, (1 - prevStat.i / num) * p.height,
      index, (1 - stat.i / num) * p.height);
    p.stroke(0, 255, 0);
    p.line(index - deltaIndex, (1 - prevStat.r / num) * p.height,
      index, (1 - stat.r / num) * p.height);
    prevStat = stat;
  };
};

// eslint-disable-next-line new-cap
new p5(rendering);
// eslint-disable-next-line new-cap
new p5(renderGraph);
