import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBusinessSizeiDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tamanoNombre: string;
}
export class UpdateBusinessSizeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tamanoNombre: string;
}