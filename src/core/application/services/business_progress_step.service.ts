import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BusinessProgressStepRepositoryPort } from '../ports/business_progress_step.repository.ports';
import { BusinessProgressStepMapper } from 'src/core/insfrasture/controllers/mappers/business_progress_step.mapper';
import { CreateBusinessProgressStepDto, UpdateBusinessProgressStepDto } from 'src/core/insfrasture/controllers/dto/business_progress_step.dto';
import { BusinessProgressStep } from 'src/core/domain/model/business_progress_step.model';

@Injectable()
export class BusinessProgressStepService {
  constructor(
    @Inject(BusinessProgressStepRepositoryPort)
    private readonly repository: BusinessProgressStepRepositoryPort,
    private readonly mapper: BusinessProgressStepMapper,
  ) {}

  async crear(dto: CreateBusinessProgressStepDto): Promise<BusinessProgressStep> {
    const nuevoProgreso = this.mapper.toDomainFromCreateDto(dto);
    return this.repository.create(nuevoProgreso);
  }

  async obtenerTodos(): Promise<BusinessProgressStep[]> {
    return this.repository.findAll();
  }

  async obtenerPorId(id: number): Promise<BusinessProgressStep> {
    const progreso = await this.repository.findById(id);
    if (!progreso) throw new NotFoundException(`Registro de progreso con ID ${id} no encontrado.`);
    return progreso;
  }

  async obtenerPorNegocioId(negocioId: number): Promise<BusinessProgressStep[]> {
      return this.repository.findByNegocioId(negocioId);
  }

  async actualizar(id: number, dto: UpdateBusinessProgressStepDto): Promise<BusinessProgressStep> {
    const datosParaActualizar = this.mapper.toPartialDomainFromUpdateDto(dto);
    const progresoActualizado = await this.repository.update(id, datosParaActualizar);
    if (!progresoActualizado) throw new NotFoundException(`Registro de progreso con ID ${id} no encontrado.`);
    return progresoActualizado;
  }

  async eliminar(id: number): Promise<void> {
    const eliminado = await this.repository.delete(id);
    if (!eliminado) throw new NotFoundException(`Registro de progreso con ID ${id} no encontrado.`);
  }
}