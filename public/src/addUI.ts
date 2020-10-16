import Tweakpane from 'tweakpane';
import { Parameters } from './types';

export default (params: Parameters, pane: Tweakpane, callback: () => void) => {
  pane.addInput(params, 'number', {
    min: 2,
    max: 3000,
  });
  pane.addInput(params, 'infect', {
    min: 0,
    max: 1,
  });
  pane.addInput(params, 'recover', {
    min: 0,
    max: 1,
  });
  pane.addInput(params, 'radius', {
    min: 0,
    max: 30,
  });
  pane.addInput(params, 'speed', {
    min: 0,
    max: 200,
  });
  pane.addInput(params, 'deltaIndex', {
    min: 0,
    max: 5,
  });
  pane.addInput(params, 'play');
  pane.addButton({
    title: 'reset',
  }).on('click', callback);
};
