import { HydrationSystem } from './hydration.system';

describe('HydrationSystem', () => {
  let system: HydrationSystem;

  beforeEach(() => {
    system = new HydrationSystem();
  });

  it('reduces hydration without going below zero', () => {
    expect(system.reduce(100)).toBe(99);
    expect(system.reduce(0)).toBe(0);
  });

  it('increases hydration when collecting drops without exceeding 100', () => {
    expect(system.collectDrop(50)).toBe(60);
    expect(system.collectDrop(95)).toBe(100);
  });
});
