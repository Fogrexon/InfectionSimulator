/* eslint-disable no-param-reassign */
import p5 from 'p5';
import { isInfected, isRecovered, isSusceptible } from './utils';
import { HumanStatus, Stat, Parameters } from './types';

const reflect = (x: number, y: number, nx:number, ny: number): {
  x: number
  y: number
} => {
  const dot = x * nx + y * ny;
  return {
    x: x - 2 * nx * dot,
    y: y - 2 * ny * dot,
  };
};

const intersection = (a: HumanStatus, b: HumanStatus, params: Parameters) => {
  const { radius } = params;
  const radius2 = radius * radius;
  if (Math.abs(a.x - b.x) > radius * 2 || Math.abs(a.y - b.y) > radius * 2) return;
  const dist2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  if (dist2 > radius2 * 4) return;
  const dist = Math.sqrt(dist2);
  const nx = (a.x - b.x) / dist;
  const ny = (a.y - b.y) / dist;
  const far = (radius - dist / 2);
  const va = reflect(a.vx, a.vy, nx, ny);
  a.vx = va.x;
  a.vy = va.y;
  a.x += nx * far;
  a.y += ny * far;
  const vb = reflect(b.vx, b.vy, nx, ny);
  b.vx = vb.x;
  b.vy = vb.y;
  b.x -= nx * far;
  b.y -= ny * far;
  if (isInfected(a.state) && isSusceptible(b.state)) {
    b.state = Math.random() < params.infect ? 0.000001 : 0;
  }
  if (isInfected(b.state) && isSusceptible(a.state)) {
    a.state = Math.random() < params.infect ? 0.000001 : 0;
  }
};

export default (p: typeof p5, params: Parameters): {
  move: () => Stat,
  human: HumanStatus[],
} => {
  // initialize
  const randomPos = (): HumanStatus => {
    const rad = Math.random() * Math.PI;
    return {
      x: Math.random() * (p.width - 2 * params.radius) + params.radius,
      y: Math.random() * (p.height - 2 * params.radius) + params.radius,
      vx: Math.cos(rad),
      vy: Math.sin(rad),
      state: 0,
    };
  };
  const human: HumanStatus[] = [];
  for (let i = 0; i < params.number; i += 1) {
    human.push(randomPos());
  }

  // move
  const move = () => {
    const num = human.length;
    const stat: Stat = {
      s: 0,
      i: 0,
      r: 0,
    };
    for (let i = 0; i < num; i += 1) {
      for (let j = i + 1; j < num; j += 1) {
        intersection(human[i], human[j], params);
      }
    }
    for (let i = 0; i < num; i += 1) {
      human[i].x = (
        human[i].x + human[i].vx * p.deltaTime * 0.001 * params.speed + p.width
      ) % p.width;
      human[i].y = (
        human[i].y + human[i].vy * p.deltaTime * 0.001 * params.speed + p.height
      ) % p.height;
      if (isInfected(human[i].state)) {
        human[i].state = Math.random() < params.recover * p.deltaTime * 0.001 ? 1 : 0.5;
        stat.i += 1;
      } else if (isRecovered(human[i].state)) stat.r += 1;
      else stat.s += 1;
    }
    return stat;
  };

  return {
    move,
    human,
  };
};
