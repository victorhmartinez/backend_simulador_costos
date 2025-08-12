import { Injectable } from '@nestjs/common';
import { BusinessSizeMapper } from '../../controllers/mappers/business_size.mapper';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BusinessSize } from 'src/core/domain/model/business_size';
import { BusinessSizeRepositoryPort } from 'src/core/application/ports/business_size.repository.ports';

@Injectable()
export class BusinessSizePrismaRepository implements BusinessSizeRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: BusinessSizeMapper,
  ) {}

  async create(tamanoNegocio: BusinessSize): Promise<BusinessSize> {
    const nuevoTamano = await this.prisma.tamano_negocio.create({
      data: {
        tamano_nombre: tamanoNegocio.tamanoNombre,
      },
    });
    return this.mapper.toDomain(nuevoTamano);
  }

  async findById(idTamano: number): Promise<BusinessSize | null> {
    const tamano = await this.prisma.tamano_negocio.findUnique({
      where: { id_tamano: idTamano },
    });
    return tamano ? this.mapper.toDomain(tamano) : null;
  }

  async findAll(): Promise<BusinessSize[]> {
    const todos = await this.prisma.tamano_negocio.findMany();
    return todos.map((tamano) => this.mapper.toDomain(tamano));
  }

  async update(idTamano: number, businessSize: BusinessSize): Promise<BusinessSize | null> {
    try {
      const tamanoActualizado = await this.prisma.tamano_negocio.update({
        where: { id_tamano: idTamano },
        data: {
          tamano_nombre: businessSize.tamanoNombre,
        },
      });
      return this.mapper.toDomain(tamanoActualizado);
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async delete(idTamano: number): Promise<boolean> {
    try {
      await this.prisma.tamano_negocio.delete({
        where: { id_tamano: idTamano },
      });
      return true; 
    } catch (error) {
      if (error.code === 'P2025') {
        return false; 
      }
      throw error;
    }
  }
}