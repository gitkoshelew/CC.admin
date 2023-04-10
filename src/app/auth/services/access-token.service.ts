import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccessTokenService {
  private token: string | null = null;
  expireTime = 0;

  constructor(
    private readonly cookiesService: CookieService,
    private readonly http: HttpClient,
  ) {}

  setToken(token: string): void {
    this.token = token;
    this.cookiesService.set('accessToken', token);
    Date.now() + 5 * 60 * 1000;
  }

  /**
   *
   * @returns Observable<string | null> - access token or null if there is no refresh token
   * @description
   * if the token is still valid, return it
   * otherwise make refresh token request
   *
   */
  getToken(): Observable<string | null> {
    if (Date.now() + 1000 > this.expireTime) {
      if (this.cookiesService.get('refreshToken')) {
        return this.http
          .post<{ accessToken: string }>(
            process.env['NG_APP_BACKEND_ADDRESS'] + 'auth/refresh-token',
            {},
          )
          .pipe(
            map(({ accessToken }) => {
              this.setToken(accessToken);
              return accessToken;
            }),
          );
      } else {
        return of(null);
      }
    } else {
      return of(this.token);
    }
  }
}
