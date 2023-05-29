import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionReportComponent } from './champion-report.component';

describe('ChampionReportComponent', () => {
  let component: ChampionReportComponent;
  let fixture: ComponentFixture<ChampionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
