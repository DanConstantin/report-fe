import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

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

  saveAppointment() {
    console.log(this.form.value);
  }
}
