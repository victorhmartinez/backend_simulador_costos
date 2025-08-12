export class Modulos {
  moduloId?: number;
  nombreModulo: string;
  concepto?: string;
  aprendizajeId: number;
  ordenModulo?: number;
  recursoInteractivo?: string;
  tituloContenido?: string;

  constructor(
    nombreModulo: string,
    aprendizajeId: number,
    concepto?: string,
    ordenModulo?: number,
    recursoInteractivo?: string,
    tituloContenido?: string,
  ) {
    this.nombreModulo = nombreModulo;
    this.aprendizajeId = aprendizajeId;
    this.concepto = concepto;
    this.ordenModulo = ordenModulo;
    this.recursoInteractivo = recursoInteractivo;
    this.tituloContenido = tituloContenido;
  }
}
