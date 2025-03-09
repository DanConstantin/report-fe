import {Injectable} from '@angular/core';
import {Role} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getRole(token: string): Role {
    const user = JSON.parse(atob(token.split('.')[1]));
    return user.role;
  }

  isPatient(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return this.getRole(token) === Role.PATIENT;
  }

  getName(): string {
    const token = this.getToken();
    if (!token) {
      return '';
    }
    const user = JSON.parse(atob(token.split('.')[1]));
    return user.name;
  }

  clear() {
    localStorage.clear();
  }
}
