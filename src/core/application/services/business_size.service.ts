import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BusinessSizeMapper } from "src/core/insfrasture/controllers/mappers/business_size.mapper";
import { BusinessSizeRepositoryPort } from "../ports/business_size.repository.ports";
import { BusinessSize } from "src/core/domain/model/business_size";
import { CreateBusinessSizeiDto, UpdateBusinessSizeDto } from "src/core/insfrasture/controllers/dto/business_size.dto";

@Injectable()
export class BusinessSizeService{
    constructor(
    @Inject(BusinessSizeRepositoryPort)
    private readonly businessSizerepository: BusinessSizeRepositoryPort,
    private readonly mapper: BusinessSizeMapper,
  ) {}

    async crear(dto: CreateBusinessSizeiDto): Promise<BusinessSize> {
    const nuevoTamano = this.mapper.toDomainFromDto(dto);
    return this.businessSizerepository.create(nuevoTamano);
  }

  async obtenerPorId(id: number): Promise<BusinessSize> {
    const tamano = await this.businessSizerepository.findById(id);
    if (!tamano) {
      throw new NotFoundException(`Tamaño de negocio con ID ${id} no encontrado.`);
    }
    return tamano;
  }

  async obtenerTodos(): Promise<BusinessSize[]> {
    return this.businessSizerepository.findAll();
  }

   async actualizar(id: number, dto: UpdateBusinessSizeDto): Promise<BusinessSize> {
    // Para la actualización, también mapeamos del DTO al Dominio
    const tamanoAActualizar = new BusinessSize(dto.tamanoNombre);
    const tamanoActualizado = await this.businessSizerepository.update(id, tamanoAActualizar);

    if (!tamanoActualizado) {
      throw new NotFoundException(`Tamaño de negocio con ID ${id} no encontrado.`);
    }
    return tamanoActualizado;
  }

  // --- NUEVO CASO DE USO: ELIMINAR ---
  async eliminar(id: number): Promise<void> {
    const eliminado = await this.businessSizerepository.delete(id);
    if (!eliminado) {
      throw new NotFoundException(`Tamaño de negocio con ID ${id} no encontrado.`);
    }
  }
}