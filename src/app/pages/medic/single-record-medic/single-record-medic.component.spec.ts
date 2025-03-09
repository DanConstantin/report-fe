import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRecordMedicComponent } from './single-record-medic.component';

describe('SingleRecordComponent', () => {
  let component: SingleRecordMedicComponent;
  let fixture: ComponentFixture<SingleRecordMedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleRecordMedicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleRecordMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
