export enum EnemyType {
  SOLDIER = 'soldier',
  MECH = 'mech',
}

export interface Enemy {
  type: string;
  number: number;
}
