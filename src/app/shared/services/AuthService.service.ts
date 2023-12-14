import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { errorResponse } from '../models/errorResponse';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { TabVisibilityService } from './tab-visibility.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router,
    private tabVisibilityService: TabVisibilityService,
    private alertService: AlertService
  ) {}

  getUserInfo(): any {
    const token = this.getToken();

    if (token) {
      return jwt_decode.jwtDecode(token);
    }

    return null;
  }

  async login(email: string, password: string) {
    this.http
      .post(this.env.laundryURL + 'users/userLogin', {
        email: email,
        password: password,
      })
      .subscribe({
        next: async (data: any) => {
          localStorage.setItem(this.tokenKey, data.responseData.token);
          this.tabVisibilityService.isTabVisible = true;
          this.router.navigateByUrl('/homepage');
        },
        error: (err: errorResponse) => {
          console.log(err);
          this.alertService.errorAlert(err.error?.message);
        },
      });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    location.reload();
    this.router.navigateByUrl('/registration');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
