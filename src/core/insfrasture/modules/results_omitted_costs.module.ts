import { Module } from '@nestjs/common';
import { ResultadosCostosOmitidosController } from '../controllers/results_omitted_costs.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultadosCostosOmitidosService } from 'src/core/application/services/results_omitted_costs.service';
import { ResultadosCostosOmitidosMapper } from '../controllers/mappers/results_omitted_costs.mapper';
import { ResultadosCostosOmitidosRepositoryPort } from 'src/core/application/ports/results_omitted_costs.ports';
import { ResultadoCostoOmitidoPrismaRepository } from '../adapters/persistence/results_omitted_costs.prisma.repository';

@Module({
  controllers: [ResultadosCostosOmitidosController],
  providers: [
    PrismaService,
    ResultadosCostosOmitidosService,
    ResultadosCostosOmitidosMapper,
    {
      provide: ResultadosCostosOmitidosRepositoryPort,
      useClass: ResultadoCostoOmitidoPrismaRepository,
    },
  ],
  exports: [ResultadosCostosOmitidosService],
})
export class ResultadosCostosOmitidosModule {}
