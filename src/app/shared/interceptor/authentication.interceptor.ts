import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify the request to include authentication token or perform other actions
    const modifiedRequest = this.addAuthenticationToken(request);
    // Pass the modified request to the next handler
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse, caught: Observable<any>) => {
        if (error.status === 401) {
          this.router.navigateByUrl('/registration');
        }
        // Re-throw the error for further handling
        return throwError(() => error);
      })
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getToken();
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
