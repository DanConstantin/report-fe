import {Component, OnInit} from '@angular/core';
import {Booking} from '../../../core/models/patient';
import {PatientService} from '../../../core/services/patient.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {format, formatISO} from 'date-fns';

@UntilDestroy()
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent implements OnInit {
  public allBookings: Booking[] = [];
  public nextBooking: Booking | null = null;

  constructor(private _patientService: PatientService) { }

  ngOnInit() {
    this._patientService.getBookings().pipe(untilDestroyed(this)).subscribe(dashboard => {
      dashboard.all.sort((a, b) => {
        if (formatISO(a.timestamp) < formatISO(b.timestamp)) {
          return -1;
        } else {
          return 1;
        }
      });
      dashboard.all = dashboard.all.map(b => {
        b.timestamp = format(b.timestamp, 'yyyy-MM-dd HH:mm');
        return b;
      });
      this.allBookings = dashboard.all;
      this.nextBooking = dashboard.next;
    })
  }
}
