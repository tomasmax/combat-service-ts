import { Protocol } from '@/interfaces/protocols.type';
import { Scan } from '@/interfaces/scan.interface';
import { IsArray } from 'class-validator';

export class CreateTargetsDto {
  @IsArray()
  public protocols: Protocol;

  @IsArray()
  public scan: Scan[];
}
