import { Injectable } from '@nestjs/common';
import { CreateResultadosCostosOmitidosDto } from '../dto/results_omitted_costs.dto';
import { ResultadosCostosOmitidos } from 'src/core/domain/model/results_omitted_costs';
import { Resultados_Costos_Omitidos as ResultadosCostosOmitidosPrismaModel } from 'generated/prisma';

@Injectable()
export class ResultadosCostosOmitidosMapper {
  toDomain(prisma: ResultadosCostosOmitidosPrismaModel): ResultadosCostosOmitidos {
    return new ResultadosCostosOmitidos(
      prisma.analisis_id,
      prisma.costo_omitido,
      prisma.importancia
    );
  }

  toDomainFromDto(dto: CreateResultadosCostosOmitidosDto): ResultadosCostosOmitidos {
    return new ResultadosCostosOmitidos(
      dto.analisisId,
      dto.costoOmitido,
      dto.importancia
    );
  }
}
