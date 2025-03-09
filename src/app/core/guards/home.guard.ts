import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LocalStorageService} from "../services/local-storage.service";
import {Role} from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(public localStorageService: LocalStorageService, public router: Router) {}
  canActivate(): boolean {
    const token = this.localStorageService.getToken();
    if (token) {
      if (this.localStorageService.getRole(token) === Role.MEDIC) {
        this.router.navigate(['/medic']);
        return false;
      } else {
        this.router.navigate(['/patient']);
        return false;
      }
    }
    return true;
  }
}
