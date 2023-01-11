import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { map, Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  fakeUser: LoginRequestInterface = {
    nickName: 'Oleg',
    password: '123456',
    rememberMe: false,
  };

  login(user: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>('', user)
      .pipe(map((response) => response.user));
    // if (
    //   user.nickName === this.fakeUser.nickName &&
    //   user.password === this.fakeUser.password // TODO: add http
    // ) {
    //   this.cookieService.set('token', 'super-secret-token-from-server');
    //   this.router.navigate(['']);
    // }
  }
  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http
      .get<AuthResponseInterface>('')
      .pipe(map((response) => response.user));
  }
  logout(): Observable<any> {
    return this.http.delete<AuthResponseInterface>('');
  }
}
