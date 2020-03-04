import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudiesComponent } from './edit-studies.component';

describe('EditStudiesComponent', () => {
  let component: EditStudiesComponent;
  let fixture: ComponentFixture<EditStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
