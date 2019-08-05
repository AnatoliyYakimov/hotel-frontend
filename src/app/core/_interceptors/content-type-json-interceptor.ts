import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ContentTypeJsonInterceptor implements HttpInterceptor {
  // tslint:disable-next-line:no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes(environment.API_URL)) {
      const newReq = req.clone({
          headers: req.headers.append('Content-Type', 'application/json')
        }
      );
      return next.handle(newReq);
    }
    return next.handle(req);
  }

}
