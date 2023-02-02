import { Coordinate } from './coordinate.interface';
import { Enemy } from './enemies.interface';

export interface Target {
  coordinates: Coordinate;
  enemies: Enemy;
  allies?: number;
  distanceFromRadar?: number;
  calculateDistance?(coordinate?: Coordinate): number;
  isAPossibleTargetCoordinate?({ isClosest, lastMaxOrMinDistance }: { isClosest?: boolean; lastMaxOrMinDistance: number }): boolean;
  hasAllies?(): boolean;
  isMech?(): boolean;
}
