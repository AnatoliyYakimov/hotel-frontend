import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {TokenPair} from './token-pair';
import {catchError, first, map, tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {UserAuthInfo} from './user-auth-info';


export interface AuthStatus {
  status: 'UNAUTHORIZED' | 'AUTHORIZED' | 'REFRESHING';
}

export class AuthStatusConstants {
  public static UNAUTHORIZED: AuthStatus = {
    status: 'UNAUTHORIZED'
  };
  public static AUTHORIZED: AuthStatus = {
    status: 'AUTHORIZED'
  };
  public static REFRESHING: AuthStatus = {
    status: 'REFRESHING'
  };
}

export class DefaultTokens implements TokenPair {
  accessToken = '';
  refreshToken = '';
}

export class Guest implements UserAuthInfo {
  tokens = new DefaultTokens();
  login = 'Guest';
  authority = 'Anonymous';
  id = 0;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authSubj$ = new BehaviorSubject<TokenPair>(new DefaultTokens());
  public readonly auth$: Observable<UserAuthInfo> = this.authSubj$.asObservable().pipe(
    map(tokens => AuthService.parseTokens(tokens))
  );
  private readonly authStatusSubj$ = new BehaviorSubject<AuthStatus>({status: 'UNAUTHORIZED'});
  public readonly authStatus$ = this.authStatusSubj$.asObservable();

  constructor(private http: HttpClient) {

  }

  private static parseTokens(tokens: TokenPair): UserAuthInfo {
    return tokens instanceof DefaultTokens ? new Guest() : jwt_decode(tokens.accessToken) as UserAuthInfo;
  }

  public authenticate(login: string, password: string): Observable<TokenPair> {
    this.http.post<TokenPair>('/api/login', {
      login,
      password
    }).pipe(
      catchError(this.handleFetchingErrorFunction())
    ).subscribe(value => {
      this.authSubj$.next(value);
      this.authStatusSubj$.next(AuthStatusConstants.AUTHORIZED);
    });
    return this.authSubj$.pipe(first());
  }

  public refreshTokens(refreshToken: string): Observable<TokenPair> {
    this.authStatusSubj$.next(AuthStatusConstants.REFRESHING);
    return this.http.get<TokenPair>('/api/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
    .pipe(
      tap(tokens => {
        this.authStatusSubj$.next(AuthStatusConstants.AUTHORIZED);
        this.authSubj$.next(tokens);
      }),
      catchError(this.handleFetchingErrorFunction())
    );
  }

  public handleFetchingErrorFunction() {
    return (err: Error) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        this.authStatusSubj$.next(AuthStatusConstants.UNAUTHORIZED);
      }
      return throwError(err);
    };
  }

  private loadUserInfoFromLocalStorage() {
    const storageItem = localStorage.getItem('auth');
    if (storageItem != null) {
      const auth: UserAuthInfo = JSON.parse(storageItem) as UserAuthInfo;
      this.refreshTokens(auth.tokens.refreshToken);
    }
  }

}
