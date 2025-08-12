import { Injectable } from '@nestjs/common';
import { ModulosMapper } from '../../controllers/mappers/module.mapper';
import { Modulos } from 'src/core/domain/model/module';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ModulosRepositoryPort } from 'src/core/application/ports/module.repository.ports';

@Injectable()
export class ModuloPrismaRepository implements ModulosRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ModulosMapper,
  ) {}

  async create(modulo: Modulos): Promise<Modulos> {
    const moduloCreado = await this.prisma.modulos.create({
      data: {
        nombre_modulo: modulo.nombreModulo,
        concepto: modulo.concepto ?? '',
        id_aprendizaje: modulo.aprendizajeId,
        orden_modulo: modulo.ordenModulo,
        recurso_interactivo: modulo.recursoInteractivo,
        titulo_conteido: modulo.tituloContenido,
      },
    });
    return this.mapper.toDomain(moduloCreado);
  }

  async findById(moduloId: number): Promise<Modulos | null> {
    const moduloEncontrado = await this.prisma.modulos.findUnique({
      where: { id_modulo: moduloId },
    });
    return moduloEncontrado ? this.mapper.toDomain(moduloEncontrado) : null;
  }

  async findAll(): Promise<Modulos[]> {
    const todos = await this.prisma.modulos.findMany();
    return todos.map((m) => this.mapper.toDomain(m));
  }

  async update(moduloId: number, moduloData: Partial<Modulos>): Promise<Modulos | null> {
    try {
      const moduloActualizado = await this.prisma.modulos.update({
        where: { id_modulo: moduloId },
        data: {
          nombre_modulo: moduloData.nombreModulo,
          concepto: moduloData.concepto,
          id_aprendizaje: moduloData.aprendizajeId,
          orden_modulo: moduloData.ordenModulo,
          recurso_interactivo: moduloData.recursoInteractivo,
          titulo_conteido: moduloData.tituloContenido,
        },
      });
      return this.mapper.toDomain(moduloActualizado);
    } catch (error) {
      if (error.code === 'P2025') {
        // Registro no encontrado para actualizar
        return null;
      }
      throw error;
    }
  }

  async delete(moduloId: number): Promise<boolean> {
    try {
      await this.prisma.modulos.delete({
        where: { id_modulo: moduloId },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        // Registro no encontrado para eliminar
        return false;
      }
      throw error;
    }
  }
}
