import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptionDecryptionService {
  constructor() {}

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, environment.passSecretKey).toString();
  }

  decrypt(value: string): string {
    return CryptoJS.AES.decrypt(value, environment.passSecretKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
