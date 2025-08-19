import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultadosCostosAnalizadosRepositoryPort as ResultadoCostoAnalizadoRepositoryPort } from 'src/core/application/ports/results_costs_analyzed.port';
import { ResultadosCostosAnalizados as ResultadoCostoAnalizado } from 'src/core/domain/model/Results_Costs_Analyzed';
import { ResultadosCostosAnalizadosMapper as ResultadoCostoAnalizadoMapper } from '../../controllers/mappers/results_costs_analyzed.mapper';

@Injectable()
export class ResultadoCostoAnalizadoPrismaRepository implements ResultadoCostoAnalizadoRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ResultadoCostoAnalizadoMapper,
  ) {}

  async create(resultado: ResultadoCostoAnalizado): Promise<ResultadoCostoAnalizado> {
    const creado = await this.prisma.resultados_Costos_Analizados.create({
      data: {
        analisis_id: resultado.analisisId,
        nombre_costo: resultado.nombreCosto,
        valor_recibido: resultado.valorRecibido,
        rango_estimado: resultado.rangoEstimado,
        evaluacion: resultado.evaluacion,
        comentario: resultado.comentario,
      },
    });
    return this.mapper.toDomain(creado);
  }

  async findById(id: number): Promise<ResultadoCostoAnalizado | null> {
    const encontrado = await this.prisma.resultados_Costos_Analizados.findUnique({
      where: { resultado_costo_id: id },
    });
    return encontrado ? this.mapper.toDomain(encontrado) : null;
  }

  async findAllByAnalisis(analisisId: number): Promise<ResultadoCostoAnalizado[]> {
    const encontrados = await this.prisma.resultados_Costos_Analizados.findMany({
      where: { analisis_id: analisisId },
    });
    return encontrados.map((r) => this.mapper.toDomain(r));
  }

  async update(id: number, data: Partial<ResultadoCostoAnalizado>): Promise<ResultadoCostoAnalizado | null> {
    try {
      const actualizado = await this.prisma.resultados_Costos_Analizados.update({
        where: { resultado_costo_id: id },
        data: {
          nombre_costo: data.nombreCosto,
          valor_recibido: data.valorRecibido,
          rango_estimado: data.rangoEstimado,
          evaluacion: data.evaluacion,
          comentario: data.comentario,
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
      await this.prisma.resultados_Costos_Analizados.delete({ where: { resultado_costo_id: id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') return false;
      throw error;
    }
  }
}
