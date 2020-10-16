/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
import p5 from 'p5';
import Tweakpane from 'tweakpane';
import Circles from './drawPeople';
import Simulation from './simulation';
import { HumanStatus, Stat, Parameters } from './types';
import addUI from './addUI';

const params: Parameters = {
  number: 2000,
  infect: 0.4,
  recover: 1 / 5,
  radius: 1.5,
  speed: 60,
  deltaIndex: 1,
  play: true,
  graph: true,
};

let prevStat: Stat = {
  s: params.number,
  i: 0,
  r: 0,
};
let stat: Stat = {
  s: params.number,
  i: 0,
  r: 0,
};
let prevI = 0;
let index = 0;

let human: HumanStatus[];
let move: () => Stat;

const pane = new Tweakpane();

const rendering = (p: typeof p5) => {
  p.setup = () => {
    p.createCanvas(720, 480);
    const res = Simulation(p, params);
    move = res.move;
    human = res.human;
    human[0].state = 0.5;

    addUI(params, pane, () => {
      const ress = Simulation(p, params);
      move = ress.move;
      human = ress.human;
      human[0].state = 0.5;
      index = 0;
      p.clear();
    });
  };

  p.draw = () => {
    if (!params.play) return;
    p.clear();
    stat = move();
    Circles(p, human, params);
  };
};

const renderGraph = (p: typeof p5) => {
  p.setup = () => {
    p.createCanvas(720, 480);
    p.frameRate(10);
    pane.addInput(params, 'graph').on('change', () => {
      // eslint-disable-next-line no-param-reassign
      p.canvas.style.opacity = String(params.graph ? 1 : 0);
    });
  };

  p.draw = () => {
    if (!params.play) return;
    if (index === 0) p.clear();
    const num = human.length;
    index += params.deltaIndex;
    p.strokeWeight(2);
    p.stroke(0, 255, 255);
    p.line(
      index - params.deltaIndex + 0.1, (1 - ((prevStat.i - prevI) * 30) / num) * p.height,
      index + 0.1, (1 - ((stat.i - prevStat.i) * 30) / num) * p.height,
    );
    p.stroke(0, 0, 255);
    p.line(index - params.deltaIndex, (1 - prevStat.s / num) * p.height,
      index, (1 - stat.s / num) * p.height);
    p.stroke(255, 0, 0);
    p.line(index - params.deltaIndex, (1 - prevStat.i / num) * p.height,
      index, (1 - stat.i / num) * p.height);
    p.stroke(0, 255, 0);
    p.line(index - params.deltaIndex, (1 - prevStat.r / num) * p.height,
      index, (1 - stat.r / num) * p.height);
    prevI = prevStat.i;
    prevStat = stat;
  };
};

// eslint-disable-next-line new-cap
new p5(rendering);
// eslint-disable-next-line new-cap
new p5(renderGraph);
