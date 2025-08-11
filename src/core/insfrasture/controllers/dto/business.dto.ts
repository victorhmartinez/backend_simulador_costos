import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateNegocioDto {
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipoNegocio: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombreNegocio: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsNumber()
  @IsNotEmpty()
  idTamano: number;
}

export class UpdateNegocioDto {
  @IsString()
  @MaxLength(100)
  @IsOptional() // Todos los campos son opcionales en la actualización
  tipoNegocio?: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  nombreNegocio?: string;

  @IsString()
  @IsOptional()
  ubicacion?: string;

  @IsNumber()
  @IsOptional()
  idTamano?: number;
}