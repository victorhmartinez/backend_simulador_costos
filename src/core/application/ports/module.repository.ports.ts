import { Modulos } from "src/core/domain/model/module";

export abstract class ModulosRepositoryPort {
  abstract create(modulos: Modulos): Promise<Modulos>;
  abstract findById(modulosId: number): Promise<Modulos | null>;
  abstract findAll(): Promise<Modulos[]>;
  abstract update(modulosId: number, modulos: Partial<Modulos>): Promise<Modulos | null>;
  abstract delete(modulosId: number): Promise<boolean>;
}