import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Booking, PatientStatus} from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

  constructor(private http: HttpClient) {}

  public getBookings() {
    return this.http.get<PatientStatus>(`${environment.apiUrl}patient-status/`);
  }

  public getBooking(id: string) {
    return this.http.get<Booking>(`${environment.apiUrl}bookings/${id}/`);
  }

  public addBooking(form: any) {
    return this.http.post<Booking>(`${environment.apiUrl}create-booking/`, form);
  }
}
