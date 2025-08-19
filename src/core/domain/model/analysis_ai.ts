export class AnalisisIA {
    analisisId?: number;
    negocioId: number;
    fechaAnalisis?: Date;

  constructor(
    analisisId?: number,
    negocioId: number,
    fechaAnalisis?: Date,
  ) {
    this.analisisId = analisisId;
    this.negocioId = negocioId;
    this.fechaAnalisis = fechaAnalisis;
  }
}