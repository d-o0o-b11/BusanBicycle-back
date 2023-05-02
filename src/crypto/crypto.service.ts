import { Injectable } from '@nestjs/common';
import { IsCryptoService } from './crypto-service.interface';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService implements IsCryptoService {
  /**
   * 비밀번호 암호화
   * @param password
   */
  async transFormPassword(password: string) {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = 'Nest';
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    return { encryptedText, key };
  }

  async decryptedPassword(password: string) {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const decipher = createCipheriv('aes-256-ctr', key, iv);

    const decryptedText = Buffer.concat([
      decipher.update(password),
      decipher.final(),
    ]);

    console.log(decryptedText);
    return decryptedText;
  }
}
