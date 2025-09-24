export class ErrorModel {
  constructor(
    public fechaHora?: Date,
    public mensaje?: string,
    public detalles?: string
  ) {}
}
