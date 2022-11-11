import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelformComponent } from './travelform.component';

describe('TravelformComponent', () => {
  let component: TravelformComponent;
  let fixture: ComponentFixture<TravelformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
