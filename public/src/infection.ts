/* eslint-disable no-param-reassign */
import { isInfected } from './utils';

const revTime = 1 / 14;

export default (list: number[][]) => {
  const row = list.length;
  const column = list[0].length;

  const getType = (_x: number, _y: number) => {
    const x = (_x + column) % column;
    const y = (_y + row) % row;
    return list[y][x];
  };

  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < column; j += 1) {
      if (isInfected(list[i][j])) list[i][j] = Math.random() < 1/14 ? 1: 0.5;
      else if (list[i][j] <= 0) {
        let infected = 0;
        for (let dy = -1; dy < 2; dy += 1) {
          for (let dx = -1; dx < 2; dx += 1) {
            infected += isInfected(getType(j + dx, i + dy)) ? 1 : 0;
          }
        }
        for (let k = 0; k < infected; k += 1) {
          if (Math.random() < 1.1398522810476 * 0.1) {
            list[i][j] += revTime;
            break;
          }
        }
      }
    }
  }
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
