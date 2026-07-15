import { defaultGameConfiguration } from '../config/game.constants';

export class HydrationSystem {
  reduce(currentValue: number): number {
    return Math.max(0, currentValue - defaultGameConfiguration.hydrationDecayAmount);
  }

  collectDrop(currentValue: number): number {
    return Math.min(
      defaultGameConfiguration.maxHydration,
      currentValue + defaultGameConfiguration.dropHydrationValue,
    );
  }
}
