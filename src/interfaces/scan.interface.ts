import { Coordinate } from './coordinate.interface';
import { Enemy } from './enemies.interface';

export interface Scan {
  coordinates: Coordinate;
  enemies: Enemy;
  allies?: number;
}
