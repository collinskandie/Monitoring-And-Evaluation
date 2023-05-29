import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartelyReportComponent } from './quartely-report.component';

describe('QuartelyReportComponent', () => {
  let component: QuartelyReportComponent;
  let fixture: ComponentFixture<QuartelyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuartelyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuartelyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
