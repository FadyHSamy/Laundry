import { Injectable } from '@angular/core';
import { userInfo } from '../models/userInfo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  //#region User Information
  private userInfo!: userInfo; // Store user information here

  async setUserInfo(user: userInfo): Promise<void> {
    this.userInfo = user;
  }

  getUserInfo(): userInfo {
    return this.userInfo;
  }
  //#endregion
}
