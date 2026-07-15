import { EnergySystem } from './energy.system';

describe('EnergySystem', () => {
  let system: EnergySystem;

  beforeEach(() => {
    system = new EnergySystem();
  });

  it('reduces energy without going below zero', () => {
    expect(system.reduce(100)).toBe(99);
    expect(system.reduce(0)).toBe(0);
  });

  it('returns progressive movement multipliers based on hydration', () => {
    expect(system.getMovementMultiplier(80)).toBe(1);
    expect(system.getMovementMultiplier(50)).toBe(0.9);
    expect(system.getMovementMultiplier(30)).toBe(0.78);
    expect(system.getMovementMultiplier(10)).toBe(0.68);
  });
});
