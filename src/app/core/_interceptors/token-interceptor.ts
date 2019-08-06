import {Injectable, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService, AuthStatus, AuthStatusConstants} from '../services/auth/auth.service';
import {catchError, filter, first, switchMap, tap} from 'rxjs/operators';
import {TokenPair} from '../services/auth/token-pair';
import {UserAuthInfo} from '../services/auth/user-auth-info';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  // tslint:disable-next-line:no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('api') || req.url.includes('login') || req.url.includes('refresh')) {
      return next.handle(req);
    }
    return this.auth.auth$.pipe(
      tap(x => console.log('Adding token to request', x)),
      first(),
      switchMap(authInfo => this.fetchRequest(req, next, authInfo.tokens)),
      catchError(err => {
        if (!(err instanceof HttpErrorResponse && err.status === 401)) {
          return throwError(err);
        }
        return this.auth.authStatus$.pipe(
          first(),
          switchMap(status => this.handleAuthStatus(status, req, next))
        );
      })
    );
  }

  // tslint:disable-next-line:no-any
  private refreshTokenAndRetry(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.auth$.pipe(
      first(),
      switchMap(info => {
        return this.auth.refreshTokens(info.tokens.refreshToken).pipe(
          switchMap((tokens) => this.fetchRequest(req, next, tokens))
        );
      })
    );
  }

  // tslint:disable-next-line:no-any
  private waitForRefreshResultAndRetry(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Waiting for tokens to refresh');
    return this.auth.authStatus$.pipe(
      filter(value => value !== AuthStatusConstants.REFRESHING),
      first(),
      switchMap(() => this.auth.auth$.pipe(first())),
      switchMap(value => this.fetchRequest(req, next, value.tokens))
    );
  }

  // tslint:disable-next-line:no-any
  private fetchRequest(req: HttpRequest<any>, next: HttpHandler, tokens: TokenPair): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${tokens.authToken}`)
    });
    return next.handle(newReq);
  }

  // tslint:disable-next-line:no-any
  private handleAuthStatus(status: AuthStatus, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    switch (status) {
      case AuthStatusConstants.AUTHORIZED:
        return this.auth.auth$.pipe(
          first(),
          switchMap((info: UserAuthInfo) =>
            this.fetchRequest(req, next, info.tokens)
          )
        );
      case AuthStatusConstants.UNAUTHORIZED:
        return this.refreshTokenAndRetry(req, next);
      case AuthStatusConstants.REFRESHING:
        return this.waitForRefreshResultAndRetry(req, next);
      default:
        return next.handle(req);
    }
  }
}

export function authInterceptorFactory(service: AuthService) {
  return new TokenInterceptor(service);
}

export const TOKEN_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useFactory: authInterceptorFactory,
  multi: true,
  deps: [AuthService]
};
