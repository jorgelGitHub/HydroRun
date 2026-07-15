import { defaultGameConfiguration } from '../config/game.constants';

export class EnergySystem {
  reduce(currentValue: number): number {
    return Math.max(0, currentValue - defaultGameConfiguration.energyDecayAmount);
  }

  getMovementMultiplier(hydration: number): number {
    if (hydration < 20) {
      return 0.68;
    }
    if (hydration < 40) {
      return 0.78;
    }
    if (hydration < 60) {
      return 0.9;
    }
    return 1;
  }
}
