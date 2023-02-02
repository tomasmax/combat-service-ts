import { Enemy, EnemyType } from '@/interfaces/enemies.interface';
import { Protocol, ProtocolEnum, PROTOCOL_EXECUTION_PATTERN } from '@/interfaces/protocols.type';
import { Scan } from '@/interfaces/scan.interface';
import CoordinateModel from '@/models/coordinate.model';
import { CreateTargetsDto } from '@dtos/targets.dto';
import { HttpException } from '@exceptions/HttpException';
import { Coordinate } from '@interfaces/coordinate.interface';
import { isEmpty, sortArrayByPattern } from '@utils/util';

const MAX_DISTANCE = 100;

const isCloser = (currentDistance: number, minDistance: number): boolean => currentDistance < minDistance;
const isFurther = (currentDistance: number, maxDistance: number): boolean => currentDistance > maxDistance && currentDistance <= MAX_DISTANCE;
const isAPossibleTargetCoordinate = ({
  isClosest,
  currentDistance,
  lastMaxOrMinDistance,
}: {
  isClosest: boolean;
  currentDistance: number;
  lastMaxOrMinDistance: number;
}): boolean => (isClosest ? isCloser(currentDistance, lastMaxOrMinDistance) : isFurther(currentDistance, lastMaxOrMinDistance));

const isMech = ({ enemies }: { enemies: Enemy }): boolean => enemies.type === EnemyType.MECH;
const isAlly = ({ allies }: { allies?: number }): boolean => allies > 0;

function getTarget({ scan, isClosest = true }: { scan: Scan[]; isClosest?: boolean }) {
  let lastMaxOrMinDistance: number = isClosest ? Infinity : 0;
  let targetCoordinate: Coordinate;

  scan.forEach(({ coordinates }: { coordinates: Coordinate }) => {
    const coordinate = new CoordinateModel(coordinates);
    const currentDistance = coordinate.calculateDistance();
    if (
      isAPossibleTargetCoordinate({
        isClosest,
        currentDistance,
        lastMaxOrMinDistance,
      })
    ) {
      lastMaxOrMinDistance = currentDistance;
      targetCoordinate = coordinate;
    }
  });
  return targetCoordinate;
}

class TargetService {
  public async getTargetCoordinate(targetsData: CreateTargetsDto): Promise<Coordinate> {
    if (isEmpty(targetsData)) throw new HttpException(400, 'targets data is empty');

    const { protocols, scan }: { protocols: Protocol; scan: Scan[] } = targetsData;
    let result: Coordinate;
    let filteredScan: Scan[];
    const sortedProtocols = sortArrayByPattern({
      array: protocols,
      pattern: PROTOCOL_EXECUTION_PATTERN,
    });
    sortedProtocols.forEach(protocol => {
      switch (protocol) {
        case ProtocolEnum.CLOSEST_ENEMIES:
          result = getTarget({ scan: filteredScan || scan, isClosest: true });
          break;
        case ProtocolEnum.AVOID_MECH:
          filteredScan = (filteredScan || scan).filter(target => !isMech(target));
          result = getTarget({ scan: filteredScan.length ? filteredScan : scan });
          break;
        case ProtocolEnum.PRIORITIZE_MECH:
          filteredScan = (filteredScan || scan).filter(target => isMech(target));
          result = getTarget({ scan: filteredScan.length ? filteredScan : scan });
          break;
        case ProtocolEnum.FURTHEST_ENEMIES:
          result = getTarget({ scan: filteredScan || scan, isClosest: false });
          break;
        case ProtocolEnum.ASSIST_ALLIES:
          filteredScan = (filteredScan || scan).filter(target => isAlly(target));
          result = getTarget({ scan: filteredScan.length ? filteredScan : scan });
          break;
        case ProtocolEnum.AVOID_CROOSFIRE:
          filteredScan = (filteredScan || scan).filter(target => !isAlly(target));
          result = getTarget({ scan: filteredScan.length ? filteredScan : scan });
          break;
      }
    });
    return result;
  }
}
export default TargetService;
