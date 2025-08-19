import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateResultadosCostosOmitidosDto {
  @IsNumber()
  @IsNotEmpty()
  analisisId: number;

  @IsOptional()
  @IsString()
  costoOmitido?: string;

  @IsOptional()
  @IsString()
  importancia?: string;
}

export class UpdateResultadosCostosOmitidosDto {
  @IsOptional()
  @IsNumber()
  analisisId?: number;

  @IsOptional()
  @IsString()
  costoOmitido?: string;

  @IsOptional()
  @IsString()
  importancia?: string;
}
