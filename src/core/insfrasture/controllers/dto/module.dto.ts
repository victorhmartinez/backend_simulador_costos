import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateModulosDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombreModulo: string;

  @IsNumber()
  @IsNotEmpty()
  aprendizajeId: number;

  @IsString()
  @IsOptional()
  concepto?: string;

  @IsNumber()
  @IsOptional()
  ordenModulo?: number;

  @IsString()
  @IsOptional()
  recursoInteractivo?: string;

  @IsString()
  @IsOptional()
  tituloContenido?: string;
}

export class UpdateModuloDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  nombreModulo?: string;

  @IsNumber()
  @IsOptional()
  aprendizajeId?: number;

  @IsString()
  @IsOptional()
  concepto?: string;

  @IsNumber()
  @IsOptional()
  ordenModulo?: number;

  @IsString()
  @IsOptional()
  recursoInteractivo?: string;

  @IsString()
  @IsOptional()
  tituloContenido?: string;
}
