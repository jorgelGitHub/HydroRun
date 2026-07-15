export type PlayerSex = 'masculino' | 'femenino' | 'prefiero-no-decirlo';

export interface PlayerData {
  name: string;
  age: number;
  sex: PlayerSex;
  createdAt: string;
}
