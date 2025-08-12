import { Injectable, Inject } from '@nestjs/common';
import { Aprendizaje } from 'src/core/domain/model/learning';
import { AprendizajeRepositoryPort } from '../ports/learning.repository.ports';
import { CreateAprendizajeDto, UpdateAprendizajeDto } from 'src/core/insfrasture/controllers/dto/learning.dto';
import { AprendizajeMapper } from 'src/core/insfrasture/controllers/mappers/learning.mapper';

@Injectable()
export class AprendizajeService {
  constructor(
    // Inyectamos el puerto, NestJS nos dará la implementación concreta (Prisma)
    @Inject(AprendizajeRepositoryPort)
    private readonly aprendizajeRepository: AprendizajeRepositoryPort,
    private readonly aprendizajeMapper: AprendizajeMapper,
  ) { }

  async crearAprendizaje(createAprendizajeDto: CreateAprendizajeDto): Promise<Aprendizaje> {
    // 1. Mapeamos del DTO a nuestro modelo de dominio
    const nuevoAprendizaje = this.aprendizajeMapper.toDomainFromDto(createAprendizajeDto);

    // 2. Usamos el repositorio para guardar el nuevo Aprendizaje
    const aprendizajeCreado = await this.aprendizajeRepository.create(nuevoAprendizaje);

    // 3. Retornamos el resultado (el controller lo mapeará a un DTO de respuesta si es necesario)
    return aprendizajeCreado;
  }

  async obtenerAprendizajePorId(id: number): Promise<Aprendizaje | null> {
    return this.aprendizajeRepository.findById(id);
  }

  async actualizarAprendizaje(id: number, updateAprendizajeDto: UpdateAprendizajeDto): Promise<Aprendizaje | null> {
    // El DTO ya se convierte en un Partial<Aprendizaje> implícitamente
    const aprendizajeActualizado = await this.aprendizajeRepository.update(id, updateAprendizajeDto);



    return aprendizajeActualizado;
  }


  async eliminarAprendizaje(id: number): Promise<void> {
    const eliminado = await this.aprendizajeRepository.delete(id);

  }
  async obtenerTodosLosAprendizajes(): Promise<Aprendizaje[]> {
    return this.aprendizajeRepository.findAll();
  }
}