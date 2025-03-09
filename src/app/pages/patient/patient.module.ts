import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsComponent } from './records/records.component';
import {PatientRoutingModule} from './patient-routing.module';
import { StatusComponent } from './status/status.component';
import {AgGridAngular} from 'ag-grid-angular';
import { SingleRecordComponent } from './single-record/single-record.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgbInputDatepicker, NgbTimepicker} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    RecordsComponent,
    StatusComponent,
    SingleRecordComponent,
    AddAppointmentComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    AgGridAngular,
    ReactiveFormsModule,
    FaIconComponent,
    NgbInputDatepicker,
    NgbTimepicker,
  ]
})
export class PatientModule { }
