import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/AuthService.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.message === 'Token expired') {
          // Token expired, attempt to refresh it
          return this.authService.refreshToken().pipe(
            switchMap((newToken: string) => {
              // Retry the original request with the new token
              const clonedRequest = this.addTokenToRequest(request, newToken);
              console.log('clonedRequest', clonedRequest);
              return next.handle(clonedRequest);
            }),
            catchError((refreshError: any) => {
              console.log('refreshError', refreshError);
              // If token refresh fails, handle the error as needed
              this.authService.logout(); // Logout or perform other actions
              return throwError(() => refreshError);
            })
          );
        }

        // Continue handling other errors
        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
