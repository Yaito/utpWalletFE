import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityResultComponent } from './security-result.component';

describe('SecurityResultComponent', () => {
  let component: SecurityResultComponent;
  let fixture: ComponentFixture<SecurityResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
