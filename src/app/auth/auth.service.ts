import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface IUser {
  nickName: string;
  password: string;
  remember: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  fakeUser: IUser = {
    nickName: 'Oleg',
    password: '123456',
    remember: true,
  };

  login(user: IUser): IUser | void {
    if (
      user.nickName === this.fakeUser.nickName &&
      user.password === this.fakeUser.password // TODO: add http
    ) {
      this.cookieService.set('token', 'super-secret-token-from-server');
      this.router.navigate(['']);
      return user;
    }
  }
}
