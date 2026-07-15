import { EducationalMessage } from '../../core/models/educational-message.model';

export const educationalMessages: EducationalMessage[] = [
  {
    id: 'temperature',
    text: 'El agua ayuda a regular la temperatura corporal',
    triggerProgress: 12,
    durationMs: 4000,
    dismissible: true,
  },
  {
    id: 'performance',
    text: 'La deshidratación puede disminuir el rendimiento físico',
    triggerProgress: 32,
    durationMs: 4000,
    dismissible: true,
  },
  {
    id: 'before-during-after',
    text: 'Beber agua antes, durante y después del ejercicio es importante',
    triggerProgress: 52,
    durationMs: 4500,
    dismissible: true,
  },
  {
    id: 'energy',
    text: 'Recoger agua te ayuda a conservar energía',
    triggerProgress: 72,
    durationMs: 3500,
    dismissible: true,
  },
  {
    id: 'finish',
    text: 'Mantente hidratado para rendir mejor',
    triggerProgress: 88,
    durationMs: 3500,
    dismissible: true,
  },
];
