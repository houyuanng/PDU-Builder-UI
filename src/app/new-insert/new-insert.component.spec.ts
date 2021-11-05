import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInsertComponent } from './new-insert.component';

describe('NewInsertComponent', () => {
  let component: NewInsertComponent;
  let fixture: ComponentFixture<NewInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
