export type StatusCode = 400 | 401 | 404 | 500;

export class APIException extends Error {
  status: StatusCode | undefined;

  constructor(message: string, status?: StatusCode) {
    super(message);
    this.status = status;
  }
}
