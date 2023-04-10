import { AccessTokenService } from 'src/app/auth/services/access-token.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(private readonly tokenService: AccessTokenService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.tokenService.getToken().pipe(
      switchMap((token: string | null) => {
        const reqClone = req.clone({
          headers: req.headers.set('Access-Control-Allow-Origin', '*'),
        });
        if (token) {
          reqClone.headers.set('Authorization', 'Bearer ' + token);
        }
        return next.handle(reqClone);
      }),
    );
  }
}
