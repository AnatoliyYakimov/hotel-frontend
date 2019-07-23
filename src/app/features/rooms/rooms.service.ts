import {Injectable, Provider} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../_shared/entities/room/room';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private API = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.API + '/rooms');
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.API}/rooms/${id}`);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/rooms/${id}`);
  }

  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.API}/rooms/${id}`, room);
  }

  saveRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.API}/rooms`, room);
  }

}

export const ROOM_SERVICE_PROVIDER: Provider = {
  provide: RoomsService,
  useClass: RoomsService
};
