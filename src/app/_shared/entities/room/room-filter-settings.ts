import {RoomCategory} from './room-category';
import {Facility} from './facility';

export interface RoomFilterSettings {
  categories?: RoomCategory[];
  facilities?: Facility[];
}
