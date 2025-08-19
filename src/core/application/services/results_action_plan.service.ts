import { Injectable, Inject } from '@nestjs/common';
import { ResultadosPlanAccion } from 'src/core/domain/model/results_action_plan';
import { ResultadosPlanAccionRepositoryPort } from '../ports/results_action_plan.ports';
import { CreateResultadosPlanAccionDto, UpdateResultadosPlanAccionDto } from 'src/core/insfrasture/controllers/dto/results_action_plan.dto';
import { ResultadosPlanAccionMapper } from 'src/core/insfrasture/controllers/mappers/results_action_plan.mapper';

@Injectable()
export class ResultadosPlanAccionService {
  constructor(
    @Inject(ResultadosPlanAccionRepositoryPort)
    private readonly repository: ResultadosPlanAccionRepositoryPort,
    private readonly mapper: ResultadosPlanAccionMapper,
  ) {}

  async crear(createDto: CreateResultadosPlanAccionDto): Promise<ResultadosPlanAccion> {
    const nuevo = this.mapper.toDomainFromDto(createDto);
    return await this.repository.create(nuevo);
  }

  async obtenerPorId(id: number): Promise<ResultadosPlanAccion | null> {
    return this.repository.findById(id);
  }

  async actualizar(id: number, updateDto: UpdateResultadosPlanAccionDto): Promise<ResultadosPlanAccion | null> {
    return this.repository.update(id, updateDto);
  }

  async eliminar(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

  async obtenerTodos(): Promise<ResultadosPlanAccion[]> {
    return this.repository.findAll();
  }
}
