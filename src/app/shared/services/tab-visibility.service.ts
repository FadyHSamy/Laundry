import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabVisibilityService {
  public isTabVisible: boolean = true;
  constructor() { }
}
