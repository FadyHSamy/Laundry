import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  constructor() {}
  //#region Variables
  selectedCountryImage: string =
    'https://image.similarpng.com/very-thumbnail/2020/04/Flag-Egypt-circle-png.png';
  selectedCountryCode: string = '+20';
  //#endregion
  ngOnInit() {}

  countryDetails: {
    countryName: string;
    countryImage: string;
    countryCode: string;
  }[] = [
    {
      countryName: 'Egypt',
      countryImage:
        'https://image.similarpng.com/very-thumbnail/2020/04/Flag-Egypt-circle-png.png',
      countryCode: '+20',
    },
  ];
}
