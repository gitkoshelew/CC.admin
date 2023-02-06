import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(private readonly cookies: CookieService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookies.get('token');
    const reqClone = req.clone({
      headers: req.headers.set('Access-Control-Allow-Origin', '*')
    })
    console.log({reqClone})
    if (token) {
      reqClone.headers.set('Authorization', 'Bearer ' + token)
      return next.handle(reqClone);
    } else {
      return next.handle(reqClone);
    }
  }
}
