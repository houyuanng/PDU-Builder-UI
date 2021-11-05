import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaterialComponent } from './new-material.component';

describe('NewMaterialComponent', () => {
  let component: NewMaterialComponent;
  let fixture: ComponentFixture<NewMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
