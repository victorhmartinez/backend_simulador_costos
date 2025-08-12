import { Injectable } from '@nestjs/common';
import { AprendizajeMapper } from '../../controllers/mappers/learning.mapper';
import { Aprendizaje } from 'src/core/domain/model/learning';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AprendizajeRepositoryPort } from 'src/core/application/ports/learning.repository.ports';

@Injectable()
export class AprendizajePrismaRepository implements AprendizajeRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: AprendizajeMapper,
  ) { }

  async create(aprendizaje: Aprendizaje): Promise<Aprendizaje> {
    const aprendizajeCreado = await this.prisma.aprendizaje.create({
      data: {
        nombre: aprendizaje.nombre ?? '',
        total_niveles: aprendizaje.totalNiveles,
      },
    });
    return this.mapper.toDomain(aprendizajeCreado);
  }

  async findById(aprendizajeId: number): Promise<Aprendizaje | null> {
    const aprendizajeEncontrado = await this.prisma.aprendizaje.findUnique({
      where: { id_aprendizaje: aprendizajeId },
    });
    return aprendizajeEncontrado ? this.mapper.toDomain(aprendizajeEncontrado) : null;
  }

  async findAll(): Promise<Aprendizaje[]> {
    const todos = await this.prisma.aprendizaje.findMany();
    return todos.map((n) => this.mapper.toDomain(n));
  }

  async update(aprendizajeId: number, aprendizajeData: Partial<Aprendizaje>): Promise<Aprendizaje | null> {
    try {
      const aprendizajeActualizado = await this.prisma.aprendizaje.update({
        where: { id_aprendizaje: aprendizajeId },
        data: {
          nombre: aprendizajeData.nombre,
          total_niveles: aprendizajeData.totalNiveles,
        },
      });
      return this.mapper.toDomain(aprendizajeActualizado);
    } catch (error) {
      // Prisma lanza un error si el registro a actualizar no se encuentra
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async delete(aprendizajeId: number): Promise<boolean> {
    try {
      await this.prisma.aprendizaje.delete({
        where: { id_aprendizaje: aprendizajeId },
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