import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecordsComponent} from './records/records.component';
import {ProfileComponent} from '../../core/components/profile/profile.component';
import {StatusComponent} from './status/status.component';
import {SingleRecordComponent} from './single-record/single-record.component';
import {AddAppointmentComponent} from './add-appointment/add-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: StatusComponent,
  },
  {
    path: 'records',
    component: RecordsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'records/:id',
    component: SingleRecordComponent,
  },
  {
    path: 'appointment',
    component: AddAppointmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
