import p5 from 'p5';
import { isInfected, isRecovered } from './utils';
import { PLAYER_RADIUS } from './simulation';
import { HumanStatus } from './types';

export default (p: p5, list: HumanStatus[]) => {
  const num = list.length;
  p.strokeWeight(0);
  for (let i = 0; i < num; i += 1) {
    if (isInfected(list[i].state)) p.fill(255, 0, 0);
    else if (isRecovered(list[i].state)) p.fill(0, 255, 0);
    else p.fill(0, 0, 255);
    p.ellipse(list[i].x, list[i].y, PLAYER_RADIUS, PLAYER_RADIUS);
  }
};
