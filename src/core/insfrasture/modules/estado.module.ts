// src/infrastructure/modules/estado.module.ts

import { Module } from '@nestjs/common';
import { EstadoController } from '../controllers/estado.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { EstadoService } from 'src/core/application/services/estado.service';
import { EstadoMapper } from '../controllers/mappers/estado.mapper';
import { EstadoRepositoryPort } from 'src/core/application/ports/estado.repository.port';
import { EstadoPrismaRepository } from '../adapters/persistence/estado.prisma.repository';


@Module({
  controllers: [EstadoController],
  providers: [
    PrismaService,
    EstadoService,
    EstadoMapper,
    {
      provide: EstadoRepositoryPort,
      useClass: EstadoPrismaRepository,
    },
  ],
})
export class EstadoModule {}