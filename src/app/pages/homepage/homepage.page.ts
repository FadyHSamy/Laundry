import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { userInfo } from 'src/app/shared/models/userInfo';
import {
  faBell,
  faBars,
  faGear,
  faMoon,
  faArrowRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { SwiperOptions } from 'swiper/types';
import { AuthService } from 'src/app/shared/services/AuthService.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private loaderService: LoaderService
  ) {}

  //#region Variables
  faBell = faBell;
  faBars = faBars;
  faGear = faGear;
  faMoon = faMoon;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faUser = faUser;
  panelDetails = [
    {
      promotionId: 1,
      promotionImage: '../../../assets/icon/salesPanel-1.png',
      url: null,
    },
    {
      promotionId: 2,
      promotionImage: '../../../assets/icon/amaz.png',
      url: null,
    },
  ];
  userInfo!: userInfo;

  //#endregion

  async ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
  }
  ngAfterViewInit(): void {
    const swiperEl = document.querySelector('swiper-container');
    const swiperParams: SwiperOptions = {
      slidesPerView: 1,
      loop: false,
      pagination: { enabled: true },
      autoplay: { delay: 1500 },
      speed: 1000,
    };
    Object.assign(swiperEl!, swiperParams);
    swiperEl!.initialize();
  }
  logOut() {
    this.authService.logout();
  }
  accountBtn() {
    console.log(this.userInfo);
  }
  clickingImage(promotionId: number) {
    this.alertService.successAlert(
      'Coming Soon ' + promotionId.toString(),
      false
    );
  }
}
