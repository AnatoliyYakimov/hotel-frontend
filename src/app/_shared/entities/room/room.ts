import {RoomType} from './room-type';
import {RoomCategory} from './room-category';
import {Facility} from './facility';

export interface Room {
  number: number;
  floor: number;
  type: RoomType;
  category: RoomCategory;
  facilities: Facility[];
}
