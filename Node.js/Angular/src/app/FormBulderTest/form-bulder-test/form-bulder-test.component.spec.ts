import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBulderTestComponent } from './form-bulder-test.component';

describe('FormBulderTestComponent', () => {
  let component: FormBulderTestComponent;
  let fixture: ComponentFixture<FormBulderTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBulderTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBulderTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
