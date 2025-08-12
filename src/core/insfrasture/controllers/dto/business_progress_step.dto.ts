import { IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBusinessProgressStepDto {
  @IsNumber()
  @IsNotEmpty()
  negocioId: number;

  @IsNumber()
  @IsNotEmpty()
  moduloId: number;

  @IsNumber()
  @IsNotEmpty()
  estadoId: number;
}

export class UpdateBusinessProgressStepDto {
  @IsNumber()
  @IsNotEmpty()
  negocioId: number;

  @IsNumber()
  @IsNotEmpty()
  moduloId: number;

  @IsNumber()
  @IsNotEmpty()
  estadoId: number;

  @IsDateString()
  @IsOptional()
  fechaInicio?: string;

  @IsDateString()
  @IsOptional()
  fechaCompletado?: string;
}