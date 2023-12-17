import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvService } from 'src/app/shared/services/env.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { loginEntity } from 'src/app/shared/models/loginEntity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { errorResponse } from 'src/app/shared/models/errorResponse';
import { apiResponse } from 'src/app/shared/models/apiResponse';
import { Router } from '@angular/router';
import { TabVisibilityService } from 'src/app/shared/services/tab-visibility.service';
import { AuthService } from 'src/app/shared/services/AuthService.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private env: EnvService,
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router,
    private tabVisibilityService: TabVisibilityService,
    private AuthService: AuthService,
    private loaderService: LoaderService
  ) {}
  //#region Variables
  ifWelcomePage: boolean = true;
  ifLoginPage: boolean = false;
  ifRegisterPage: boolean = false;
  showPasswordFlag: boolean = false;
  passwordType: string = 'password';
  loginInfoFormValidation: boolean = false;
  registerInfoFormValidation: boolean = false;
  //#endregion
  ngOnInit() {
    this.tabVisibilityService.isTabVisible = false;
  }

  welcomeToLogin() {
    this.ifWelcomePage = false;
    this.ifLoginPage = true;
  }
  loginToWelcome() {
    this.ifLoginPage = false;
    this.ifWelcomePage = true;
    this.loginInfoFormValidation = false;
    this.loginInfoForm.patchValue({
      email: this.registerInfoForm.value['email'],
      password: this.registerInfoForm.value['password'],
    });
  }
  loginToSignUp() {
    this.ifLoginPage = false;
    this.ifRegisterPage = true;
    this.loginInfoFormValidation = false;
  }
  registerToSignIN() {
    this.ifRegisterPage = false;
    this.ifLoginPage = true;
    this.registerInfoFormValidation = false;
  }
  showPassword() {
    this.showPasswordFlag = !this.showPasswordFlag;
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  async signInBtn() {
    this.loginInfoFormValidation = true;

    if (this.loginInfoForm.valid) {
      const email: string = this.loginInfoForm.value.email;
      const password: string = this.loginInfoForm.value.password;

      await this.AuthService.login(email, password);
    }
  }
  signUpBtn() {
    this.registerInfoFormValidation = true;

    if (this.registerInfoForm.valid == true) {
      let First_name: string = this.registerInfoForm.value.first_name;
      let Last_name: string = this.registerInfoForm.value.last_name;
      let Email: string = this.registerInfoForm.value.email;
      let Password: string = this.registerInfoForm.value.password;
      let Phone_Number: string = this.registerInfoForm.value.phone_number;

      this.http
        .post<apiResponse>(this.env.laundryURL + 'users/userRegister', {
          firstName: First_name,
          lastName: Last_name,
          email: Email,
          password: Password,
          phoneNumber: Phone_Number,
        })
        .subscribe({
          next: async (data: apiResponse) => {
            await this.alertService.successAlert(data.message, false);
            this.loginInfoForm.patchValue({
              email: this.registerInfoForm.value['email'],
            });
            this.registerInfoForm.patchValue({
              first_name: null,
              last_name: null,
              email: null,
              password: null,
              phone_number: null,
            });
            this.registerToSignIN();
          },
          error: (err: errorResponse) => {
            console.log(err);
            if (err.error) {
              this.alertService.errorAlert(err.error.message);
            }
          },
        });
    }
  }
  loginInfoForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  registerInfoForm: FormGroup = this.formBuilder.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    phone_number: [''],
  });
}
