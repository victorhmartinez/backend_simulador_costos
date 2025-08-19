import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateResultadosCostosAnalizadosDto {
  @IsNumber()
  @IsNotEmpty()
  analisisId: number;

  @IsOptional()
  @IsString()
  nombreCosto?: string;

  @IsOptional()
  @IsString()
  valorRecibido?: string;

  @IsOptional()
  @IsString()
  rangoEstimado?: string;

  @IsOptional()
  @IsString()
  evaluacion?: string;

  @IsOptional()
  @IsString()
  comentario?: string;
}

export class UpdateResultadosCostosAnalizadosDto {
  @IsOptional()
  @IsNumber()
  analisisId?: number;

  @IsOptional()
  @IsString()
  nombreCosto?: string;

  @IsOptional()
  @IsString()
  valorRecibido?: string;

  @IsOptional()
  @IsString()
  rangoEstimado?: string;

  @IsOptional()
  @IsString()
  evaluacion?: string;

  @IsOptional()
  @IsString()
  comentario?: string;
}
