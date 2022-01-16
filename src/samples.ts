import { Sound } from './sound';

export const eat: Sound = {
  freq1: 0,
  freq2: 150,
  attack: 20,
  decay: 10,
  sustain: 10,
  release: 0,
  volume: 20,
  channel: 3,
  mode: 0,
};

export const scope: Sound = {
  freq1: 0,
  freq2: 1000,
  attack: 10,
  decay: 0,
  sustain: 0,
  release: 0,
  volume: 20,
  channel: 2,
  mode: 0,
};

export const change: Sound = {
  freq1: 80,
  freq2: 200,
  attack: 0,
  decay: 0,
  sustain: 10,
  release: 0,
  volume: 20,
  channel: 1,
  mode: 0,
};
