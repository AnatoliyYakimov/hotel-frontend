import {Injectable, Provider} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Room} from '../../_shared/entities/room/room';
import {environment} from '../../../environments/environment';
import * as moment from 'moment';
import {Moment} from 'moment';
import {RoomCategory} from '../../_shared/entities/room/room-category';
import {RoomType} from '../../_shared/entities/room/room-type';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private API = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  static getAllCategories(): Observable<RoomCategory[]> {
    // return this.http.get<RoomCategory[]>(this.API + '/categories');
    return EMPTY;
  }

  static getAllTypes(): Observable<RoomType[]> {
    // return this.http.get<RoomType[]>(this.API + '/types');
    return EMPTY;
  }

  getFreeRoomsForPeriod(checkIn: Moment, checkOut: Moment): Observable<Room[]> {
    const params = {
      checkIn: moment(checkIn).format('DD-MM-YYYY'),
      checkOut: moment(checkOut).format('DD-MM-YYYY')
    };
    console.log(params);
    return this.http.get<Room[]>(this.API + '/rooms/vacancies',
      {
        params
      });
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
