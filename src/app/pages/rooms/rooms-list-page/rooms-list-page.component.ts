import {Component, OnInit} from '@angular/core';
import {Room} from '../../../_shared/entities/room/room';
import {combineLatest, Observable} from 'rxjs';
import {RoomsService} from '../../../features/rooms/rooms.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomFilterConstraints} from '../../../_shared/entities/room/room-filter-constraints';
import {distinctUntilChanged, filter, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {RoomCategory} from '../../../_shared/entities/room/room-category';
import {RoomType} from '../../../_shared/entities/room/room-type';


@Component({
  selector: 'app-rooms-list-page',
  templateUrl: './rooms-list-page.component.html',
  styleUrls: ['./rooms-list-page.component.scss']
})
export class RoomsListPageComponent implements OnInit {
  private rooms$: Observable<Room[]>;
  private filteredRooms$: Observable<Room[]>;

  private filterConstraints$?: Observable<RoomFilterConstraints>;

  private types$: Observable<RoomType[]> = this.service.getAllTypes();
  private categories$: Observable<RoomCategory[]> = this.service.getAllCategories();

  constructor(private service: RoomsService, private route: ActivatedRoute, private router: Router) {
    this.filterConstraints$ = this.route.data
    .pipe(
      filter(value => value != undefined && value !== {}),
      map(data => data.constraints as RoomFilterConstraints),
      tap(x => console.log('filterConstraints update: ', x)),
      shareReplay()
    );
    this.rooms$ = this.filterConstraints$
    .pipe(
      distinctUntilChanged(
        (x, y) => x.checkIn === y.checkIn
          && x.checkOut === y.checkOut
      ),
      tap(() => console.log('Fetching rooms from server')),
      switchMap(value => this.service.getFreeRoomsForPeriod(value.checkIn, value.checkOut)),
      shareReplay()
    );
    this.filteredRooms$ = combineLatest(this.rooms$, this.filterConstraints$).pipe(
      tap(x => console.log('Filtering rooms', x)),
      map(value => {
        const _rooms = value[0];
        const _constraints = value[1];
        const filtered: Room[] = [];
        for (const room of _rooms) {
          if (this.isSuitable(room, _constraints)) {
            filtered.push(room);
          }
        }
        return filtered;
      })
    );
  }

  doFilter(constraints: RoomFilterConstraints): void {
    if (constraints != undefined) {
      this.router.navigate([], {
        queryParams: {
          ...constraints
        },
        relativeTo: this.route
      });
    }
  }

  // tslint:disable-next-line:cyclomatic-complexity
  private isSuitable(room: Room, constraints: RoomFilterConstraints): boolean {
    if (constraints == undefined) {
      return true;
    }
    if (!(constraints.places == undefined) && (room.type.places !== constraints.places)) {
      return false;
    }
    if (!(constraints.price == undefined) && constraints.price.length === 2
      && (room.dailyPrice < constraints.price[0] || room.dailyPrice > constraints.price[1])) {
      return false;
    }
    if (!(constraints.categories == undefined) && constraints.categories.length > 0
      && !constraints.categories.includes(room.category)) {
      return false;
    }
    return !(constraints.twinBed != undefined && constraints.twinBed !== room.type.twinbed);

  }

  ngOnInit() {

  }
}
