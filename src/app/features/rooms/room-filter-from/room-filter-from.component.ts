import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {RoomFilterConstraints} from '../../../_shared/entities/room/room-filter-constraints';
import {Options} from 'ng5-slider';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {RoomType} from '../../../_shared/entities/room/room-type';
import {RoomCategory} from '../../../_shared/entities/room/room-category';
import {ActivatedRoute} from '@angular/router';
import {Facility} from '../../../_shared/entities/room/facility';

@Component({
  selector: 'app-room-filter-from',
  templateUrl: './room-filter-from.component.html',
  styleUrls: ['./room-filter-from.component.scss']
})
export class RoomFilterFromComponent implements OnInit {
  @Input() types: RoomType[] = [];
  @Input() categories: RoomCategory[] = [];
  @Output() filterChange = new EventEmitter<RoomFilterConstraints>();
  _filterForm: FormGroup;
  private showAdvancedConstraints = false;
  private readonly placesSliderOptions: Options = {
    floor: 1,
    ceil: 8,
    step: 1,
    noSwitching: true
  };

  private readonly priceSliderOptions: Options = {
    floor: 0,
    ceil: 5000,
    step: 50,
    noSwitching: true
  };

  // tslint:disable-next-line:cyclomatic-complexity
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    const constraints = this.route.snapshot.queryParams;
    this._filterForm = fb.group(
      {
        checkIn: fb.control(constraints.checkIn != undefined
          ? moment(constraints.checkIn)
          : moment()),
        checkOut: fb.control(constraints.checkOut != undefined
          ? moment(constraints.checkOut)
          : moment().add(1, 'days')),
        places: fb.control(constraints.places != undefined
          ? parseInt(constraints.places, 10)
          : 2),
        twinBed: fb.control(constraints.twinBed != undefined
          ? constraints.twinBed as boolean
          : undefined),
        categories: fb.control(constraints.categories != undefined
          ? constraints.categories as RoomCategory[]
          : []),
        facilities: fb.control(constraints.facilities != undefined
          ? constraints.facilities as Facility[]
          : []),
        price: fb.control(constraints.price != undefined
          ? constraints.price as number[]
          : [0, 5000]),
      }
    );
    this._filterForm.valueChanges
    .pipe(
      distinctUntilChanged(),
      // tslint:disable-next-line:no-any
      map<any, RoomFilterConstraints>(value => value as RoomFilterConstraints),
      debounceTime<RoomFilterConstraints>(1500)
    )
    .subscribe(value => this.filterChange.emit(value));
  }

  onAdvancedSettingsClick() {
    this.showAdvancedConstraints = !this.showAdvancedConstraints;
  }

  ngOnInit() {
  }

}
