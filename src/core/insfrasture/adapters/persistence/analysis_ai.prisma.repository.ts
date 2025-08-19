import { Injectable } from '@nestjs/common';
import { AnalisisIAMapper } from '../../controllers/mappers/analysis_ai.mapper';
import { AnalisisIA } from 'src/core/domain/model/analysis_ai';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AnalisisIARepositoryPort } from 'src/core/application/ports/analysis_ai.repository.ports';

@Injectable()
export class AnalisisIAPrismaRepository implements AnalisisIARepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: AnalisisIAMapper,
  ) {}

  async create(analisisIA: AnalisisIA): Promise<AnalisisIA> {
    const creado = await this.prisma.analisis_IA.create({
      data: {
        negocio_id: analisisIA.negocioId,
        fecha_analisis: analisisIA.fechaAnalisis,
      },
    });
    return this.mapper.toDomain(creado);
  }

  async findById(analisisId: number): Promise<AnalisisIA | null> {
    const encontrado = await this.prisma.analisis_IA.findUnique({
      where: { analisis_id: analisisId },
    });
    return encontrado ? this.mapper.toDomain(encontrado) : null;
  }

  async findAll(): Promise<AnalisisIA[]> {
    const todos = await this.prisma.analisis_IA.findMany();
    return todos.map((n) => this.mapper.toDomain(n));
  }

  async update(
    analisisId: number,
    analisisData: Partial<AnalisisIA>,
  ): Promise<AnalisisIA | null> {
    try {
      const actualizado = await this.prisma.analisis_IA.update({
        where: { analisis_id: analisisId },
        data: {
          negocio_id: analisisData.negocioId,
          fecha_analisis: analisisData.fechaAnalisis,
        },
      });
      return this.mapper.toDomain(actualizado);
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async delete(analisisId: number): Promise<boolean> {
    try {
      await this.prisma.analisis_IA.delete({
        where: { analisis_id: analisisId },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }
}
