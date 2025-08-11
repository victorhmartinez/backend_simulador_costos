import { Negocio } from "src/core/domain/model/business";

export abstract class NegocioRepositoryPort {
  abstract create(negocio: Negocio): Promise<Negocio>;
  abstract findById(negocioId: number): Promise<Negocio | null>;
  abstract findByUserId(usuarioId: number): Promise<Negocio[]>;
  abstract findAll(): Promise<Negocio[]>;
  abstract update(negocioId: number, negocio: Partial<Negocio>): Promise<Negocio | null>;
 abstract delete(negocioId: number): Promise<boolean>;
}