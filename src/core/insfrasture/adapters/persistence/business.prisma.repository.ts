// src/infrastructure/persistence/repositories/negocio.prisma.repository.ts

import { Injectable } from '@nestjs/common';
import { NegocioMapper } from '../../controllers/mappers/business.mapper';
import { Negocio } from 'src/core/domain/model/business';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { NegocioRepositoryPort } from 'src/core/application/ports/business.repository.ports';

@Injectable()
export class NegocioPrismaRepository implements NegocioRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: NegocioMapper,
  ) { }

  async create(negocio: Negocio): Promise<Negocio> {
    const negocioCreado = await this.prisma.negocios.create({
      data: {
        usuario_id: negocio.usuarioId,
        tipo_negocio: negocio.tipoNegocio,
        nombre_negocio: negocio.nombreNegocio,
        ubicacion: negocio.ubicacion,
        id_tamano: negocio.idTamano,
      },
    });
    return this.mapper.toDomain(negocioCreado);
  }

  async findById(negocioId: number): Promise<Negocio | null> {
    const negocioEncontrado = await this.prisma.negocios.findUnique({
      where: { negocio_id: negocioId },
    });
    return negocioEncontrado ? this.mapper.toDomain(negocioEncontrado) : null;
  }

  async findByUserId(usuarioId: number): Promise<Negocio[]> {
    const negociosEncontrados = await this.prisma.negocios.findMany({
      where: { usuario_id: usuarioId },
    });
    return negociosEncontrados.map((n) => this.mapper.toDomain(n));
  }

  async findAll(): Promise<Negocio[]> {
    const todosLosNegocios = await this.prisma.negocios.findMany();
    return todosLosNegocios.map((n) => this.mapper.toDomain(n));
  }

  async update(negocioId: number, negocioData: Partial<Negocio>): Promise<Negocio | null> {
    try {
      const negocioActualizado = await this.prisma.negocios.update({
        where: { negocio_id: negocioId },
        data: {
          tipo_negocio: negocioData.tipoNegocio,
          nombre_negocio: negocioData.nombreNegocio,
          ubicacion: negocioData.ubicacion,
          id_tamano: negocioData.idTamano,
        },
      });
      return this.mapper.toDomain(negocioActualizado);
    } catch (error) {
      // Prisma lanza un error si el registro a actualizar no se encuentra
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async delete(negocioId: number): Promise<boolean> {
    try {
      await this.prisma.negocios.delete({
        where: { negocio_id: negocioId },
      });
      return true; // Si no hay error, se eliminó correctamente
    } catch (error) {
      // Prisma lanza un error si el registro a eliminar no se encuentra
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }

}