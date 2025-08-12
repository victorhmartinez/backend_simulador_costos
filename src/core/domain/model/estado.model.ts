

export class Estado {
  idEstado?: number;
  nombreEstado: string;

  constructor(nombreEstado: string, idEstado?: number) {
    this.idEstado = idEstado;
    this.nombreEstado = nombreEstado;
  }
}