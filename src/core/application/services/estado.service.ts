// src/core/application/services/estado.service.ts

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EstadoRepositoryPort } from '../ports/estado.repository.port';

import { Estado } from '../../domain/model/estado.model';
import { EstadoMapper } from 'src/core/insfrasture/controllers/mappers/estado.mapper';
import { CreateEstadoDto, UpdateEstadoDto } from 'src/core/insfrasture/controllers/dto/estado.dto';

@Injectable()
export class EstadoService {
  constructor(
    @Inject(EstadoRepositoryPort)
    private readonly repository: EstadoRepositoryPort,
    private readonly mapper: EstadoMapper,
  ) {}

  async crear(dto: CreateEstadoDto): Promise<Estado> {
    const nuevoEstado = this.mapper.toDomainFromCreateDto(dto);
    return this.repository.create(nuevoEstado);
  }

  async obtenerTodos(): Promise<Estado[]> {
    return this.repository.findAll();
  }

  async obtenerPorId(id: number): Promise<Estado> {
    const estado = await this.repository.findById(id);
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado.`);
    }
    return estado;
  }

  async actualizar(id: number, dto: UpdateEstadoDto): Promise<Estado> {
    const estadoAActualizar = this.mapper.toDomainFromUpdateDto(dto);
    const estadoActualizado = await this.repository.update(id, estadoAActualizar);
    if (!estadoActualizado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado.`);
    }
    return estadoActualizado;
  }

  async eliminar(id: number): Promise<void> {
    const eliminado = await this.repository.delete(id);
    if (!eliminado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado.`);
    }
  }
}