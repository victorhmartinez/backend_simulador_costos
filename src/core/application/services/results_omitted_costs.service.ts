import { Injectable, Inject } from '@nestjs/common';
import { ResultadosCostosOmitidos } from 'src/core/domain/model/results_omitted_costs';
import { ResultadosCostosOmitidosRepositoryPort } from '../ports/results_omitted_costs.ports';
import { CreateResultadosCostosOmitidosDto, UpdateResultadosCostosOmitidosDto } from 'src/core/insfrasture/controllers/dto/results_omitted_costs.dto';
import { ResultadosCostosOmitidosMapper } from 'src/core/insfrasture/controllers/mappers/results_omitted_costs.mapper';

@Injectable()
export class ResultadosCostosOmitidosService {
  constructor(
    @Inject(ResultadosCostosOmitidosRepositoryPort)
    private readonly repository: ResultadosCostosOmitidosRepositoryPort,
    private readonly mapper: ResultadosCostosOmitidosMapper,
  ) {}

  async crear(createDto: CreateResultadosCostosOmitidosDto): Promise<ResultadosCostosOmitidos> {
    const nuevo = this.mapper.toDomainFromDto(createDto);
    return await this.repository.create(nuevo);
  }

  async obtenerPorId(id: number): Promise<ResultadosCostosOmitidos | null> {
    return this.repository.findById(id);
  }

  async actualizar(id: number, updateDto: UpdateResultadosCostosOmitidosDto): Promise<ResultadosCostosOmitidos | null> {
    return this.repository.update(id, updateDto);
  }

  async eliminar(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

  async obtenerTodos(): Promise<ResultadosCostosOmitidos[]> {
    return this.repository.findAll();
  }
}
