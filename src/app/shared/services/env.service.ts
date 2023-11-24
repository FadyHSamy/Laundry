import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor() {}
  public get laundryURL():string {
    return 'http://192.168.1.18:44395/';
  }
}
