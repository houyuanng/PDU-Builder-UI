import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsertComponent } from './edit-insert.component';

describe('EditInsertComponent', () => {
  let component: EditInsertComponent;
  let fixture: ComponentFixture<EditInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
