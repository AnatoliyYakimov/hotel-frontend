import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RoomFilterConstraints} from '../../../_shared/entities/room/room-filter-constraints';
import {Observable, of} from 'rxjs';
import * as moment from 'moment';
import {shareReplay} from 'rxjs/operators';

@Injectable()
export class RoomsFilterResolver implements Resolve<RoomFilterConstraints> {
  // tslint:disable-next-line:cyclomatic-complexity
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<RoomFilterConstraints> | Promise<RoomFilterConstraints> | RoomFilterConstraints {
    const params = route.queryParams;
    const constraints: RoomFilterConstraints = {
      checkIn: params.checkIn != undefined ? moment(params.checkIn)
        : moment(),
      checkOut: params.checkOut != undefined ? moment(params.checkOut)
        : moment().add(1, 'days'),
      places: params.places != undefined ? parseInt(params.places, 10)
        : 2,
      twinBed: params.twinBed != undefined ? params.twinBed as boolean
        : undefined,
      categories: params.categories != undefined ? (params.categories as string[]).map(value => Number(value)) as number[]
        : [],
      facilities: params.facilities != undefined ? (params.facilities as string[]).map(value => Number(value)) as number[]
        : [],
      price: params.price != undefined ? (params.price as string[]).map(value => Number(value)) as number[]
        : [0, 5000]
    };
    return of(constraints).pipe(shareReplay());
  }

}
