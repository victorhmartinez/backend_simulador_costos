import { Injectable, Inject } from '@nestjs/common';
import { Modulos } from 'src/core/domain/model/module';
import { ModulosRepositoryPort } from '../ports/module.repository.ports';
import { CreateModulosDto, UpdateModuloDto } from 'src/core/insfrasture/controllers/dto/module.dto';
import { ModulosMapper } from 'src/core/insfrasture/controllers/mappers/module.mapper';

@Injectable()
export class ModulosService {
  constructor(
    @Inject(ModulosRepositoryPort)
    private readonly moduloRepository: ModulosRepositoryPort,
    private readonly moduloMapper: ModulosMapper,
  ) {}

  async crearModulo(createModuloDto: CreateModulosDto): Promise<Modulos> {
    const nuevoModulo = this.moduloMapper.toDomainFromDto(createModuloDto);
    const moduloCreado = await this.moduloRepository.create(nuevoModulo);
    return moduloCreado;
  }

  async obtenerModuloPorId(id: number): Promise<Modulos | null> {
    return this.moduloRepository.findById(id);
  }

  async actualizarModulo(id: number, updateModuloDto: UpdateModuloDto): Promise<Modulos | null> {
    const moduloActualizado = await this.moduloRepository.update(id, updateModuloDto);
    return moduloActualizado;
  }

  async eliminarModulo(id: number): Promise<void> {
    await this.moduloRepository.delete(id);
  }

  async obtenerTodosLosModulos(): Promise<Modulos[]> {
    return this.moduloRepository.findAll();
  }
}
