import { AnalisisIA } from "src/core/domain/model/analysis_ai";

export abstract class AnalisisIARepositoryPort {
  abstract create(analisisIA: AnalisisIA): Promise<AnalisisIA>;
  abstract findById(analisisIAId: number): Promise<AnalisisIA | null>;
  abstract findAll(): Promise<AnalisisIA[]>;
  abstract update(analisisIAId: number, analisisIA: Partial<AnalisisIA>): Promise<AnalisisIA | null>;
  abstract delete(analisisIAId: number): Promise<boolean>;
}