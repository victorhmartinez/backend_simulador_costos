import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateResultadosPlanAccionDto {
  @IsNumber()
  @IsNotEmpty()
  analisisId: number;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  prioridad?: string;
}

export class UpdateResultadosPlanAccionDto {
  @IsOptional()
  @IsNumber()
  analisisId?: number;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  prioridad?: string;
}
