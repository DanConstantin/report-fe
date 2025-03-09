
import { Component } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../core/services/local-storage.service';

@Component({
  template: `<button type="button" (click)="showBooking()" class="btn btn-primary px-3 btn-sm">View</button>`,
})
export class ViewBookingButtonComponent implements ICellRendererAngularComp {

  constructor(private router: Router, private localStorageService: LocalStorageService) {
  }

  private id = null;
  private route = 'patient';
  agInit(params: any): void {
    this.id = params.value;
    if (!this.localStorageService.isPatient()) {
      this.route = 'medic';
    }
  }
  refresh(params: any) {
    return true;
  }
  showBooking() {
    this.router.navigate([this.route, 'records', this.id]);
  }
}
