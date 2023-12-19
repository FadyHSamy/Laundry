import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/AuthService.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private authSerive: AuthService) {
    if (authSerive.isAuthenticated()) {
      this.router.navigateByUrl('/homepage');
    } else {
      router.navigateByUrl('/registration');
    }
  }
}
