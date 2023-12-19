import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import {
  faBasketShopping,
  faHome,
  faUser,
  faBars,
  faRegistered,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { TabVisibilityService } from '../../services/tab-visibility.service';
import { Router } from '@angular/router';
import { BackButtonService } from '../../services/back-button.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private tabVisibilityService: TabVisibilityService,
    private menuController: MenuController,
    private router: Router,
    private backButtonService: BackButtonService
  ) {}
  //#region variables
  shoppingBasketIcon = faBasketShopping;
  homeIcon = faHome;
  userIcon = faUser;
  barsIcon = faBars;
  registeredIcon = faRegistered;
  listIcon = faList;
  menuItems = [
    {
      name: 'Home',
      icon: this.homeIcon,
      redirectTo: '/homepage',
    },
    {
      name: 'Cart',
      icon: this.shoppingBasketIcon,
      redirectTo: '/cart',
    },
    {
      name: 'Orders',
      icon: this.listIcon,
      redirectTo: '/orders',
    },
  ];
  //#endregion

  ngOnInit() {
    this.menuController.swipeGesture(false);
    this.backButtonService.setupBackButtonHandler(async () => {});
  }

  isTabVisible = (): boolean => {
    return this.tabVisibilityService.isTabVisible;
  };
  toggleMainMenu = () => {
    this.menuController.toggle('mainMenu');
  };
  navigateToPage = (redirectTo: string) => {
    this.toggleMainMenu();
    this.router.navigateByUrl(redirectTo);
  };
}
