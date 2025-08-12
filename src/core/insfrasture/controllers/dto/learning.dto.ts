import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAprendizajeDto {
  @IsNumber()
  @IsNotEmpty()
  aprendizajeId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  totalNiveles: number;
}

export class UpdateAprendizajeDto {
  @IsString()
  @MaxLength(100)
  @IsOptional() // Todos los campos son opcionales en la actualización
  nombre?: string;

  @IsNumber()
  @IsOptional()
  totalNiveles?: number;
}