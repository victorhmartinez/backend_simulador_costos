import { Injectable } from '@nestjs/common';
import { CreateAprendizajeDto } from '../dto/learning.dto';
import { Aprendizaje } from 'src/core/domain/model/learning';
import { Aprendizaje as AprendizajePrismaModel } from 'generated/prisma';

@Injectable()
export class AprendizajeMapper {
  // Convierte desde el modelo de Prisma al modelo de Dominio
  toDomain(prismaAprendizaje: AprendizajePrismaModel): Aprendizaje {
    return new Aprendizaje(
      prismaAprendizaje.nombre,
      prismaAprendizaje.total_niveles);
  }

  // Convierte desde un DTO de creación al modelo de Dominio
  toDomainFromDto(dto: CreateAprendizajeDto): Aprendizaje {
    return new Aprendizaje(
      dto.nombre,
      dto.totalNiveles,
    );
  }
}