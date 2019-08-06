import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {TokenPair} from './token-pair';
import {catchError, distinctUntilChanged, filter, first, map, shareReplay, tap} from 'rxjs/operators';
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
  authToken = '';
  refreshToken = '';
}

export class Guest implements UserAuthInfo {
  tokens = new DefaultTokens();
  login = 'Guest';
  authority = 'Anonymous';
  id = 0;
}

export interface RawUserInfo {
  sub: string;
  authority: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authSubj$ = new BehaviorSubject<TokenPair>(new DefaultTokens());
  public readonly auth$: Observable<UserAuthInfo> = this.authSubj$.asObservable().pipe(
    map(tokens => AuthService.parseTokens(tokens)),
    tap(x => console.log('User logged', x)),
    shareReplay()
  );
  private readonly authStatusSubj$ = new BehaviorSubject<AuthStatus>({status: 'UNAUTHORIZED'});
  public readonly authStatus$ = this.authStatusSubj$.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserInfoFromLocalStorage();

    this.auth$.pipe(
      filter(value => !(value instanceof Guest)),
      distinctUntilChanged()
    ).subscribe(
      value => {
        console.log('Saving UserInfo into localStorage', value);
        localStorage.setItem('auth', JSON.stringify(value));
      }
    );

    // DEBUG
    this.auth$.subscribe(
      value => console.log('Authentication update. Now logged as:', value.login)
    );

    this.authStatus$.subscribe(
      value => console.log('Authentication status update:', value.status)
    );
  }

  private static parseTokens(tokens: TokenPair): UserAuthInfo {
    console.log('decoding tokens', tokens);
    if (tokens instanceof DefaultTokens) {
      return new Guest();
    }
    const rawData = jwt_decode(tokens.authToken) as RawUserInfo;
    return {
      login: rawData.sub,
      id: rawData.id,
      tokens,
      authority: rawData.authority
    } as UserAuthInfo;
  }

  public authenticate(login: string, password: string) {
    return this.http.post<TokenPair>('/api/login', {
      login,
      password
    }).pipe(
      catchError(this.handleFetchingErrorFunction())).subscribe(
      x => {
        console.log('Authenticating result');
        this.authSubj$.next(x);
        this.authStatusSubj$.next(AuthStatusConstants.AUTHORIZED);
      }
    );
  }

  public refreshTokens(refreshToken: string): Observable<TokenPair> {
    this.authStatusSubj$.next(AuthStatusConstants.REFRESHING);
    console.log('Attempting to refresh tokens');
    const fetchResult = this.http.get<TokenPair>('/api/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }).pipe(
      catchError(this.handleFetchingErrorFunction())
    );
    fetchResult.subscribe(
      tokens => {
        console.log('Successfully refreshed tokens');
        this.authStatusSubj$.next(AuthStatusConstants.AUTHORIZED);
        this.authSubj$.next(tokens);
      }
    );
    return this.authSubj$.pipe(first());
  }

  public handleFetchingErrorFunction() {

    return (err: Error) => {
      console.log('Got error while fetching user data', err);
      if (err instanceof HttpErrorResponse && err.status === 401) {
        this.authStatusSubj$.next(AuthStatusConstants.UNAUTHORIZED);
      }
      return throwError(err);
    };
  }

  private loadUserInfoFromLocalStorage() {
    console.log('Retrieving UserInfo from localStorage');
    const storageItem = localStorage.getItem('auth');
    if (storageItem != null) {
      const auth: UserAuthInfo = JSON.parse(storageItem) as UserAuthInfo;
      this.authStatusSubj$.next(AuthStatusConstants.AUTHORIZED);
      this.authSubj$.next(auth.tokens);
    }
  }
}
