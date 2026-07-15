export const obstaclesConfig = [
  { id: 'spinner-1', type: 'rotating-hammer', x: 860, y: 540, section: 'inicio' },
  { id: 'barrier-1', type: 'moving-barrier', x: 1450, y: 500, section: 'intermedia' },
  { id: 'puddle-1', type: 'slippery-puddle', x: 1880, y: 630, section: 'intermedia' },
  { id: 'roller-1', type: 'horizontal-roller', x: 2440, y: 570, section: 'final' },
] as const;
