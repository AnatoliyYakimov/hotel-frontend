import {Moment} from 'moment';

export interface RoomFilterConstraints {
  checkIn: Moment;
  checkOut: Moment;
  places?: number;
  twinBed?: boolean;
  categories?: number[];
  facilities?: number[];
  price?: number[];
}
