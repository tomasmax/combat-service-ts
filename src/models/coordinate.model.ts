import { Coordinate } from '@interfaces/coordinate.interface';

class CoordinateModel implements Coordinate {
  x: number;
  y: number;

  constructor({ x = 0, y = 0 }) {
    this.x = x;
    this.y = y;
  }

  calculateDistance(coordinate: Coordinate = { x: 0, y: 0 }): number {
    return Math.sqrt(Math.pow(Math.abs(coordinate.x - this.x), 2) + Math.pow(Math.abs(coordinate.y - this.y), 2));
  }

  static MAX_DISTANCE = 100;

  static isAPossibleTargetCoordinate({
    isClosest,
    currentDistance,
    lastMaxOrMinDistance,
  }: {
    isClosest: boolean;
    currentDistance: number;
    lastMaxOrMinDistance: number;
  }): boolean {
    const isCloser = (currentDistance: number, minDistance: number): boolean => currentDistance < minDistance;

    const isFurther = (currentDistance: number, maxDistance: number): boolean =>
      currentDistance > maxDistance && currentDistance <= CoordinateModel.MAX_DISTANCE;

    return isClosest ? isCloser(currentDistance, lastMaxOrMinDistance) : isFurther(currentDistance, lastMaxOrMinDistance);
  }
}

export default CoordinateModel;
