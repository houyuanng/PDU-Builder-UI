import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBomComponent } from './order-bom.component';

describe('OrderBomComponent', () => {
  let component: OrderBomComponent;
  let fixture: ComponentFixture<OrderBomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
