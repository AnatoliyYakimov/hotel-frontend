import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class SimpleLogInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.info('Sent request to', req.urlWithParams);
    return next.handle(req).pipe(
      tap((resp: HttpEvent<any>) => {
        if (resp.type === HttpEventType.Response) {
          console.info('Got response from', resp.url);
        }
      })
    );
  }

}
