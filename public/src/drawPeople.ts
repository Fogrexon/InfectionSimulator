import p5 from 'p5';
import { isInfected, isRecovered } from './utils';

export default (p: p5, list: number[][]) => {
  const row = list.length; const
    column = list[0].length;
  const dy = p.height / row; const
    dx = p.width / column;
  const r = Math.min(dy, dx);
  p.strokeWeight(0);
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < column; j += 1) {
      if (isInfected(list[i][j])) p.fill(255, 0, 0);
      else if (isRecovered(list[i][j])) p.fill(0, 255, 0);
      else p.fill(0, 0, 255);
      p.ellipse(dx * (j + 0.5), dy * (i + 0.5), r, r);
    }
  }
};
