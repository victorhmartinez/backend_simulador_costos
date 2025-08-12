import { Module } from '@nestjs/common';
import { ModuloController } from '../controllers/module.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ModulosService } from 'src/core/application/services/module.service';
import { ModulosMapper } from '../controllers/mappers/module.mapper';
import { ModulosRepositoryPort } from 'src/core/application/ports/module.repository.ports';
import { ModuloPrismaRepository } from '../adapters/persistence/module.prisma.repository';

@Module({
  controllers: [ModuloController],
  providers: [
    PrismaService,
    ModulosService,
    ModulosMapper,
    {
      provide: ModulosRepositoryPort,
      useClass: ModuloPrismaRepository,
    },
  ],
  exports: [ModulosService],
})
export class ModulosModule {}
