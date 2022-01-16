// stolen from peterhellberg on https://wasm4.org/play/sound-demo/
import * as w4 from './wasm4';

export class Sound {
  freq1: u32 = 0;
  freq2: u32 = 0;
  attack: u32 = 0;
  decay: u32 = 0;
  sustain: u32 = 0;
  release: u32 = 0;
  volume: u32 = 0;
  channel: u32 = 0;
  mode: u32 = 0;
}

export function play(sound: Sound): void {
  const freq = sound.freq1 | (sound.freq2 << 16);
  const duration =
    (sound.attack << 24) |
    (sound.decay << 16) |
    sound.sustain |
    (sound.release << 8);
  const flags = sound.channel | (sound.mode << 2);
  w4.tone(freq, duration, sound.volume, flags);
}
