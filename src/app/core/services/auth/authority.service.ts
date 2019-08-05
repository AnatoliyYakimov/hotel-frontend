import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {distinctUntilChanged, first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(private auth: AuthService) {
  }

  watch(authorities: string[]): Observable<boolean> {
    return this.auth.auth$.pipe(
      map(info => info.authority in authorities),
      distinctUntilChanged()
    );
  }

  has(authorities: string[]): Observable<boolean> {
    return this.watch(authorities).pipe(first());
  }
}
