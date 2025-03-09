import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import {RouterLink} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgbDatepickerModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastComponent} from './components/toast/toast.component';
import { ProfileComponent } from './components/profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    ToastComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    FaIconComponent,
    NgbToastModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
  exports: [
    NavComponent,
    FooterComponent,
    ToastComponent,
    ProfileComponent
  ]
})
export class CoreModule { }
