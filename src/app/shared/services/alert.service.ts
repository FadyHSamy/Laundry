import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  public async errorAlert(statusMessage: string): Promise<void> {
    let alert = this.alertController.create({
      cssClass: 'alert-controller',
      header: '',
      message: statusMessage,
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {},
        },
      ],
    });
    (await alert).present();
  }
  public async successAlert(
    statusMessage: string,
    reloadPage: boolean
  ): Promise<void> {
    let alert = this.alertController.create({
      cssClass: 'alert-controller',
      header: '',
      message: statusMessage,
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            reloadPage === true ? window.location.reload() : '';
          },
        },
      ],
    });
    (await alert).present();
  }
}
