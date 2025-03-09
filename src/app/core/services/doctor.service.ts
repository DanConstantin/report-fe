import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Prediction, User} from '../models/user';
import {Booking, Dashboard, DoctorBooking} from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {

  constructor(private http: HttpClient) {}

  public addPatient(patient: User) {
    return this.http.post(`${environment.apiUrl}patient/`, patient);
  }

  public getBookings() {
    return this.http.get<Dashboard>(`${environment.apiUrl}bookings/`);
  }

  public getBooking(id: string) {
    return this.http.get<DoctorBooking>(`${environment.apiUrl}bookings/${id}/`);
  }

  public updateDiagnostic(id: number, diagnosisDescription: string) {
    return this.http.put(`${environment.apiUrl}bookings/${id}/`, {diagnosisDescription});
  }

  public makePrediction(id: number, fd: FormData) {
    return this.http.post<Prediction>(`${environment.apiUrl}predict/${id}/`, fd);
  }
}
