import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { errorResponse } from '../models/errorResponse';
import { apiResponse } from '../models/apiResponse';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse, caught: Observable<any>) => {
        this.handleHttpError(error);
        return throwError(() => error);
      })
    );
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let response: apiResponse = error.error;
    console.log(error.status);
    // if (response.message) {
    //   this.alertService.errorAlert(response.message);
    // } else {
    //   this.alertService.errorAlert(
    //     'An error occurred. Please try again later.'
    //   );
    // }
  }
}
