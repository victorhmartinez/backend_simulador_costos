import { Module } from '@nestjs/common';
import { ResultadosRiesgosDetectadosController } from '../controllers/results_risks_detected.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultadosRiesgosDetectadosService } from 'src/core/application/services/results_risks_detected.service';
import { ResultadosRiesgosDetectadosMapper } from '../controllers/mappers/results_risks_detected.mapper';
import { ResultadosRiesgosDetectadosRepositoryPort } from 'src/core/application/ports/results_risks_detected.ports';
import { ResultadoRiesgoDetectadoPrismaRepository } from '../adapters/persistence/results_risks_detected.prisma.repository';

@Module({
  controllers: [ResultadosRiesgosDetectadosController],
  providers: [
    PrismaService,
    ResultadosRiesgosDetectadosService,
    ResultadosRiesgosDetectadosMapper,
    {
      provide: ResultadosRiesgosDetectadosRepositoryPort,
      useClass: ResultadoRiesgoDetectadoPrismaRepository,
    },
  ],
  exports: [ResultadosRiesgosDetectadosService],
})
export class ResultadosRiesgosDetectadosModule {}
