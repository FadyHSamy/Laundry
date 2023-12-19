import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root',
})
export class BackButtonService {
  constructor(private platform: Platform) {}

  setupBackButtonHandler(callback: () => void) {
    this.platform.backButton.subscribeWithPriority(10, callback);

    App.addListener('backButton', callback);
  }
}
