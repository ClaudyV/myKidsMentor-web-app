import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EverificationComponent } from './everification.component';

describe('EverificationComponent', () => {
  let component: EverificationComponent;
  let fixture: ComponentFixture<EverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
