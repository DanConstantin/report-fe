import {inject} from '@angular/core';
import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastService} from '../services/toast.service';

export function errorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const toastService = inject(ToastService);
  return next(req)
    .pipe(
    catchError(err => {
      if (err.status !== 401 || err.url.includes('login')) {
        toastService.show({
          message: err.error.detail,
          classname: 'bg-danger text-light',
          delay: 5000
        });
      }
      return throwError(() => err);
    }));
}
