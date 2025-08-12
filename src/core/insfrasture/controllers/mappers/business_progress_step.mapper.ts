// src/infrastructure/mappers/negocio-progreso-paso.mapper.ts

import { Injectable } from '@nestjs/common';
import { NegocioProgresoPaso as ProgresoPrismaModel } from '@prisma/client';
import { BusinessProgressStep } from 'src/core/domain/model/business_progress_step.model';
import { CreateBusinessProgressStepDto, UpdateBusinessProgressStepDto } from '../dto/business_progress_step.dto';


@Injectable()
export class 
BusinessProgressStepMapper {
  toDomain(prismaModel: ProgresoPrismaModel): BusinessProgressStep {
    return new BusinessProgressStep(
      prismaModel.negocio_id,
      prismaModel.modulo_id,
      prismaModel.id_estado,
      prismaModel.id,
      prismaModel.fecha_inicio === null ? undefined : prismaModel.fecha_inicio,
      prismaModel.fecha_completado === null ? undefined : prismaModel.fecha_completado,
    );
  }

  toDomainFromCreateDto(dto: CreateBusinessProgressStepDto): BusinessProgressStep {
    return new BusinessProgressStep(dto.negocioId, dto.moduloId, dto.estadoId);
  }

  toPartialDomainFromUpdateDto(dto: UpdateBusinessProgressStepDto): Partial<BusinessProgressStep> {
    const partialDomain: Partial<BusinessProgressStep> = {
      negocioId: dto.negocioId,
      moduloId: dto.moduloId,
      estadoId: dto.estadoId,
      fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : undefined,
      fechaCompletado: dto.fechaCompletado ? new Date(dto.fechaCompletado) : undefined,
    };
    return partialDomain;
  }
}