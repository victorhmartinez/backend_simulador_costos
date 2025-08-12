
import { Injectable } from '@nestjs/common';

import { BusinessProgressStep } from 'src/core/domain/model/business_progress_step.model';
import { BusinessProgressStepMapper } from '../../controllers/mappers/business_progress_step.mapper';
import { PrismaService } from 'src/common/prisma/prisma.service';


@Injectable()
export class BusinessProgressStepPrismaRepository implements BusinessProgressStepPrismaRepository {
  constructor(
    private readonly prismaBusinessProgressStep: PrismaService,
    private readonly mapper: BusinessProgressStepMapper,
  ) {}

  async create(progreso: BusinessProgressStep): Promise<BusinessProgressStep> {
    const nuevoProgreso = await this.prismaBusinessProgressStep.negocioProgresoPaso.create({
      data: {
        negocio_id: progreso.negocioId,
        modulo_id: progreso.moduloId,
        id_estado: progreso.estadoId,
      },
    });
    return this.mapper.toDomain(nuevoProgreso);
  }

  async findById(id: number): Promise<BusinessProgressStep | null> {
    const progreso = await this.prismaBusinessProgressStep.negocioProgresoPaso.findUnique({ where: { id } });
    return progreso ? this.mapper.toDomain(progreso) : null;
  }

  async findAll(): Promise<BusinessProgressStep[]> {
    const progresos = await this.prismaBusinessProgressStep.negocioProgresoPaso.findMany();
    return progresos.map(this.mapper.toDomain);
  }

  async findByNegocioId(negocioId: number): Promise<BusinessProgressStep[]> {
      const progresos = await this.prismaBusinessProgressStep.negocioProgresoPaso.findMany({
          where: { negocio_id: negocioId }
      });
      return progresos.map(this.mapper.toDomain);
  }

  async update(id: number, progresoData: Partial<BusinessProgressStep>): Promise<BusinessProgressStep | null> {
    try {
      const progresoActualizado = await this.prismaBusinessProgressStep.negocioProgresoPaso.update({
        where: { id },
        data: {
          negocio_id: progresoData.negocioId,
          modulo_id: progresoData.moduloId,
          id_estado: progresoData.estadoId,
          fecha_inicio: progresoData.fechaInicio,
          fecha_completado: progresoData.fechaCompletado,
        },
      });
      return this.mapper.toDomain(progresoActualizado);
    } catch (error) {
      if (error.code === 'P2025') return null;
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prismaBusinessProgressStep.negocioProgresoPaso.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') return false;
      throw error;
    }
  }
}