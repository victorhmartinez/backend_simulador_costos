import { Injectable } from '@nestjs/common';
import { CreateResultadosRiesgosDetectadosDto } from '../dto/results_risks_detected.dto';
import { ResultadosRiesgosDetectados } from 'src/core/domain/model/results_risks_detected';
import { Resultados_Riesgos_Detectados as ResultadosRiesgosDetectadosPrismaModel } from 'generated/prisma';

@Injectable()
export class ResultadosRiesgosDetectadosMapper {
  toDomain(prisma: ResultadosRiesgosDetectadosPrismaModel): ResultadosRiesgosDetectados {
    return new ResultadosRiesgosDetectados(
      prisma.analisis_id,
      prisma.riesgo,
      prisma.causa_directa,
      prisma.impacto_potencial
    );
  }

  toDomainFromDto(dto: CreateResultadosRiesgosDetectadosDto): ResultadosRiesgosDetectados {
    return new ResultadosRiesgosDetectados(
      dto.analisisId,
      dto.riesgo,
      dto.causaDirecta,
      dto.impactoPotencial
    );
  }
}
