import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PatientService} from '../../../core/services/patient.service';
import {Booking} from '../../../core/models/patient';
import {format} from 'date-fns';
import {environment} from '../../../../environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-single-record',
  templateUrl: './single-record.component.html',
  styleUrl: './single-record.component.scss'
})
export class SingleRecordComponent implements OnInit {

  public booking: Booking | null = null;

  constructor(private route: ActivatedRoute, private patientService: PatientService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.patientService.getBooking(id).pipe(untilDestroyed(this)).subscribe(booking => {
          booking.timestamp = format(booking.timestamp, 'yyyy-MM-dd HH:mm');
          this.booking = booking;
        });
      }
    })
  }

  protected readonly environment = environment;
}
