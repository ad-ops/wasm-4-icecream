import * as w4 from './wasm4';
import { IceCream, generateScopes } from './icecream';
import { Flavor, previousFlavor, nextFlavor, getFlavorName } from './flavor';
import { play } from './sound';
import * as sound from './samples';

// Set custom color
store<u32>(w4.PALETTE, 0xfff6d3, 0 * sizeof<u32>());
store<u32>(w4.PALETTE, 0xf9a875, 1 * sizeof<u32>());
store<u32>(w4.PALETTE, 0xeb6b6f, 2 * sizeof<u32>());
store<u32>(w4.PALETTE, 0x7c3f58, 3 * sizeof<u32>());

// Sounds
const volume = 50;

const currentIceCream = new IceCream(80, 120, 8, [
  Flavor.chocolate,
  Flavor.vanilla,
  Flavor.strawberry,
]);
const targetIceCream = new IceCream(100, 25, 4, generateScopes());

let currentFlavor: Flavor = Flavor.chocolate;
let score = 0;

// load persisted highscore
let highscore = 0;
const ptr = memory.data(sizeof<i32>());
w4.diskr(ptr, sizeof<i32>());
highscore = load<i32>(ptr);

let frameCount: u64 = 0;
let prevState: u8;
export function update(): void {
  // display
  store<u16>(w4.DRAW_COLORS, 2);
  w4.text('Make this:', 5, 10);
  targetIceCream.draw();

  store<u16>(w4.DRAW_COLORS, 4);
  w4.text(`Score: ${score}`, 5, 25);
  w4.text(`Best!: ${highscore}`, 5, 40);

  currentIceCream.draw();

  if (!currentIceCream.cone) {
    store<u16>(w4.DRAW_COLORS, 4);
    w4.text('No ice cream:-(', 20, 80);
  }

  store<u16>(w4.DRAW_COLORS, 3);
  w4.text(`Flavor: ${getFlavorName(currentFlavor)}`, 10, 130);

  store<u16>(w4.DRAW_COLORS, 4);
  w4.text(`Press R to reset`, 15, 145);

  // inputs
  const gamepad = load<u8>(w4.GAMEPAD1);
  const justPressed = gamepad & (gamepad ^ prevState);
  if (justPressed && gamepad & w4.BUTTON_1) {
    play(sound.eat);
    currentIceCream.eat();
  }
  if (justPressed && gamepad & w4.BUTTON_2) {
    play(sound.scope);
    currentIceCream.addScope(currentFlavor);
  }
  if (justPressed && gamepad & (w4.BUTTON_DOWN | w4.BUTTON_LEFT)) {
    play(sound.change);
    currentFlavor = nextFlavor(currentFlavor);
  }
  if (justPressed && gamepad & (w4.BUTTON_UP | w4.BUTTON_RIGHT)) {
    play(sound.change);
    currentFlavor = previousFlavor(currentFlavor);
  }
  prevState = gamepad;

  // check if icecream is correct
  if (currentIceCream.equals(targetIceCream)) {
    score++;
    targetIceCream.scopes = generateScopes();
    // persist highscore
    if (score > highscore) {
      highscore = score;
      store<i32>(ptr, highscore);
      w4.diskw(ptr, sizeof<i32>());
    }
  }

  // music
  const musicVolume = volume / 2;

  // if (frameCount % 120 === 0) play(sound.bleep);
  // if (frameCount % 70 === 0) play(bleep2);
  // if (frameCount % 120 === 0) play(sound);
  // if (frameCount % 70 === 0) w4.tone(200, 10, musicVolume, w4.TONE_PULSE2);

  // track frames
  if (frameCount === u64.MAX_VALUE) frameCount = 0;
  frameCount++;
}
