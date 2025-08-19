import { Module } from '@nestjs/common';
import { ResultadosCostosController } from '../controllers/results_costs_analyzed.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultadosCostosAnalizadosService } from 'src/core/application/services/results_costs_analyzed.service';
import { ResultadosCostosAnalizadosMapper } from '../controllers/mappers/results_costs_analyzed.mapper';
import { ResultadosCostosAnalizadosRepositoryPort } from 'src/core/application/ports/results_costs_analyzed.port';
import { ResultadoCostoAnalizadoPrismaRepository } from '../adapters/persistence/results_costs_analyzed.prisma.reporitory';

@Module({
  controllers: [ResultadosCostosController],
  providers: [
    PrismaService,
    ResultadosCostosAnalizadosService,
    ResultadosCostosAnalizadosMapper,
    {
      provide: ResultadosCostosAnalizadosRepositoryPort,
      useClass: ResultadoCostoAnalizadoPrismaRepository,
    },
  ],
  exports: [ResultadosCostosAnalizadosService],
})
export class ResultadosCostosAnalizadosModule {}
