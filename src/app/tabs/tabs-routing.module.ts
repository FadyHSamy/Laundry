import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'homepage',
        loadChildren: () =>
          import('../pages/homepage/homepage-routing.module').then(
            (m) => m.HomepagePageRoutingModule
          ),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('../pages/menu/menu-routing.module').then(
            (m) => m.MenuPageRoutingModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/homepage',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
