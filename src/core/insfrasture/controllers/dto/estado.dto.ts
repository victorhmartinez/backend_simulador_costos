
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEstadoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombreEstado: string;
}

export class UpdateEstadoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombreEstado: string;
}