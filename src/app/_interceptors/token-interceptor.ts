import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService, AuthStatus, AuthStatusConstants} from '../_shared/services/auth/auth.service';
import {catchError, first, switchMap} from 'rxjs/operators';
import {TokenPair} from '../_shared/services/auth/token-pair';
import {UserAuthInfo} from '../_shared/services/auth/user-auth-info';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {

  }

  // tslint:disable-next-line:no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.auth$.pipe(
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
    return this.auth.authStatus$.pipe(
      first(),
      switchMap((status) => this.handleAuthStatus(status, req, next))
    );
  }

  // tslint:disable-next-line:no-any
  private fetchRequest(req: HttpRequest<any>, next: HttpHandler, tokens: TokenPair): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${tokens.accessToken}`)
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
