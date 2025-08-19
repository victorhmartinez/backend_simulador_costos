export class ResultadosPlanAccion {
  planId?: number;
  analisisId: number;
  titulo?: string;
  descripcion?: string;
  prioridad?: string;

  constructor(
    analisisId: number,
    titulo?: string,
    descripcion?: string,
    prioridad?: string,
  ) {
    this.analisisId = analisisId;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.prioridad = prioridad;
  }
}
