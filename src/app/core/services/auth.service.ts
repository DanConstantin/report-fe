import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {BehaviorSubject, catchError, Observable, Subject, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {Doctor, LoginDto, Patient, Role, Session, User} from '../models/user';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$: Observable<Role | null>;
  private _isLoggedIn$ = new BehaviorSubject<Role | null>(null);

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {
    this.isLoggedIn$ = this._isLoggedIn$.asObservable();
    const token = this.localStorageService.getToken();
    if (token) {
      this._isLoggedIn$.next(this.localStorageService.getRole(token));
    }
  }

  login(data: LoginDto): Observable<Session | null> {
    return this.http.post<Session>(`${environment.apiUrl}login/`, data).pipe(
      tap((res) => {
        if (res) {
          this.localStorageService.setToken(res.access);
          this.localStorageService.setRefreshToken(res.refresh);
          const role = this.localStorageService.getRole(res.access);
          this._isLoggedIn$.next(role);
          if (role === Role.MEDIC) {
            this.router.navigate(['/medic']);
          } else {
            this.router.navigate(['/patient'])
          }
        }
    }));
  }

  refreshToken(refresh: string) {
    return this.http.post<Session>(`${environment.apiUrl}token/refresh/`, {refresh});
  }

  profile() {
    return this.http.get<Doctor | Patient>(`${environment.apiUrl}profile/`).pipe(catchError(err => {
      return throwError(() => new Error(err.error.detail));
    }))
  }

  updateProfile(profile: Doctor | Patient) {
    return this.http.put<User>(`${environment.apiUrl}profile/`, profile).pipe(catchError(err => {
      return throwError(() => new Error(err.error.detail));
    }))
  }

  logout() {
    this.localStorageService.clear();
    this.router.navigate(['/']);
    this._isLoggedIn$.next(null);
  }
}
