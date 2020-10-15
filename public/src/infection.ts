/* eslint-disable no-param-reassign */
import { isInfected, isRecovered } from './utils';

const revTime = 1 / 14;

export default (list: number[][]) => {
  const row = list.length;
  const column = list[0].length;
  const result: typeof list = [];
  const stat = {
    s: 0,
    i: 0,
    r: 0,
  };

  const getType = (_x: number, _y: number) => {
    const x = (_x + column) % column;
    const y = (_y + row) % row;
    return list[y][x];
  };

  for (let i = 0; i < row; i += 1) {
    result.push([]);
    for (let j = 0; j < column; j += 1) {
      let next;
      if (isInfected(list[i][j])) next = Math.random() < 1 / 7 ? 1 : 0.5;
      else if (list[i][j] <= 0) {
        let infected = 0;
        for (let dy = -1; dy < 2; dy += 1) {
          for (let dx = -1; dx < 2; dx += 1) {
            infected += isInfected(getType(j + dx, i + dy)) ? 1 : 0;
          }
        }
        next = 0;
        for (let k = 0; k < infected; k += 1) {
          if (Math.random() < 0.2) {
            next += revTime;
            break;
          }
        }
      }else next = 1;

      result[i].push(next);
    }
  }

  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < column; j += 1) {
      list[i][j] = result[i][j];
      if (isInfected(list[i][j])) stat.i += 1;
      else if (isRecovered(list[i][j])) stat.r += 1;
      else stat.s += 1;
    }
  }

  return stat;
};

export const getInfected = (column: number, row: number): number[][] => {
  const list = [];
  for (let i = 0; i < row; i += 1) {
    list.push([]);
    for (let j = 0; j < column; j += 1) {
      list[i].push(0);
    }
  }
  list[Math.floor(row * 0.5)][Math.floor(column * 0.5)] = revTime;
  return list;
};
