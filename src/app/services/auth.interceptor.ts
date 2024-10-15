import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Constants } from '../types/Constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('------ intercepting request--------');
  const storageService = inject(SessionStorageService);
  const router = inject(Router);
  req = req.clone({
    setHeaders: {
      'Authorization': 'Bearer ' + storageService.fetchItem(Constants.TOKEN)
    }
  });
  return next(req).pipe(
    catchError((error : HttpErrorResponse) => {
      if(error.status === 401)  {
        storageService.clearLocalStorage();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
