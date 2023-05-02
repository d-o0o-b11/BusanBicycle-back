import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CRYTO_SERVICE_TOKEN } from './crypto-service.interface';

@Module({
  controllers: [],
  providers: [{ provide: CRYTO_SERVICE_TOKEN, useClass: CryptoService }],
  exports: [CRYTO_SERVICE_TOKEN],
})
export class CryptoModule {}
