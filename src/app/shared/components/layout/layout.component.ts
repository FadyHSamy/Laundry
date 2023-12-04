import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  faBasketShopping,
  faHome,
  faUser,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { TabVisibilityService } from '../../services/tab-visibility.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private tabVisibilityService: TabVisibilityService) {}
  //#region variables
  faBasketShopping = faBasketShopping;
  faHome = faHome;
  faUser = faUser;
  faBars = faBars;
  //#endregion

  ngOnInit() {}

  isTabVisible(): boolean {
    return this.tabVisibilityService.isTabVisible;
  }

}
