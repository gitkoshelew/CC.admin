import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { Observable, of } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

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
    // return of(user: CurrentUserInterface)
    // return this.http
    //   .post<AuthResponseInterface>('', user)
    //   .pipe(map((response) => response.user));
    if (
      user.nickName === this.fakeUser.nickName &&
      user.password === this.fakeUser.password // TODO: add http
    ) {
      if (user.rememberMe) {
        this.cookieService.set('accessToken', this.currentUser.token, 365);
      } else {
        this.cookieService.set('accessToken', this.currentUser.token);
      }

      return of(this.currentUser);
    } else {
      throw new Error('credential was mismatched');
    }
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const token = this.cookieService.get('accessToken');
    if (
      token ===
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    )
      return of(this.currentUser);
    else {
      throw new Error('credential was mismatched');
    }
  }
}
