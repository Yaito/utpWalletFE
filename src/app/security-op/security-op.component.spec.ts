import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityOpComponent } from './security-op.component';

describe('SecurityOpComponent', () => {
  let component: SecurityOpComponent;
  let fixture: ComponentFixture<SecurityOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityOpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
