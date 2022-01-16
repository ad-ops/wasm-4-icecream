export enum Flavor {
  vanilla = 0,
  chocolate = 1,
  strawberry = 2,
}

export function getFlavorColor(flavor: Flavor): u16 {
  switch (flavor) {
    case Flavor.chocolate:
      return 4;
    case Flavor.strawberry:
      return 3;
    case Flavor.vanilla:
      return 1;
    default:
      return 4;
  }
}

export function getFlavorName(flavor: Flavor): string {
  switch (flavor) {
    case Flavor.chocolate:
      return 'chocolate';
    case Flavor.strawberry:
      return 'strawberry';
    case Flavor.vanilla:
      return 'vanilla';
    default:
      return 'unknown';
  }
}

export function nextFlavor(flavor: Flavor): Flavor {
  switch (flavor) {
    case Flavor.chocolate:
      return Flavor.strawberry;
    case Flavor.strawberry:
      return Flavor.vanilla;
    case Flavor.vanilla:
      return Flavor.chocolate;
    default:
      return Flavor.chocolate;
  }
}

export function previousFlavor(flavor: Flavor): Flavor {
  switch (flavor) {
    case Flavor.chocolate:
      return Flavor.vanilla;
    case Flavor.strawberry:
      return Flavor.chocolate;
    case Flavor.vanilla:
      return Flavor.strawberry;
    default:
      return Flavor.chocolate;
  }
}
