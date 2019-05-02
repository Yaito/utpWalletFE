import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOpComponent } from './transaction-op.component';

describe('TransactionOpComponent', () => {
  let component: TransactionOpComponent;
  let fixture: ComponentFixture<TransactionOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionOpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
