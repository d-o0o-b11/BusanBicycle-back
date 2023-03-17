export class NotFoundError extends Error {
  constructor(...param: any[]) {
    super('존재하지 않습니다.');
  }
}
