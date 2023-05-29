import { Component, OnInit } from '@angular/core';
import { SolarData } from '../../../../../@core/data/solar';

import { takeWhile } from 'rxjs/operators' ;

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  solarValue: number;
  private alive = true;
  constructor(private solarService: SolarData) {
    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
   }
 
  ngOnInit(): void {
    this.solarService.getSolarData()
    .pipe(takeWhile(() => this.alive))
    .subscribe((data) => {
      this.solarValue = data;
    });
  }

  

}
