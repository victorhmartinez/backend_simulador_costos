import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateResultadosRiesgosDetectadosDto {
  @IsNumber()
  @IsNotEmpty()
  analisisId: number;

  @IsOptional()
  @IsString()
  riesgo?: string;

  @IsOptional()
  @IsString()
  causaDirecta?: string;

  @IsOptional()
  @IsString()
  impactoPotencial?: string;
}

export class UpdateResultadosRiesgosDetectadosDto {
  @IsOptional()
  @IsNumber()
  analisisId?: number;

  @IsOptional()
  @IsString()
  riesgo?: string;

  @IsOptional()
  @IsString()
  causaDirecta?: string;

  @IsOptional()
  @IsString()
  impactoPotencial?: string;
}
