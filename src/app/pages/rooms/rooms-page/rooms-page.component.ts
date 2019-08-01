import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(x => console.log('Got data from server 111', x));

  }

  ngOnInit() {
  }

}
