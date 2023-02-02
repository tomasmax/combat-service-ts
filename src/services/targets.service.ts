import { Protocol, ProtocolEnum } from '@/interfaces/protocols.type';
import { Target } from '@/interfaces/target.interface';
import { CreateTargetsDto } from '@dtos/targets.dto';
import { HttpException } from '@exceptions/HttpException';
import { Coordinate } from '@interfaces/coordinate.interface';
import { isEmpty } from '@utils/util';

class TargetService {
  private getTargetFromScan({ scan, isClosest = true }: { scan: Target[]; isClosest?: boolean }) {
    let lastMaxOrMinDistance: number = isClosest ? Infinity : 0;
    let targetCoordinate: Coordinate;

    for (const target of scan) {
      if (target.isAPossibleTargetCoordinate({ isClosest, lastMaxOrMinDistance })) {
        lastMaxOrMinDistance = target.distanceFromRadar;
        targetCoordinate = target.coordinates;
      }
    }
    return targetCoordinate;
  }

  public async getTargetCoordinate(targetsData: CreateTargetsDto): Promise<Coordinate> {
    if (isEmpty(targetsData)) throw new HttpException(400, 'targets data is empty');

    const { protocols, scan }: { protocols?: Protocol; scan?: Target[] } = targetsData;
    let result: Coordinate;
    let filteredScan: Target[];

    for (const protocol of protocols) {
      switch (protocol) {
        case ProtocolEnum.CLOSEST_ENEMIES:
          result = this.getTargetFromScan({ scan: filteredScan || scan, isClosest: true });
          break;
        case ProtocolEnum.AVOID_MECH:
          filteredScan = (filteredScan || scan).filter((target: Target) => !target.isMech());
          result = this.getTargetFromScan({ scan: filteredScan.length ? filteredScan : scan });
          break;
        case ProtocolEnum.PRIORITIZE_MECH:
          filteredScan = (filteredScan || scan).filter((target: Target) => target.isMech());
          result = this.getTargetFromScan({ scan: filteredScan.length ? filteredScan : scan });
          break;
        case ProtocolEnum.FURTHEST_ENEMIES:
          result = this.getTargetFromScan({ scan: filteredScan || scan, isClosest: false });
          break;
        case ProtocolEnum.ASSIST_ALLIES:
          filteredScan = (filteredScan || scan).filter((target: Target) => target.hasAllies());
          result = this.getTargetFromScan({ scan: filteredScan.length ? filteredScan : scan });
          break;
        case ProtocolEnum.AVOID_CROOSFIRE:
          filteredScan = (filteredScan || scan).filter((target: Target) => !target.hasAllies());
          result = this.getTargetFromScan({ scan: filteredScan.length ? filteredScan : scan });
          break;
      }
    }
    return result;
  }
}
export default TargetService;
