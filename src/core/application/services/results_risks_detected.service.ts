import { Injectable, Inject } from '@nestjs/common';
import { ResultadosRiesgosDetectados } from 'src/core/domain/model/results_risks_detected';
import { ResultadosRiesgosDetectadosRepositoryPort } from '../ports/results_risks_detected.ports';
import { CreateResultadosRiesgosDetectadosDto, UpdateResultadosRiesgosDetectadosDto } from 'src/core/insfrasture/controllers/dto/results_risks_detected.dto';
import { ResultadosRiesgosDetectadosMapper } from 'src/core/insfrasture/controllers/mappers/results_risks_detected.mapper';

@Injectable()
export class ResultadosRiesgosDetectadosService {
  constructor(
    @Inject(ResultadosRiesgosDetectadosRepositoryPort)
    private readonly repository: ResultadosRiesgosDetectadosRepositoryPort,
    private readonly mapper: ResultadosRiesgosDetectadosMapper,
  ) {}

  async crear(createDto: CreateResultadosRiesgosDetectadosDto): Promise<ResultadosRiesgosDetectados> {
    const nuevo = this.mapper.toDomainFromDto(createDto);
    return await this.repository.create(nuevo);
  }

  async obtenerPorId(id: number): Promise<ResultadosRiesgosDetectados | null> {
    return this.repository.findById(id);
  }

  async actualizar(id: number, updateDto: UpdateResultadosRiesgosDetectadosDto): Promise<ResultadosRiesgosDetectados | null> {
    return this.repository.update(id, updateDto);
  }

  async eliminar(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

  async obtenerTodos(): Promise<ResultadosRiesgosDetectados[]> {
    return this.repository.findAll();
  }
}
