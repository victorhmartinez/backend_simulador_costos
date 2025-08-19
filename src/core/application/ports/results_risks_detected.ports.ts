import { ResultadosRiesgosDetectados } from "src/core/domain/model/results_risks_detected";

export abstract class ResultadosRiesgosDetectadosRepositoryPort {
  abstract create(resultado: ResultadosRiesgosDetectados): Promise<ResultadosRiesgosDetectados>;
  abstract findById(resultadoId: number): Promise<ResultadosRiesgosDetectados | null>;
  abstract findAll(): Promise<ResultadosRiesgosDetectados[]>;
  abstract update(resultadoId: number, resultado: Partial<ResultadosRiesgosDetectados>): Promise<ResultadosRiesgosDetectados | null>;
  abstract delete(resultadoId: number): Promise<boolean>;
}
