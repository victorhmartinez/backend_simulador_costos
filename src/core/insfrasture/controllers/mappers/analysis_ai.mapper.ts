import { Injectable } from '@nestjs/common';
import { CreateAnalisisIADto } from '../dto/analysis_ai.dto';
import { AnalisisIA } from 'src/core/domain/model/analysis_ai';
import { Analisis_IA as AnalisisIAPrismaModel } from 'generated/prisma';

@Injectable()
export class AnalisisIAMapper {
  // Convierte desde el modelo de Prisma al modelo de Dominio
  toDomain(prismaAnalisis: AnalisisIAPrismaModel): AnalisisIA {
    return new AnalisisIA(
      prismaAnalisis.negocio_id,
      prismaAnalisis.fecha_analisis
    );
  }

  // Convierte desde un DTO de creación al modelo de Dominio
  toDomainFromDto(dto: CreateAnalisisIADto): AnalisisIA {
    return new AnalisisIA(
      dto.negocioId,
      dto.fechaAnalisis
    );
  }
}
