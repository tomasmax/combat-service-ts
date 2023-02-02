import { Router } from 'express';
import TargetsController from '@controllers/targets.controller';
import { CreateTargetsDto } from '@dtos/targets.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/targets';
  public router = Router();
  public targetsController = new TargetsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/radar`, validationMiddleware(CreateTargetsDto, 'body'), this.targetsController.getTargetCoordinate);
  }
}

export default UsersRoute;
