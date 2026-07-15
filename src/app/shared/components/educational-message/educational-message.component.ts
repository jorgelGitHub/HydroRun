import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-educational-message',
  standalone: true,
  template: `<aside class="message">{{ text }}</aside>`,
  styles: [
    `
      .message {
        background: #ffffff;
        border-left: 6px solid var(--water-500);
        border-radius: 8px;
        font-weight: 800;
        padding: 12px;
      }
    `,
  ],
})
export class EducationalMessageComponent {
  @Input({ required: true }) text = '';
}
