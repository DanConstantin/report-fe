import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {PatientService} from '../../../core/services/patient.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ToastService} from '../../../core/services/toast.service';

@UntilDestroy()
@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.scss'
})
export class AddAppointmentComponent {

  public minDate = {day: (new Date()).getDate(), month:(new Date()).getMonth() + 1, year:(new Date()).getFullYear()}

  protected readonly faCalendar = faCalendar;

  public form: FormGroup = new FormGroup({
    requestDescription: new FormControl('', [Validators.required, Validators.minLength(20)]),
    date: new FormControl(null, [Validators.required]),
    time: new FormControl(null, [Validators.required]),
  })

  constructor(private patientService: PatientService, private toastService: ToastService) {
  }

  saveAppointment() {
    const value = this.form.value;
    this.patientService.addBooking({...value, date: `${value.date.year}-${value.date.month}-${value.date.day}`,
      time: `${value.time.hour.toString().padStart(2, '0')}:${value.time.minute.toString().padStart(2, '0')}`}).pipe(untilDestroyed(this))
      .subscribe(() => {
        this.toastService.show({
          message: "Booking added successfully",
          classname: 'bg-success text-light',
          delay: 5000
        });
        this.form.reset();
      });
  }
}
