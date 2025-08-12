import { Estado } from "src/core/domain/model/estado.model";


export abstract class EstadoRepositoryPort {
  abstract create(estado: Estado): Promise<Estado>;
  abstract findById(idEstado: number): Promise<Estado | null>;
  abstract findAll(): Promise<Estado[]>;
  abstract update(idEstado: number, estado: Estado): Promise<Estado | null>;
  abstract delete(idEstado: number): Promise<boolean>;
}