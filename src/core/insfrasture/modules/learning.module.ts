import { Module } from '@nestjs/common';
import { AprendizajeController } from '../controllers/learning.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AprendizajeService } from 'src/core/application/services/learning.service';
import { AprendizajeMapper } from '../controllers/mappers/learning.mapper';
import { AprendizajeRepositoryPort } from 'src/core/application/ports/learning.repository.ports';
import { AprendizajePrismaRepository } from '../adapters/persistence/learning.prisma.repository';

@Module({
  controllers: [AprendizajeController],
  providers: [
    PrismaService,
    AprendizajeService,
    AprendizajeMapper,
    {
      provide: AprendizajeRepositoryPort,
      useClass: AprendizajePrismaRepository,
    },
  ],
  exports: [AprendizajeService],
})
export class AprendizajeModule {}
