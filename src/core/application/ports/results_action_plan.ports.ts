import { ResultadosPlanAccion } from "src/core/domain/model/results_action_plan";

export abstract class ResultadosPlanAccionRepositoryPort {
  abstract create(resultado: ResultadosPlanAccion): Promise<ResultadosPlanAccion>;
  abstract findById(resultadoId: number): Promise<ResultadosPlanAccion | null>;
  abstract findAll(): Promise<ResultadosPlanAccion[]>;
  abstract update(resultadoId: number, resultado: Partial<ResultadosPlanAccion>): Promise<ResultadosPlanAccion | null>;
  abstract delete(resultadoId: number): Promise<boolean>;
}
