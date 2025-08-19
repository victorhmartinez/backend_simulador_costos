import { ResultadosCostosOmitidos } from "src/core/domain/model/results_omitted_costs";

export abstract class ResultadosCostosOmitidosRepositoryPort {
  abstract create(resultado: ResultadosCostosOmitidos): Promise<ResultadosCostosOmitidos>;
  abstract findById(resultadoId: number): Promise<ResultadosCostosOmitidos | null>;
  abstract findAll(): Promise<ResultadosCostosOmitidos[]>;
  abstract update(resultadoId: number, resultado: Partial<ResultadosCostosOmitidos>): Promise<ResultadosCostosOmitidos | null>;
  abstract delete(resultadoId: number): Promise<boolean>;
}
