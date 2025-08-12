import { Injectable } from '@nestjs/common';
import { CreateModulosDto } from '../dto/module.dto';
import { Modulos } from 'src/core/domain/model/module';
import { Modulos as ModuloPrismaModel } from 'generated/prisma';

@Injectable()
export class ModulosMapper {
  // Convierte desde el modelo de Prisma al modelo de Dominio
  toDomain(prismaModulo: ModuloPrismaModel): Modulos {
    return new Modulos(
      prismaModulo.nombre_modulo,
      prismaModulo.id_aprendizaje,
      prismaModulo.concepto,
      prismaModulo.orden_modulo,
      prismaModulo.recurso_interactivo,
      prismaModulo.titulo_conteido,
    );
  }

  // Convierte desde un DTO de creación al modelo de Dominio
  toDomainFromDto(dto: CreateModulosDto): Modulos {
    return new Modulos(
      dto.nombreModulo,
      dto.aprendizajeId,
      dto.concepto,
      dto.ordenModulo,
      dto.recursoInteractivo,
      dto.tituloContenido,
    );
  }
}
