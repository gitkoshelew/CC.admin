import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { getCurrentUserSuccessAction } from 'src/app/auth/store/actions/getCurrentUser.action';
import { isLoggedInSelector } from 'src/app/auth/store/selector';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.store.pipe(select(isLoggedInSelector)).pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.actions$
            .pipe(ofType(getCurrentUserSuccessAction))
            .subscribe(() => {
              this.store.pipe(select(isLoggedInSelector)).pipe(
                map((isLoggedIn) => {
                  if (!isLoggedIn) {
                    this.router.navigate(['/login']);
                  }
                }),
              );
            });
        }
        return true;
      }),
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
