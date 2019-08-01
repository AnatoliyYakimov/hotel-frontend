import {Injectable} from '@angular/core';
import {Room} from '../../_shared/entities/room/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsNamingService {

  constructor() {
  }

  formatName(room: Room): string {
    const suffix = this.chooseSuffix(room.type.places);
    const family = room.type.twinbed ? 'семейный ' : '';
    return `${suffix}местный ${family}номер`;
  }

  // tslint:disable-next-line:cyclomatic-complexity
  private chooseSuffix(places: number) {
    let suffix: string;
    switch (places) {
      case 1:
        suffix = 'Одно';
        break;
      case 2:
        suffix = 'Двух';
        break;
      case 3:
        suffix = 'Трёх';
        break;
      case 4:
        suffix = 'Чертырёх';
        break;
      case 5:
        suffix = 'Пяти';
        break;
      case 6:
        suffix = 'Шести';
        break;
      case 7:
        suffix = 'Семи';
        break;
      case 8:
        suffix = 'Восьми';
        break;
      default:
        suffix = '????';
    }
    return suffix;
  }
}

