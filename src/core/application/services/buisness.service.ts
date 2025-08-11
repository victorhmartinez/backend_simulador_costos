// src/core/application/services/negocio.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { Negocio } from 'src/core/domain/model/business';
import { NegocioRepositoryPort } from '../ports/business.repository.ports';
import { CreateNegocioDto, UpdateNegocioDto } from 'src/core/insfrasture/controllers/dto/business.dto';
import { NegocioMapper } from 'src/core/insfrasture/controllers/mappers/business.mapper';

@Injectable()
export class NegocioService {
  constructor(
    // Inyectamos el puerto, NestJS nos dará la implementación concreta (Prisma)
    @Inject(NegocioRepositoryPort)
    private readonly negocioRepository: NegocioRepositoryPort,
    private readonly negocioMapper: NegocioMapper,
  ) { }

  async crearNegocio(createNegocioDto: CreateNegocioDto): Promise<Negocio> {
    // 1. Mapeamos del DTO a nuestro modelo de dominio
    const nuevoNegocio = this.negocioMapper.toDomainFromDto(createNegocioDto);

    // 2. Usamos el repositorio para guardar el nuevo negocio
    const negocioCreado = await this.negocioRepository.create(nuevoNegocio);

    // 3. Retornamos el resultado (el controller lo mapeará a un DTO de respuesta si es necesario)
    return negocioCreado;
  }

  async obtenerNegocioPorId(id: number): Promise<Negocio | null> {
    return this.negocioRepository.findById(id);
  }

  async obtenerNegociosPorUsuario(usuarioId: number): Promise<Negocio[]> {
    return this.negocioRepository.findByUserId(usuarioId);
  }

  async actualizarNegocio(id: number, updateNegocioDto: UpdateNegocioDto): Promise<Negocio | null> {
    // El DTO ya se convierte en un Partial<Negocio> implícitamente
    const negocioActualizado = await this.negocioRepository.update(id, updateNegocioDto);



    return negocioActualizado;
  }


  async eliminarNegocio(id: number): Promise<void> {
    const eliminado = await this.negocioRepository.delete(id);

  }
  async obtenerTodosLosNegocios(): Promise<Negocio[]> {
    return this.negocioRepository.findAll();
  }
}