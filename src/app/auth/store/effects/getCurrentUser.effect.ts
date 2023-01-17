import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.action';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  getCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.cookieService.get('accessToken');
        if (!token) {
          return of(getCurrentUserFailureAction());
        }
        return this.authService.getCurrentUser().pipe(
          map((user: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({ user });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          }),
        );
      }),
    )},
  );

  getCurrentUserFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCurrentUserFailureAction),
      tap(() => {
        console.log('Failed to get current user')
        this.cookieService.delete('accessToken');
        this.router.navigateByUrl('/auth/login');
      })
    )
  }, { dispatch: false })

  getCurrentUserSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCurrentUserSuccessAction),
      tap(() => {
        console.log('Logged In')
        this.router.navigateByUrl('/');
      })
    )
  }, { dispatch: false })
}
