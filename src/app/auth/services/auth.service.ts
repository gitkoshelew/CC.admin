import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { map, Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { RegistrationRequest } from '../types/registrationRequest.interface';
import { AccessTokenService } from 'src/app/auth/services/access-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService,
    private readonly accessTokenService: AccessTokenService,
  ) {}

  fakeUser: LoginRequestInterface = {
    email: 'admin',
    password: 'admin',
    rememberMe: false,
  };

  currentUser: CurrentUserInterface = {
    id: 1,
    email: '',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    nickName: this.fakeUser.email,
    image: null,
  };

  login(user: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<{ accessToken: string }>(
        process.env['NG_APP_BACKEND_ADDRESS'] + 'auth/login',
        user,
      )
      .pipe(
        map(({ accessToken }) => {
          // refresh token stands only for 1 day, access token is valid for 5 minutes
          if (user.rememberMe) {
            const refreshToken = this.cookieService.get('refreshToken');
            console.log({ refreshToken });
            // this.cookieService.set('refreshToken', refreshToken, new Date(Date.now() + 24 * 60 * 60 * 1000));
          }
          this.accessTokenService.setToken(accessToken);
          return this.currentUser;
        }),
      );
  }
  registration(user: RegistrationRequest): Observable<CurrentUserInterface> {
    return this.http
      .post<{ accessToken: string }>(
        process.env['NG_APP_BACKEND_ADDRESS'] + 'auth/registration',
        user,
      )
      .pipe(
        map(({ accessToken }) => {
          this.accessTokenService.setToken(accessToken);
          return this.currentUser;
        }),
      );
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http
      .post(process.env['NG_APP_BACKEND_ADDRESS'] + 'auth/refresh-token', {})
      .pipe(
        map(() => {
          return this.currentUser;
        }),
      );
  }
}
