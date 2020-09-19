import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwnotificationComponent } from './pwnotification.component';

describe('PwnotificationComponent', () => {
  let component: PwnotificationComponent;
  let fixture: ComponentFixture<PwnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
