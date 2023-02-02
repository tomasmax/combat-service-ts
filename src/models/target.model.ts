import { Enemy, EnemyType } from '@/interfaces/enemies.interface';
import { Target } from '@/interfaces/target.interface';
import { Coordinate } from '@interfaces/coordinate.interface';
import CoordinateModel from './coordinate.model';

const MAX_DISTANCE = 100;

class TargetModel implements Target {
  coordinates: Coordinate;
  enemies: Enemy;
  allies?: number;
  distanceFromRadar: number;

  constructor({ coordinates, enemies, allies }: { coordinates: Coordinate; enemies: Enemy; allies?: number }) {
    this.coordinates = new CoordinateModel(coordinates);
    this.enemies = enemies;
    this.allies = allies;
    this.distanceFromRadar = this.calculateDistance();
  }

  calculateDistance(coordinate: Coordinate = { x: 0, y: 0 }): number {
    return Math.sqrt(Math.pow(Math.abs(coordinate.x - this.coordinates.x), 2) + Math.pow(Math.abs(coordinate.y - this.coordinates.y), 2));
  }

  isAPossibleTargetCoordinate({ isClosest, lastMaxOrMinDistance }: { isClosest: boolean; lastMaxOrMinDistance: number }): boolean {
    const isCloser = (currentDistance: number, minDistance: number): boolean => currentDistance < minDistance;

    const isFurther = (currentDistance: number, maxDistance: number): boolean => currentDistance > maxDistance && currentDistance <= MAX_DISTANCE;

    return isClosest ? isCloser(this.distanceFromRadar, lastMaxOrMinDistance) : isFurther(this.distanceFromRadar, lastMaxOrMinDistance);
  }

  hasAllies(): boolean {
    return this.allies > 0;
  }

  isMech(): boolean {
    return this.enemies.type === EnemyType.MECH;
  }
}

export default TargetModel;
