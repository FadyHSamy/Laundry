import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvService } from 'src/app/shared/services/env.service';
import { HttpClient } from '@angular/common/http';
import { loginEntity } from 'src/app/shared/models/loginEntity';
import { AlertService } from 'src/app/shared/services/alert.service';
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
    private alertService: AlertService
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
  ngOnInit() {}

  welcomeToLogin() {
    this.ifWelcomePage = false;
    this.ifLoginPage = true;
  }
  loginToWelcome() {
    this.ifLoginPage = false;
    this.ifWelcomePage = true;
    this.loginInfoFormValidation = false;
  }
  // registerToWelcome() {
  //   this.ifRegisterPage = false;
  //   this.ifWelcomePage = true;
  //   this.registerInfoFormValidation = false;
  // }
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
  signInBtn() {
    this.loginInfoFormValidation = true;

    if (this.loginInfoForm.valid == true) {
      let Email: string = this.loginInfoForm.value.email;
      let Password: string = this.loginInfoForm.value.password;

      this.http
        .post<loginEntity>(this.env.laundryURL + 'api/Auth/Login', {
          email: Email,
          password: Password,
        })
        .subscribe({
          next: async (data) => {
            console.log('data', data);
            await this.alertService.successAlert(
              'Login successful',
              false
            );
          },
          error: (err) => {
            console.log(err);
            this.alertService.errorAlert(err.error);
          },
        });
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
        .post(this.env.laundryURL + 'api/Auth/Register', {
          first_name: First_name,
          last_name: Last_name,
          email: Email,
          password: Password,
          phone_number: Phone_Number,
        })
        .subscribe({
          next: async (data) => {
            await this.alertService.successAlert(
              'Registration successful',
              false
            );
            this.registerToSignIN();
          },
          error: (err) => {
            console.log(err);
            if (err.error) {
              this.alertService.errorAlert(err.error);
            } else {
              this.alertService.errorAlert(
                'An error occurred during registration.'
              );
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
