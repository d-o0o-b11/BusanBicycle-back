export const CRYTO_SERVICE_TOKEN = Symbol('cryto-service');

export interface IsCryptoService {
  // transFormPassword(password: string);
  // decryptedPassword(password: string, encryptedText, iv);

  encrypt(text: string);

  decrypt(text: string);
}
