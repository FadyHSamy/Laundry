import { Component, OnInit } from '@angular/core';
import { userInfo } from 'src/app/shared/models/userInfo';
import {
  faBell,
  faBars,
  faGear,
  faMoon,
  faArrowRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperOptions } from 'swiper/types';
import { AuthService } from 'src/app/shared/services/AuthService.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  constructor(
    private authSerive: AuthService,
    private alertService: AlertService
  ) {}

  //#region Variables
  faBell = faBell;
  faBars = faBars;
  faGear = faGear;
  faMoon = faMoon;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faUser = faUser;
  userInfo!: userInfo;
  //#endregion

  ngOnInit() {
    this.userInfo = this.authSerive.getUserInfo();
  }
  logOut() {
    this.authSerive.logout();
  }
  test(){
    console.log(this.userInfo)
  }
}
