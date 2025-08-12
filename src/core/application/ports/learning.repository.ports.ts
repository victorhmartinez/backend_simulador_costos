import { Aprendizaje } from "src/core/domain/model/learning";

export abstract class AprendizajeRepositoryPort {
  abstract create(aprendizaje: Aprendizaje): Promise<Aprendizaje>;
  abstract findById(aprendizajeId: number): Promise<Aprendizaje | null>;
  abstract findAll(): Promise<Aprendizaje[]>;
  abstract update(aprendizajeId: number, aprendizaje: Partial<Aprendizaje>): Promise<Aprendizaje | null>;
  abstract delete(aprendizajeId: number): Promise<boolean>;
}