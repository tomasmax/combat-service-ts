export interface Coordinate {
  x: number;
  y: number;
  calculateDistance?(coordinate?: Coordinate): number;
}
