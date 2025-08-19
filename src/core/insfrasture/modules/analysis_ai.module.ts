import { Module } from '@nestjs/common';
import { AnalisisIAController } from '../controllers/analysis_ai.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AnalisisIAService } from 'src/core/application/services/analysis_ai.service';
import { AnalisisIAMapper } from '../controllers/mappers/analysis_ai.mapper';
import { AnalisisIARepositoryPort } from 'src/core/application/ports/analysis_ai.repository.ports';
import { AnalisisIAPrismaRepository } from '../adapters/persistence/analysis_ai.prisma.repository';

@Module({
  controllers: [AnalisisIAController],
  providers: [
    PrismaService,
    AnalisisIAService,
    AnalisisIAMapper,
    {
      provide: AnalisisIARepositoryPort,
      useClass: AnalisisIAPrismaRepository,
    },
  ],
  exports: [AnalisisIAService],
})
export class AnalisisIAModule {}
