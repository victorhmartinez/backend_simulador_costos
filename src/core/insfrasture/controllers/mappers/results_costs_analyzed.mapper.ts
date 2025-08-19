import { Injectable } from '@nestjs/common';
import { CreateResultadosCostosAnalizadosDto } from '../dto/results_costs_analyzed.dto';
import { ResultadosCostosAnalizados } from 'src/core/domain/model/Results_Costs_Analyzed';
import { Resultados_Costos_Analizados as ResultadosCostosAnalizadosPrismaModel } from 'generated/prisma';

@Injectable()
export class ResultadosCostosAnalizadosMapper {
  toDomain(prisma: ResultadosCostosAnalizadosPrismaModel): ResultadosCostosAnalizados {
    return new ResultadosCostosAnalizados(
      prisma.analisis_id,
      prisma.nombre_costo,
      prisma.valor_recibido,
      prisma.rango_estimado,
      prisma.evaluacion,
      prisma.comentario
    );
  }

  toDomainFromDto(dto: CreateResultadosCostosAnalizadosDto): ResultadosCostosAnalizados {
    return new ResultadosCostosAnalizados(
      dto.analisisId,
      dto.nombreCosto,
      dto.valorRecibido,
      dto.rangoEstimado,
      dto.evaluacion,
      dto.comentario
    );
  }
}
