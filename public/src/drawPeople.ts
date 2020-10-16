import p5 from 'p5';
import { isInfected, isRecovered } from './utils';
import { HumanStatus, Parameters } from './types';

export default (p: p5, list: HumanStatus[], params: Parameters) => {
  const num = list.length;
  p.strokeWeight(0);
  for (let i = 0; i < num; i += 1) {
    if (isInfected(list[i].state)) p.fill(255, 0, 0);
    else if (isRecovered(list[i].state)) p.fill(0, 255, 0);
    else p.fill(0, 0, 255);
    p.ellipse(list[i].x, list[i].y, params.radius * 2, params.radius * 2);
  }
};
