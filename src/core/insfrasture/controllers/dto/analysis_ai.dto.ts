import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAnalisisIADto {
  @IsNumber()
  @IsNotEmpty()
  negocioId: number;

  @IsOptional() 
  fechaAnalisis?: Date;
}

export class UpdateAnalisisIADto {
  @IsNumber()
  @IsOptional()
  negocioId?: number;

  @IsOptional()
  fechaAnalisis?: Date;
}
