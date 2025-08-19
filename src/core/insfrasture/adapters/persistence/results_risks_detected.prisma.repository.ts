import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultadosRiesgosDetectadosRepositoryPort as ResultadoRiesgoRepositoryPort } from 'src/core/application/ports/results_risks_detected.ports';
import { ResultadosRiesgosDetectados as ResultadoRiesgoDetectado } from 'src/core/domain/model/results_risks_detected';
import { ResultadosRiesgosDetectadosMapper as ResultadoRiesgoMapper } from '../../controllers/mappers/results_risks_detected.mapper';

@Injectable()
export class ResultadoRiesgoDetectadoPrismaRepository implements ResultadoRiesgoRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ResultadoRiesgoMapper,
  ) {}

  async create(riesgo: ResultadoRiesgoDetectado): Promise<ResultadoRiesgoDetectado> {
    const creado = await this.prisma.resultados_Riesgos_Detectados.create({
      data: {
        analisis_id: riesgo.analisisId,
        riesgo: riesgo.riesgo,
        causa_directa: riesgo.causaDirecta,
        impacto_potencial: riesgo.impactoPotencial,
      },
    });
    return this.mapper.toDomain(creado);
  }

  async findById(id: number): Promise<ResultadoRiesgoDetectado | null> {
    const encontrado = await this.prisma.resultados_Riesgos_Detectados.findUnique({
      where: { riesgo_id: id },
    });
    return encontrado ? this.mapper.toDomain(encontrado) : null;
  }

  async findAllByAnalisis(analisisId: number): Promise<ResultadoRiesgoDetectado[]> {
    const encontrados = await this.prisma.resultados_Riesgos_Detectados.findMany({
      where: { analisis_id: analisisId },
    });
    return encontrados.map((r) => this.mapper.toDomain(r));
  }

  async update(id: number, data: Partial<ResultadoRiesgoDetectado>): Promise<ResultadoRiesgoDetectado | null> {
    try {
      const actualizado = await this.prisma.resultados_Riesgos_Detectados.update({
        where: { riesgo_id: id },
        data: {
          riesgo: data.riesgo,
          causa_directa: data.causaDirecta,
          impacto_potencial: data.impactoPotencial,
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
      await this.prisma.resultados_Riesgos_Detectados.delete({ where: { riesgo_id: id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') return false;
      throw error;
    }
  }
}
