import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';

const SOUND_KEY = 'hydrorun.sound-enabled';

@Component({
  selector: 'app-sound-settings',
  standalone: true,
  template: `
    <button class="sound" type="button" (click)="toggle()" [attr.aria-pressed]="enabled">
      {{ enabled ? 'Sonido' : 'Silencio' }}
    </button>
  `,
  styles: [
    `
      .sound {
        background: var(--water-100);
        border: 0;
        border-radius: 8px;
        color: var(--water-700);
        cursor: pointer;
        font-weight: 900;
        min-height: 40px;
        padding: 8px 12px;
      }
    `,
  ],
})
export class SoundSettingsComponent {
  private readonly storage = inject(LocalStorageService);
  enabled = this.storage.getJson<boolean>(SOUND_KEY, true);

  toggle(): void {
    this.enabled = !this.enabled;
    this.storage.setJson(SOUND_KEY, this.enabled);
  }
}
