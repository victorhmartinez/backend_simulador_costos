// src/infrastructure/mappers/estado.mapper.ts

import { Injectable } from '@nestjs/common';
import { Estados as EstadoPrismaModel } from '@prisma/client';
import { Estado } from 'src/core/domain/model/estado.model';
import { CreateEstadoDto, UpdateEstadoDto } from '../dto/estado.dto';


@Injectable()
export class EstadoMapper {
  // De Prisma al Dominio
  toDomain(prismaModel: EstadoPrismaModel): Estado {
    return new Estado(prismaModel.nombre_estado, prismaModel.id_estado);
  }

  // De DTO de Creación al Dominio
  toDomainFromCreateDto(dto: CreateEstadoDto): Estado {
    return new Estado(dto.nombreEstado);
  }

  // De DTO de Actualización al Dominio
  toDomainFromUpdateDto(dto: UpdateEstadoDto): Estado {
    return new Estado(dto.nombreEstado);
  }
}