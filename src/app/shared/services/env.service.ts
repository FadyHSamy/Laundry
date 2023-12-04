import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor() {}
  public get laundryURL():string {
    return 'https://laundry-express.onrender.com/';
  }
}
