import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursehistoryComponent } from './coursehistory.component';

describe('CoursehistoryComponent', () => {
  let component: CoursehistoryComponent;
  let fixture: ComponentFixture<CoursehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
