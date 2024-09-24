import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;
}
