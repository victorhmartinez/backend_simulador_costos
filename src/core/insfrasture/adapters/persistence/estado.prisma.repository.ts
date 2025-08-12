
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { EstadoMapper } from '../../controllers/mappers/estado.mapper';
import { Estado } from 'src/core/domain/model/estado.model';
import { EstadoRepositoryPort } from 'src/core/application/ports/estado.repository.port';


@Injectable()
export class EstadoPrismaRepository implements EstadoRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: EstadoMapper,
  ) {}

  async create(estado: Estado): Promise<Estado> {
    const nuevoEstado = await this.prisma.estados.create({
      data: {
        nombre_estado: estado.nombreEstado,
      },
    });
    return this.mapper.toDomain(nuevoEstado);
  }

  async findById(idEstado: number): Promise<Estado | null> {
    const estado = await this.prisma.estados.findUnique({
      where: { id_estado: idEstado },
    });
    return estado ? this.mapper.toDomain(estado) : null;
  }

  async findAll(): Promise<Estado[]> {
    const todos = await this.prisma.estados.findMany();
    return todos.map((estado) => this.mapper.toDomain(estado));
  }

  async update(idEstado: number, estado: Estado): Promise<Estado | null> {
    try {
      const estadoActualizado = await this.prisma.estados.update({
        where: { id_estado: idEstado },
        data: {
          nombre_estado: estado.nombreEstado,
        },
      });
      return this.mapper.toDomain(estadoActualizado);
    } catch (error) {
      if (error.code === 'P2025') return null; // No encontrado
      throw error;
    }
  }

  async delete(idEstado: number): Promise<boolean> {
    try {
      await this.prisma.estados.delete({
        where: { id_estado: idEstado },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') return false; // No encontrado
      // Prisma también lanzará P2003 si hay una violación de clave foránea
      throw error;
    }
  }
}