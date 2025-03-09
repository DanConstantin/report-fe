import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MedicRoutingModule} from './medic-routing.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgGridAngular} from 'ag-grid-angular';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {ViewBookingButtonComponent} from './dashboard/view-booking-button.component';
import {SingleRecordMedicComponent} from './single-record-medic/single-record-medic.component';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AddPatientComponent,
    ViewBookingButtonComponent,
    SingleRecordMedicComponent,
    CalendarComponent,
  ],
    imports: [
        CommonModule,
        MedicRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridAngular,
        FaIconComponent,
        NgbInputDatepicker,
    ]
})
export class MedicModule { }
