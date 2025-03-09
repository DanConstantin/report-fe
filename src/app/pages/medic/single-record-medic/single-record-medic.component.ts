import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Booking, DoctorBooking} from '../../../core/models/patient';
import {format} from 'date-fns';
import {DoctorService} from '../../../core/services/doctor.service';
import { environment } from '../../../../environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-single-record-medic',
  templateUrl: './single-record-medic.component.html',
  styleUrl: './single-record-medic.component.scss'
})
export class SingleRecordMedicComponent implements OnInit {

  public booking: DoctorBooking | null = null;
  public editActive = false;
  public environment = environment;
  public newImage = null;
  public previewImage = null;
  public loadingPredicton = false;

  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.doctorService.getBooking(id).pipe(untilDestroyed(this)).subscribe(booking => {
          booking.timestamp = format(booking.timestamp, 'yyyy-MM-dd HH:mm');
          this.booking = booking;
        });
      }
    })
  }

  saveDiagnostic() {
    this.editActive = !this.editActive;
    this.doctorService.updateDiagnostic(this.booking!.id, this.booking!.diagnosisDescription)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  upload(input: any) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImage = event.target.result;
      this.cd.detectChanges();
    };
    reader.readAsDataURL(input.target.files[0]);
    const fd = new FormData();
    fd.append('image', input.target.files[0]);
    this.loadingPredicton = true;
    this.doctorService.makePrediction(this.booking!.id, fd).pipe(untilDestroyed(this)).subscribe(response => {
      this.booking!.aiPrediction = response.result;
      this.loadingPredicton = false;
    })
  }
}
