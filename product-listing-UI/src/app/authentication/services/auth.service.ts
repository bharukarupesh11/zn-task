import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/shared/models/login';
import { EncryptionDecryptionService } from './encryption-decryption.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // responseFlag = false;

  constructor(
    private _httpClient: HttpClient,
    private _encDecService: EncryptionDecryptionService,
    private _router: Router
  ) {}

  login(userCredentials: LoginModel) {
    const encryptedPassword = this._encDecService.encrypt(
      userCredentials.password
    );
    userCredentials.password = encryptedPassword;

    return this._httpClient.post(
      `${environment.apiUrl}/api/auth/login`,
      userCredentials,
      {
        observe: 'response',
      }
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._router.navigate(['login']); // navigates to the login page after logging out.
  }
}
