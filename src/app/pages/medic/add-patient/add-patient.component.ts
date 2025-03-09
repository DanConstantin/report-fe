import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DoctorService} from '../../../core/services/doctor.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ToastService} from '../../../core/services/toast.service';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

@UntilDestroy()
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss'
})
export class AddPatientComponent {

  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(3)]),
    hasInsurance: new FormControl(false),
    allergies: new FormControl('', [Validators.minLength(3)]),
    previousConditions: new FormControl('', [Validators.minLength(3)]),
    medications: new FormControl('', [Validators.minLength(3)]),
    dateOfBirth: new FormControl({day: 1, month: 1, year: 1990}, [Validators.required]),
  })

  constructor(private _doctorService: DoctorService, private toastService: ToastService) {
  }

  public add() {
    if (this.form.valid) {
      const value = {...this.form.value};
      value.dateOfBirth = `${value.dateOfBirth.year}-${value.dateOfBirth.month}-${value.dateOfBirth.day}`;
      this._doctorService.addPatient(value).pipe(untilDestroyed(this)).subscribe(() => {
        this.toastService.show({
          message: "Patient added successfully",
          classname: 'bg-success text-light',
          delay: 5000
        });
        this.form.reset();
      });
    }
  }

  protected readonly faCalendar = faCalendar;
}
