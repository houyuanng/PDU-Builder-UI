import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecsComponent } from './edit-specs.component';

describe('EditSpecsComponent', () => {
  let component: EditSpecsComponent;
  let fixture: ComponentFixture<EditSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpecsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
