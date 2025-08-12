
export class BusinessProgressStep {
  id?: number;
  negocioId: number;
  moduloId: number;
  estadoId: number;
  fechaInicio?: Date;
  fechaCompletado?: Date;

  constructor(
    negocioId: number,
    moduloId: number,
    estadoId: number,
    id?: number,
    fechaInicio?: Date,
    fechaCompletado?: Date,
  ) {
    this.id = id;
    this.negocioId = negocioId;
    this.moduloId = moduloId;
    this.estadoId = estadoId;
    this.fechaInicio = fechaInicio;
    this.fechaCompletado = fechaCompletado;
  }
}