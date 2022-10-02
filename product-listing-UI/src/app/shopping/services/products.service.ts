import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptionDecryptionService } from 'src/app/authentication/services/encryption-decryption.service';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private _httpClient: HttpClient,
    private _encDecService: EncryptionDecryptionService
  ) {}

  // GET ALL PRODUCTS
  getAll() {
    let value = localStorage.getItem('currentUser');
    let currentUser = value
      ? (JSON.parse(this._encDecService.decrypt(value)) as User)
      : null;

    const headers = {
      'x-auth-token': currentUser ? currentUser.accessToken : '',
    };

    return this._httpClient.get(`${environment.apiUrl}/api/products/`, {
      headers,
    });
  }
}
