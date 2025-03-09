import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {TrialComponent} from './pages/trial/trial.component';
import {LoginComponent} from './pages/login/login.component';
import {MedicGuard} from './core/guards/medic.guard';
import {PatientGuard} from './core/guards/patient.guard';
import {HomeGuard} from './core/guards/home.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [HomeGuard]
  },
  {
    path: 'trial',
    component: TrialComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [HomeGuard]
  },
  {
    path: 'medic',
    loadChildren: () => import('./pages/medic/medic.module').then(m => m.MedicModule),
    canActivate: [MedicGuard],
  },
  {
    path: 'patient',
    loadChildren: () => import('./pages/patient/patient.module').then(m => m.PatientModule),
    canActivate: [PatientGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
