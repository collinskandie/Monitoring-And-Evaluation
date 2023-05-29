import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleMapComponent } from './bubble-map.component';

describe('BubbleMapComponent', () => {
  let component: BubbleMapComponent;
  let fixture: ComponentFixture<BubbleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubbleMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
