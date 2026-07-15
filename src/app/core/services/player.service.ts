import { Injectable, inject } from '@angular/core';
import { PlayerData } from '../models/player-data.model';
import { LocalStorageService } from './local-storage.service';

const PLAYER_KEY = 'hydrorun.player';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private readonly storage = inject(LocalStorageService);

  getPlayer(): PlayerData | null {
    return this.storage.getJson<PlayerData | null>(PLAYER_KEY, null);
  }

  savePlayer(player: PlayerData): void {
    this.storage.setJson(PLAYER_KEY, player);
  }
}
