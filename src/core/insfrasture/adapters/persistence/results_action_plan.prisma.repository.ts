import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultadosPlanAccionRepositoryPort as ResultadoPlanAccionRepositoryPort } from 'src/core/application/ports/results_action_plan.ports';
import { ResultadosPlanAccion as ResultadoPlanAccion } from 'src/core/domain/model/results_action_plan';
import { ResultadosPlanAccionMapper as ResultadoPlanAccionMapper } from '../../controllers/mappers/results_action_plan.mapper';

@Injectable()
export class ResultadoPlanAccionPrismaRepository implements ResultadoPlanAccionRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ResultadoPlanAccionMapper,
  ) {}

  async create(plan: ResultadoPlanAccion): Promise<ResultadoPlanAccion> {
    const creado = await this.prisma.resultados_Plan_Accion.create({
      data: {
        analisis_id: plan.analisisId,
        titulo: plan.titulo,
        descripcion: plan.descripcion,
        prioridad: plan.prioridad,
      },
    });
    return this.mapper.toDomain(creado);
  }

  async findById(id: number): Promise<ResultadoPlanAccion | null> {
    const encontrado = await this.prisma.resultados_Plan_Accion.findUnique({
      where: { plan_id: id },
    });
    return encontrado ? this.mapper.toDomain(encontrado) : null;
  }

  async findAllByAnalisis(analisisId: number): Promise<ResultadoPlanAccion[]> {
    const encontrados = await this.prisma.resultados_Plan_Accion.findMany({
      where: { analisis_id: analisisId },
    });
    return encontrados.map((r) => this.mapper.toDomain(r));
  }

  async update(id: number, data: Partial<ResultadoPlanAccion>): Promise<ResultadoPlanAccion | null> {
    try {
      const actualizado = await this.prisma.resultados_Plan_Accion.update({
        where: { plan_id: id },
        data: {
          titulo: data.titulo,
          descripcion: data.descripcion,
          prioridad: data.prioridad,
        },
      });
      return this.mapper.toDomain(actualizado);
    } catch (error) {
      if (error.code === 'P2025') return null;
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.resultados_Plan_Accion.delete({ where: { plan_id: id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') return false;
      throw error;
    }
  }
}
