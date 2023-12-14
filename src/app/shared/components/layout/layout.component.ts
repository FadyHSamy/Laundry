import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import {
  faBasketShopping,
  faHome,
  faUser,
  faBars,
  faRegistered,
} from '@fortawesome/free-solid-svg-icons';
import { TabVisibilityService } from '../../services/tab-visibility.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private tabVisibilityService: TabVisibilityService,
    private menuController: MenuController
  ) {}
  //#region variables
  faBasketShopping = faBasketShopping;
  faHome = faHome;
  faUser = faUser;
  faBars = faBars;
  faRegistered = faRegistered;
  //#endregion

  ngOnInit() {
    this.menuController.swipeGesture(false);
  }

  isTabVisible = (): boolean => {
    return this.tabVisibilityService.isTabVisible;
  };
  openMenu() {
    this.menuController.toggle(); // Toggle the menu state (open/close)
  }
}
