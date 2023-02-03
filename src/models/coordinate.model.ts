import { Coordinate } from '@interfaces/coordinate.interface';

class CoordinateModel implements Coordinate {
  x: number;
  y: number;

  constructor({ x = 0, y = 0 }) {
    this.x = x;
    this.y = y;
  }
}

export default CoordinateModel;
