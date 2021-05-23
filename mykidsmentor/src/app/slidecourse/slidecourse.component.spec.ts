import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidecourseComponent } from './slidecourse.component';

describe('SlidecourseComponent', () => {
  let component: SlidecourseComponent;
  let fixture: ComponentFixture<SlidecourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidecourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
