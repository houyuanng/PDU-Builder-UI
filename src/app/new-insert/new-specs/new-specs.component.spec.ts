import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpecsComponent } from './new-specs.component';

describe('NewSpecsComponent', () => {
  let component: NewSpecsComponent;
  let fixture: ComponentFixture<NewSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSpecsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
