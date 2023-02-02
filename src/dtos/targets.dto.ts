import { Protocol, PROTOCOL_EXECUTION_PATTERN } from '@/interfaces/protocols.type';
import { Target } from '@/interfaces/target.interface';
import TargetModel from '@/models/target.model';
import { sortArrayByPattern } from '@/utils/util';
import { IsArray } from 'class-validator';

export class CreateTargetsDto {
  @IsArray()
  public protocols?: Protocol;

  @IsArray()
  public scan?: Target[];

  constructor({ protocols = [], scan = [] }: { protocols?: Protocol; scan?: Target[] } = {}) {
    this.protocols = sortArrayByPattern({
      array: protocols,
      pattern: PROTOCOL_EXECUTION_PATTERN,
    });
    this.scan = scan.map((target: Target): TargetModel => new TargetModel(target));
  }
}
