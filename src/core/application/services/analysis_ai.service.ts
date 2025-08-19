import { Injectable, Inject } from '@nestjs/common';
import { AnalisisIA } from 'src/core/domain/model/analysis_ai';
import { AnalisisIARepositoryPort } from '../ports/analysis_ai.repository.ports';
import { CreateAnalisisIADto, UpdateAnalisisIADto } from 'src/core/insfrasture/controllers/dto/analysis_ai.dto';
import { AnalisisIAMapper } from 'src/core/insfrasture/controllers/mappers/analysis_ai.mapper';

@Injectable()
export class AnalisisIAService {
  constructor(
    @Inject(AnalisisIARepositoryPort)
    private readonly analisisIARepository: AnalisisIARepositoryPort,
    private readonly analisisIAMapper: AnalisisIAMapper,
  ) {}

  async crearAnalisisIA(createAnalisisIADto: CreateAnalisisIADto): Promise<AnalisisIA> {
    const nuevoAnalisis = this.analisisIAMapper.toDomainFromDto(createAnalisisIADto);
    return await this.analisisIARepository.create(nuevoAnalisis);
  }

  async obtenerAnalisisIAPorId(id: number): Promise<AnalisisIA | null> {
    return this.analisisIARepository.findById(id);
  }

  async actualizarAnalisisIA(id: number, updateAnalisisIADto: UpdateAnalisisIADto): Promise<AnalisisIA | null> {
    return this.analisisIARepository.update(id, updateAnalisisIADto);
  }

  async eliminarAnalisisIA(id: number): Promise<boolean> {
    return this.analisisIARepository.delete(id);
  }

  async obtenerTodosLosAnalisisIA(): Promise<AnalisisIA[]> {
    return this.analisisIARepository.findAll();
  }
}
