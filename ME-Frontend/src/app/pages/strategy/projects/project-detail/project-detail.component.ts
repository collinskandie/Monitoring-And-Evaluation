import {ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'ngx-project-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @Input() projectId:string

  constructor() { }

  ngOnInit(): void {
   
  }

 
}
