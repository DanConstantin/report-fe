import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../../core/services/doctor.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Booking} from '../../../core/models/patient';
import { ColDef, SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { format } from "date-fns";
import {ViewBookingButtonComponent} from './view-booking-button.component';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public nextBookings: Booking[] = [];
  public allBookings: Booking[] = [];
  public colDefs: ColDef[] = [
    { field: 'patient_full_name', headerName: 'Patient Name', filter: true},
    { field: 'timestamp', headerName: 'Time', filter: 'agDateColumnFilter', valueFormatter: p => format(p.value, 'dd/MM/yyyy HH:mm'), sort: 'asc' },
    { field: 'requestDescription', headerName: 'Request', filter: true},
    { field: 'diagnosisDescription', headerName: 'Diagnosis', filter: true },
    { field: 'id', headerName: 'Action', cellRenderer: ViewBookingButtonComponent },
  ];
  public colDefsAll: ColDef[] = [
    { field: 'patient_full_name', headerName: 'Patient Name', filter: true},
    { field: 'timestamp', headerName: 'Time', filter: 'agDateColumnFilter', valueFormatter: p => format(p.value, 'dd/MM/yyyy HH:mm'), sort: 'desc' },
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

  constructor(private _doctorService: DoctorService) { }

  ngOnInit() {
    this._doctorService.getBookings().pipe(untilDestroyed(this)).subscribe(dashboard => {
      this.allBookings = dashboard.all;
      this.nextBookings = dashboard.today;
    })
  }
}
