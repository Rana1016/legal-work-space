import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('user')!);
        if (!!currentUser) {
            
        }
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (request.method != 'DELETE' && event instanceof HttpResponse) {
                (<any>window).pageLoading = false;
            }
            return event;
        }));
    }
}
