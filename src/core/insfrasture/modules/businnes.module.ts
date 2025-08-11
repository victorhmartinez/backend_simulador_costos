// src/infrastructure/modules/negocio.module.ts

import { Module } from '@nestjs/common';
import { NegocioController } from '../controllers/business.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { NegocioService } from 'src/core/application/services/buisness.service';
import { NegocioMapper } from '../controllers/mappers/business.mapper';
import { NegocioRepositoryPort } from 'src/core/application/ports/business.repository.ports';
import { NegocioPrismaRepository } from '../adapters/persistence/business.prisma.repository';


@Module({
  // Registra los controladores que pertenecen a este módulo.
  controllers: [NegocioController],

  // Registra los proveedores de servicios y repositorios.
  providers: [
    PrismaService,      // El servicio de Prisma para interactuar con la BD.
    NegocioService,     // El servicio de aplicación con la lógica de negocio.
    NegocioMapper,      // El mapeador para convertir entre capas.
    {
    
      // L"Cuando un servicio pida (inyecte) 'NegocioRepositoryPort'..."
      provide: NegocioRepositoryPort,
      // "instancia de 'NegocioPrismaRepository'".
      useClass: NegocioPrismaRepository,
    },
  ],


  exports: [NegocioService],
})
export class NegocioModule {}