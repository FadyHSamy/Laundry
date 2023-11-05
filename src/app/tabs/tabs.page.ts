import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor() {}

  tabsDetails: { tabName: string; tabRedirect: string; tabIcon: string }[] = [
    { tabName: 'homepage', tabIcon: 'home-outline', tabRedirect: 'homepage' },
    { tabName: 'menu', tabIcon: 'menu-outline', tabRedirect: 'menu' },
  ];
}
