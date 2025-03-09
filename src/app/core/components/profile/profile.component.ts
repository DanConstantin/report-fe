import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ToastService} from '../../services/toast.service';
import {catchError, throwError} from 'rxjs';
import {LocalStorageService} from '../../services/local-storage.service';
import {Doctor, Patient} from '../../models/user';
import { parseISO } from 'date-fns';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  public form: FormGroup | null = null;
  public isPatient = false;
  public faCalendar = faCalendar;

  constructor(
    private _auth: AuthService,
    private _toastService: ToastService,
    private _localStorage: LocalStorageService,
  ) {}

  ngOnInit() {
    this._auth.profile().pipe(untilDestroyed(this)).subscribe(profile => {
      this.form = new FormGroup({
        username: new FormControl(profile.username, [Validators.required, Validators.minLength(6)]),
        email: new FormControl(profile.email, [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.minLength(6)]),
        first_name: new FormControl(profile.first_name, [Validators.required, Validators.minLength(2)]),
        last_name: new FormControl(profile.last_name, [Validators.required, Validators.minLength(2)]),
        city: new FormControl(profile.city, [Validators.required, Validators.minLength(3)]),
        telephone: new FormControl(profile.telephone, [Validators.required, Validators.minLength(3)]),
      });
      if (this._localStorage.isPatient()) {
        const patient = profile as Patient;
        const dateOfBirth = parseISO(patient.dateOfBirth);
        this.isPatient = true;
        this.form.addControl('hasInsurance', new FormControl({value: patient.hasInsurance, disabled: true}));
        this.form.addControl('allergies', new FormControl(patient.allergies, [Validators.minLength(3)]));
        this.form.addControl('previousConditions', new FormControl({value: patient.previousConditions, disabled: true}));
        this.form.addControl('medications', new FormControl(patient.medications, [Validators.minLength(3)]));
        this.form.addControl('dateOfBirth', new FormControl({day: dateOfBirth.getDate(), month:dateOfBirth.getMonth() + 1, year:dateOfBirth.getFullYear()}, [Validators.required]));
      } else {
        const doctor = profile as Doctor;
        this.form.addControl('specialization', new FormControl(doctor.specialization, [Validators.required]));
      }
    });
  }

  save() {
    if (this.form?.valid) {
      const value = {...this.form.value};
      if (this.isPatient) {
        value.dateOfBirth = `${value.dateOfBirth.year}-${value.dateOfBirth.month}-${value.dateOfBirth.day}`;
      }
      this._auth.updateProfile(value).pipe(untilDestroyed(this)).subscribe(() => {
        this._toastService.show({
          message: "Profile updated successfully",
          classname: 'bg-success text-light',
          delay: 5000
        });
        this.form?.controls['password'].setValue('');
      })
    }
  }
}
