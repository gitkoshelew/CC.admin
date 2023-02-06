import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { map, Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { RegistrationRequest } from '../types/registrationRequest.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  fakeUser: LoginRequestInterface = {
    nickName: 'admin',
    password: 'admin',
    rememberMe: false,
  };

  currentUser: CurrentUserInterface = {
    id: 1,
    email: '',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    nickName: this.fakeUser.nickName,
    image: null,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  };

  login(user: LoginRequestInterface): Observable<CurrentUserInterface> {
    console.log('login')
    return this.http.post<{accessToken: string}>(process.env['NG_APP_BACKEND_ADDRESS'] + 'auth/login', user)
      .pipe(
        map(({ accessToken }) => {
          if (user.rememberMe) {
            this.cookieService.set('accessToken', accessToken, 365);
          }
          return this.currentUser;
        })
      )
  }
  registration(user: RegistrationRequest): Observable<CurrentUserInterface> {
    return this.http.post(process.env['NG_APP_BACKEND_ADDRESS'] + 'auth/registration', user)
      .pipe(
        map(() => {
          return this.currentUser;
        })
      )
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http.post(process.env['NG_APP_BACKEND_ADDRESS'] + 'auth/refresh-token', {})
      .pipe(
        map(() => {
          return this.currentUser;
        })
      )
  }
}
