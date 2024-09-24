import { IsString, IsNumber } from 'class-validator';

export class CreateDto {

  readonly name: string;

  readonly price: number;
}
