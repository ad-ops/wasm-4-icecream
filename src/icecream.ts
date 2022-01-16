import * as w4 from './wasm4';
import { Flavor, getFlavorColor } from './flavor';

export class IceCream {
  scopes: Flavor[] = [];
  cone: bool = true;
  scopeWidth: u32;
  coneHeight: u32;
  posX: u32;
  posY: u32;

  constructor(
    public x: u32,
    public y: u32,
    public width: u32,
    public startScopes: Flavor[] = []
  ) {
    this.scopeWidth = width;
    this.posX = x - width / 2;
    this.posY = y;
    this.coneHeight = width * 2;
    this.scopes = startScopes;
  }

  addScope(scope: Flavor): void {
    if (this.cone && this.scopes.length < 9) this.scopes.push(scope);
  }

  eat(): void {
    if (this.scopes.length === 0) {
      this.cone = false;
    } else {
      this.scopes.splice(this.scopes.length - 1, 1);
    }
  }

  equals(other: IceCream): bool {
    if (this.scopes.length !== other.scopes.length) return false;
    for (let i = 0; i < this.scopes.length; i++)
      if (this.scopes[i] !== other.scopes[i]) return false;
    return true;
  }

  draw(): void {
    // draw cone
    if (this.cone) {
      store<u16>(w4.DRAW_COLORS, 2);
      for (var x = this.posX; x <= this.posX + this.scopeWidth; x++) {
        w4.line(
          i32(this.posX + this.scopeWidth / 2),
          this.posY,
          x,
          this.posY - this.coneHeight
        );
      }
    }

    // draw scopes
    for (let i = 0; i < this.scopes.length; i++) {
      store<u16>(w4.DRAW_COLORS, getFlavorColor(this.scopes[i]));
      w4.oval(
        i32(this.posX),
        this.posY - this.coneHeight + (this.scopeWidth - 1) * -(i + 1),
        this.scopeWidth,
        this.scopeWidth
      );
    }
  }
}

export function generateScopes(): Flavor[] {
  const scopes: Flavor[] = [];
  const amount = Math.random() * 4;
  for (let i = 0; i < amount; i++) {
    const index = u32(Math.random() * 3);
    switch (index) {
      case 0:
        scopes.push(Flavor.chocolate);
        break;
      case 1:
        scopes.push(Flavor.strawberry);
        break;
      case 2:
        scopes.push(Flavor.vanilla);
        break;
      default:
        scopes.push(Flavor.chocolate);
        break;
    }
  }
  return scopes;
}
