export class ResultadosRiesgosDetectados {
  riesgoId?: number;
  analisisId: number;
  riesgo?: string;
  causaDirecta?: string;
  impactoPotencial?: string;

  constructor(
    analisisId: number,
    riesgo?: string,
    causaDirecta?: string,
    impactoPotencial?: string,
  ) {
    this.analisisId = analisisId;
    this.riesgo = riesgo;
    this.causaDirecta = causaDirecta;
    this.impactoPotencial = impactoPotencial;
  }
}
