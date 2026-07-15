export const hydrationConfig = {
  excellent: { min: 80, label: 'Excelente hidratación' },
  good: { min: 60, label: 'Buena hidratación' },
  attention: { min: 40, label: 'Hidratación aceptable' },
  risk: { min: 1, label: 'Riesgo de deshidratación' },
  defeat: { min: 0, label: 'Fin del juego' },
} as const;
