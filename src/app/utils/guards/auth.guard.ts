import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { getCurrentUserAction } from 'src/app/auth/store/actions/getCurrentUser.action';
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
    return this.store.select(isLoggedInSelector).pipe(
      map((value: boolean | null) => {
        if (!value) {
          this.store.dispatch(getCurrentUserAction());
          return false;
        } else {
          return true;
        }
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
