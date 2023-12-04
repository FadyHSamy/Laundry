import { Component, OnInit } from '@angular/core';
import { userInfo } from 'src/app/shared/models/userInfo';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  constructor(private StorageService: StorageService) {}
  userInfo: userInfo = this.StorageService.getUserInfo();
  ngOnInit() {
    console.log(this.userInfo);
  }
}
