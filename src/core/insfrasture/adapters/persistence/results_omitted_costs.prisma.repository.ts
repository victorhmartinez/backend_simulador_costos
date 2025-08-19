import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultadosCostosOmitidosRepositoryPort as ResultadoCostoOmitidoRepositoryPort } from 'src/core/application/ports/results_omitted_costs.ports';
import { ResultadosCostosOmitidos as ResultadoCostoOmitido } from 'src/core/domain/model/results_omitted_costs';
import { ResultadosCostosOmitidosMapper as ResultadoCostoOmitidoMapper } from '../../controllers/mappers/results_omitted_costs.mapper';

@Injectable()
export class ResultadoCostoOmitidoPrismaRepository implements ResultadoCostoOmitidoRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ResultadoCostoOmitidoMapper,
  ) {}

  async create(resultado: ResultadoCostoOmitido): Promise<ResultadoCostoOmitido> {
    const creado = await this.prisma.resultados_Costos_Omitidos.create({
      data: {
        analisis_id: resultado.analisisId,
        nombre_costo: resultado.nombreCosto,
        valor_estimado: resultado.valorEstimado,
        razon_omision: resultado.razonOmision,
        comentario: resultado.comentario,
      },
    });
    return this.mapper.toDomain(creado);
  }

  async findById(id: number): Promise<ResultadoCostoOmitido | null> {
    const encontrado = await this.prisma.resultados_Costos_Omitidos.findUnique({
      where: { costo_omitido_id: id },
    });
    return encontrado ? this.mapper.toDomain(encontrado) : null;
  }

  async findAllByAnalisis(analisisId: number): Promise<ResultadoCostoOmitido[]> {
    const encontrados = await this.prisma.resultados_Costos_Omitidos.findMany({
      where: { analisis_id: analisisId },
    });
    return encontrados.map((r) => this.mapper.toDomain(r));
  }

  async update(id: number, data: Partial<ResultadoCostoOmitido>): Promise<ResultadoCostoOmitido | null> {
    try {
      const actualizado = await this.prisma.resultados_Costos_Omitidos.update({
        where: { costo_omitido_id: id },
        data: {
          nombre_costo: data.nombreCosto,
          valor_estimado: data.valorEstimado,
          razon_omision: data.razonOmision,
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
      await this.prisma.resultados_Costos_Omitidos.delete({ where: { costo_omitido_id: id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') return false;
      throw error;
    }
  }
}
