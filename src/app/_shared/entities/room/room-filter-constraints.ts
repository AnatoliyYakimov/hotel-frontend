import {Moment} from 'moment';
import {RoomCategory} from './room-category';
import {Facility} from './facility';

export interface RoomFilterConstraints {
  checkIn: Moment;
  checkOut: Moment;
  places?: number;
  twinBed?: boolean;
  categories?: RoomCategory[];
  facilities?: Facility[];
  price?: number[];
}
