import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddPatientComponent} from './add-patient/add-patient.component';
import {ProfileComponent} from '../../core/components/profile/profile.component';
import {SingleRecordMedicComponent} from './single-record-medic/single-record-medic.component';
import {CalendarComponent} from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'add-patient',
    component: AddPatientComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'records/:id',
    component: SingleRecordMedicComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicRoutingModule { }
