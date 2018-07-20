import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartOneComponent } from './smart-one.component';

describe('SmartOneComponent', () => {
  let component: SmartOneComponent;
  let fixture: ComponentFixture<SmartOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
