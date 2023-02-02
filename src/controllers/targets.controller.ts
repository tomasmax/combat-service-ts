import { NextFunction, Request, Response } from 'express';
import { CreateTargetsDto } from '@dtos/targets.dto';
import { Coordinate } from '@interfaces/coordinate.interface';
import targetService from '@services/targets.service';

class TargetsController {
  public targetService = new targetService();

  public getTargetCoordinate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const targetsDto: CreateTargetsDto = new CreateTargetsDto(req.body);
      const targetCoordinate: Coordinate = await this.targetService.getTargetCoordinate(targetsDto);

      res.status(200).json(targetCoordinate);
    } catch (error) {
      next(error);
    }
  };
}

export default TargetsController;
