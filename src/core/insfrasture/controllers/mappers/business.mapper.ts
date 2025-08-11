// src/infrastructure/mappers/negocio.mapper.ts

import { Injectable } from '@nestjs/common';
import { CreateNegocioDto } from '../dto/business.dto';
import { Negocio } from 'src/core/domain/model/business';
import { Negocios as NegocioPrismaModel } from 'generated/prisma';

@Injectable()
export class NegocioMapper {
  // Convierte desde el modelo de Prisma al modelo de Dominio
  toDomain(prismaNegocio: NegocioPrismaModel): Negocio {
    return new Negocio(
      prismaNegocio.usuario_id,
      prismaNegocio.tipo_negocio,
      prismaNegocio.nombre_negocio,
      prismaNegocio.ubicacion,
      prismaNegocio.id_tamano,
      prismaNegocio.negocio_id,
    prismaNegocio.fecha_creacion === null ? undefined : prismaNegocio.fecha_creacion    );
  }

  // Convierte desde un DTO de creación al modelo de Dominio
  toDomainFromDto(dto: CreateNegocioDto): Negocio {
    return new Negocio(
      dto.usuarioId,
      dto.tipoNegocio,
      dto.nombreNegocio,
      dto.ubicacion,
      dto.idTamano,
    );
  }
}