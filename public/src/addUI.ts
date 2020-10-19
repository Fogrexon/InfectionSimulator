import Tweakpane from 'tweakpane';
import { Parameters } from './types';

export default (params: Parameters, pane: Tweakpane, callback: () => void) => {
  pane.addInput(params, 'number', {
    min: 2,
    max: 3000,
    label: '人数(リセットで適用)',
  });
  pane.addInput(params, 'infect', {
    min: 0,
    max: 1,
    label: '感染の割合(感染率ではない)',
  });
  pane.addInput(params, 'recover', {
    min: 0,
    max: 1,
    label: '隔離率',
  });
  pane.addInput(params, 'radius', {
    min: 0,
    max: 30,
    label: '半径',
  });
  pane.addInput(params, 'speed', {
    min: 0,
    max: 200,
    label: '移動速度',
  });
  pane.addInput(params, 'graphWidth', {
    min: 1,
    max: 2000,
    label: 'グラフの幅',
  });
  pane.addInput(params, 'play', {
    label: '再生',
  });
  pane.addButton({
    title: 'リセット',
  }).on('click', callback);
};
