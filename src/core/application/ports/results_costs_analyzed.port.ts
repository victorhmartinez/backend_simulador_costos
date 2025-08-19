import { ResultadosCostosAnalizados } from "src/core/domain/model/Results_Costs_Analyzed";

export abstract class ResultadosCostosAnalizadosRepositoryPort {
  abstract create(resultado: ResultadosCostosAnalizados): Promise<ResultadosCostosAnalizados>;
  abstract findById(resultadoId: number): Promise<ResultadosCostosAnalizados | null>;
  abstract findAll(): Promise<ResultadosCostosAnalizados[]>;
  abstract update(resultadoId: number, resultado: Partial<ResultadosCostosAnalizados>): Promise<ResultadosCostosAnalizados | null>;
  abstract delete(resultadoId: number): Promise<boolean>;
}
