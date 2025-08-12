import { BusinessSize } from "src/core/domain/model/business_size";

export abstract class BusinessSizeRepositoryPort{
abstract create(tamanoNegocio:BusinessSize ):Promise<BusinessSize>;

 abstract findById(tamanoNegocioId: number): Promise<BusinessSize | null>;
  abstract findAll(): Promise<BusinessSize[]>;
  abstract update(tamanoNegocioId: number, tamanoNegocio: BusinessSize): Promise<BusinessSize | null>;
 abstract delete(tamanoNegocioId: number): Promise<boolean>;

}