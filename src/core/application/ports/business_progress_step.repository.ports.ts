
import { BusinessProgressStep } from "src/core/domain/model/business_progress_step.model";


export abstract class BusinessProgressStepRepositoryPort {
  abstract create(progreso: BusinessProgressStep): Promise<BusinessProgressStep>;
  abstract findById(id: number): Promise<BusinessProgressStep | null>;
  abstract findAll(): Promise<BusinessProgressStep[]>;
  abstract findByNegocioId(negocioId: number): Promise<BusinessProgressStep[]>; 
  abstract update(id: number, progreso: Partial<BusinessProgressStep>): Promise<BusinessProgressStep | null>;
  abstract delete(id: number): Promise<boolean>;
}