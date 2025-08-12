import { Injectable } from '@nestjs/common';
import { tamano_negocio as TamanoNegocioPrismaModel } from '@prisma/client';
import { BusinessSize } from 'src/core/domain/model/business_size';
import { CreateBusinessSizeiDto } from '../dto/business_size.dto';

@Injectable()
export class BusinessSizeMapper {
  // De Prisma al Dominio
  toDomain(prismaModel: TamanoNegocioPrismaModel): BusinessSize {
    return new BusinessSize(prismaModel.tamano_nombre);
  }

  // Del DTO al Dominio
  toDomainFromDto(dto: CreateBusinessSizeiDto): BusinessSize {
    return new BusinessSize(dto.tamanoNombre);
  }
}