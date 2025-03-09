import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LocalStorageService} from "../services/local-storage.service";
import {Role} from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class MedicGuard implements CanActivate {
  constructor(public localStorageService: LocalStorageService, public router: Router) {}
  canActivate(): boolean {
    const token = this.localStorageService.getToken();
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }
    if (this.localStorageService.getRole(token) !== Role.MEDIC) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
