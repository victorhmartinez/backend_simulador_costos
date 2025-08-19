export class ResultadosCostosOmitidos {
  costoOmitidoId?: number;
  analisisId: number;
  costoOmitido?: string;
  importancia?: string;

  constructor(
    analisisId: number,
    costoOmitido?: string,
    importancia?: string,
  ) {
    this.analisisId = analisisId;
    this.costoOmitido = costoOmitido;
    this.importancia = importancia;
  }
}
