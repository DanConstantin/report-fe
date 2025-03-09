import {Component, OnInit} from '@angular/core';
import {Booking} from '../../../core/models/patient';
import {ColDef, SizeColumnsToFitGridStrategy} from 'ag-grid-community';
import {format} from 'date-fns';
import {ViewBookingButtonComponent} from '../../medic/dashboard/view-booking-button.component';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PatientService} from '../../../core/services/patient.service';
import {LocalStorageService} from '../../../core/services/local-storage.service';

@UntilDestroy()
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {
  public nextBooking: Booking | null = null;
  public allBookings: Booking[] = [];
  public colDefs: ColDef[] = [
    { field: 'patient_full_name', headerName: 'Patient Name', filter: true},
    { field: 'timestamp', headerName: 'Time', filter: 'agDateColumnFilter', valueFormatter: p => format(p.value, 'dd/MM/yyyy HH:mm'), sort: 'asc' },
    { field: 'requestDescription', headerName: 'Request', filter: true},
    { field: 'diagnosisDescription', headerName: 'Diagnosis', filter: true },
    { field: 'id', headerName: 'Action', cellRenderer: ViewBookingButtonComponent },
  ];
  public autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 150,
    columnLimits: [
      {
        colId: 'timestamp',
        maxWidth: 150,
        minWidth: 150,
      },
      {
        colId: 'id',
        maxWidth: 100,
        minWidth: 100,
      }
    ]
  };
  public name = '';

  constructor(private _patientService: PatientService, private _localStorage: LocalStorageService) { }

  ngOnInit() {
    this.name = this._localStorage.getName();
    this._patientService.getBookings().pipe(untilDestroyed(this)).subscribe(dashboard => {
      this.allBookings = dashboard.all;
      if (dashboard.next) {
        dashboard.next.timestamp = format(dashboard.next.timestamp, 'yyyy-MM-dd HH:mm');
      }
      this.nextBooking = dashboard.next;
    })
  }
}
