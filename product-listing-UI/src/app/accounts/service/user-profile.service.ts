import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private _httpClient: HttpClient) {}

  createUser(user: User) {
    return this._httpClient
      .post(`${environment.apiUrl}/api/auth/register`, user)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
