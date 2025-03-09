import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import {Session} from "../models/user";
import {LocalStorageService} from '../services/local-storage.service';
import {AuthService} from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

export function tokenIntercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.url.includes('token')) {
    return next(req);
  }
  const localStorageService = inject(LocalStorageService);
  const session = localStorageService.getToken();
  const authService = inject(AuthService);
  if (session) {
    req = addToken(req, session);
  }
  return next(req)
    .pipe(
    catchError(err => {
      if (err.status === 401 && session) {
        const refreshToken = localStorageService.getRefreshToken();
        try {
          return authService.refreshToken(refreshToken!).pipe(
            switchMap((res: Session) => {
              isRefreshing = false;
              localStorageService.setToken(res.access);
              localStorageService.setRefreshToken(res.refresh);
              refreshTokenSubject.next(res.access);
              return next(addToken(req, res.access));
            }),
            catchError((err) => {
              if (err.url.includes('token')) {
                authService.logout();
              }
              return next(req);
            }),
          );
        } catch (e) {
          console.log(e);
        }
      }
      return throwError(() => err);
    }));
}

function addToken(request: HttpRequest<any>, token: string) {
  return request.clone({
    headers:
      request.headers.set('Authorization', `Bearer ${token}`),
  });
}

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn) {
  if (!isRefreshing) {
    const localStorageService = inject(LocalStorageService);
    const authService = inject(AuthService);
    isRefreshing = true;
    refreshTokenSubject.next(null);
    const refreshToken = localStorageService.getRefreshToken();
    if (refreshToken) {
      return authService.refreshToken(refreshToken).pipe(
        switchMap((res: Session) => {
          isRefreshing = false;
          localStorageService.setToken(res.access);
          localStorageService.setRefreshToken(res.refresh);
          refreshTokenSubject.next(res.access);
          return next(addToken(request, res.access));
        }),
        catchError((err) => {
          authService.logout();
          return next(request);
        }),
      );
    }
    return next(request);
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next(addToken(request, jwt));
      }));
  }

}
