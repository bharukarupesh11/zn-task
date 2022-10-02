import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EncryptionDecryptionService } from '../../services/encryption-decryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  validLogin: boolean = true;
  errorMsg: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _encDecService: EncryptionDecryptionService
  ) {}

  submit() {
    console.log('Form Value: ', this.loginForm.value);
    if (this.loginForm.value) {
      this._authService.login(this.loginForm.value).subscribe({
        next: (response: HttpResponse<Object>) => {
          if (response.status == 200) {
            console.log(response.body);
            const encryptedValue = this._encDecService.encrypt(
              JSON.stringify(response.body)
            );
            localStorage.setItem('currentUser', encryptedValue);
            this._router.navigate(['products']);
          }
        },
        error: (err) => {
          console.log('Login Error: ', err);
          this.errorMsg = 'Error, Invalid credentials.';
        },
        complete: () => console.log('Operation completed successfully'),
      });
    }
  }
}
