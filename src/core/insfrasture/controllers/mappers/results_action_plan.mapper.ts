import { Injectable } from '@nestjs/common';
import { CreateResultadosPlanAccionDto } from '../dto/results_action_plan.dto';
import { ResultadosPlanAccion } from 'src/core/domain/model/results_action_plan';
import { Resultados_Plan_Accion as ResultadosPlanAccionPrismaModel } from 'generated/prisma';

@Injectable()
export class ResultadosPlanAccionMapper {
  toDomain(prisma: ResultadosPlanAccionPrismaModel): ResultadosPlanAccion {
    return new ResultadosPlanAccion(
      prisma.analisis_id,
      prisma.titulo,
      prisma.descripcion,
      prisma.prioridad
    );
  }

  toDomainFromDto(dto: CreateResultadosPlanAccionDto): ResultadosPlanAccion {
    return new ResultadosPlanAccion(
      dto.analisisId,
      dto.titulo,
      dto.descripcion,
      dto.prioridad
    );
  }
}
