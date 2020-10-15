import p5 from 'p5';

const PLAYER_RADIUS = 1;
const PLAYER_RADIUS2 = PLAYER_RADIUS * PLAYER_RADIUS;

interface HumanStatus {
  x: number
  y: number
  vx: number
  vy: number
}

export const initialize = (p: typeof p5, num: number) => {
  const randomPos = ():HumanStatus => {
    const rad = Math.random() * Math.PI;
    return {
      x: Math.random() * (p.width - 2 * PLAYER_RADIUS) + PLAYER_RADIUS,
      y: Math.random() * (p.height - 2 * PLAYER_RADIUS) + PLAYER_RADIUS,
      vx: Math.cos(rad),
      vy: Math.sin(rad),
    }
  }
  const human: HumanStatus[] = [];
  for(let i=0;i<num;i+=1) human.push(randomPos());
  return human;
}

const intersection = (a: HumanStatus, b: HumanStatus) {
  if(Math.abs(a.x - b.x) > 1 || Math.abs(a.y - b.y) > 1) return;
  if(Math.pow(a.x - b.x, 2.0) + Math.pow(a.y - b.y, 2.0) > PLAYER_RADIUS2) return;
  
}

export const move = (human: HumanStatus[]) => {
  const num = human.length;

  
}