import { Injectable } from '@angular/core';
import { defaultGameConfiguration } from '../../game/config/game.constants';
import { GameConfiguration } from '../models/game-configuration.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  getGameConfiguration(): GameConfiguration {
    return defaultGameConfiguration;
  }
}
