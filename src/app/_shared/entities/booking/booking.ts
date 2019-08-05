import {Moment} from 'moment';
import {Room} from '../room/room';

export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  checkInDate: Moment;
  checkOutDate: Moment;
  realCheckInDate: Moment;
  realCheckOutDate: Moment;
  room: Room;
}
