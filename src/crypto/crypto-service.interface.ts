export const CRYTO_SERVICE_TOKEN = Symbol('cryto-service');

export interface IsCryptoService {
  transFormPassword(password: string);
  decryptedPassword(encryptedText: string, key);
}
