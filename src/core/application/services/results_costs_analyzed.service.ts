import { Injectable, Inject } from '@nestjs/common';
import { ResultadosCostosAnalizados } from 'src/core/domain/model/Results_Costs_Analyzed';
import { ResultadosCostosAnalizadosRepositoryPort } from '../ports/results_costs_analyzed.port';
import { CreateResultadosCostosAnalizadosDto, UpdateResultadosCostosAnalizadosDto } from 'src/core/insfrasture/controllers/dto/results_costs_analyzed.dto';
import { ResultadosCostosAnalizadosMapper } from 'src/core/insfrasture/controllers/mappers/results_costs_analyzed.mapper';

@Injectable()
export class ResultadosCostosAnalizadosService {
  constructor(
    @Inject(ResultadosCostosAnalizadosRepositoryPort)
    private readonly repository: ResultadosCostosAnalizadosRepositoryPort,
    private readonly mapper: ResultadosCostosAnalizadosMapper,
  ) {}

  async crear(createDto: CreateResultadosCostosAnalizadosDto): Promise<ResultadosCostosAnalizados> {
    const nuevo = this.mapper.toDomainFromDto(createDto);
    return await this.repository.create(nuevo);
  }

  async obtenerPorId(id: number): Promise<ResultadosCostosAnalizados | null> {
    return this.repository.findById(id);
  }

  async actualizar(id: number, updateDto: UpdateResultadosCostosAnalizadosDto): Promise<ResultadosCostosAnalizados | null> {
    return this.repository.update(id, updateDto);
  }

  async eliminar(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

  async obtenerTodos(): Promise<ResultadosCostosAnalizados[]> {
    return this.repository.findAll();
  }
}
