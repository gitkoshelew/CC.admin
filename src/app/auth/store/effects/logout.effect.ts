import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {
  logoutAction,
  logoutFailureAction,
  logoutSuccessAction,
} from '../actions/logout.action';

@Injectable()
export class LogoutEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            this.cookieService.delete('accessToken');
            return logoutSuccessAction();
          }),
          catchError(() => {
            return of(logoutFailureAction());
          }),
        );
      }),
    ),
  );
}
