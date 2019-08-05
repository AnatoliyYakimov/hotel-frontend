import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../_shared/entities/users/user';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.API_URL + '/users/' + id);
  }
}
