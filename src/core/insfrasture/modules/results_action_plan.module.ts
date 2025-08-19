import { Module } from '@nestjs/common';
import { ResultadosPlanAccionController } from '../controllers/results_action_plan.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultadosPlanAccionService } from 'src/core/application/services/results_action_plan.service';
import { ResultadosPlanAccionMapper } from '../controllers/mappers/results_action_plan.mapper';
import { ResultadosPlanAccionRepositoryPort } from 'src/core/application/ports/results_action_plan.ports';
import { ResultadoPlanAccionPrismaRepository } from '../adapters/persistence/results_action_plan.prisma.repository';

@Module({
  controllers: [ResultadosPlanAccionController],
  providers: [
    PrismaService,
    ResultadosPlanAccionService,
    ResultadosPlanAccionMapper,
    {
      provide: ResultadosPlanAccionRepositoryPort,
      useClass: ResultadoPlanAccionPrismaRepository,
    },
  ],
  exports: [ResultadosPlanAccionService],
})
export class ResultadosPlanAccionModule {}
