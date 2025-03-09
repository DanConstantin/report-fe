import {Doctor, Patient} from './user';

export interface Booking {
  id: number;
  patient: string;
  timestamp: string;
  requestDescription: string;
  diagnosisDescription: string;
  doctor?: Doctor;
  mriUploaded: string;
  aiPrediction: string;
}

export interface DoctorBooking {
  id: number;
  patient: Patient;
  timestamp: string;
  requestDescription: string;
  diagnosisDescription: string;
  mriUploaded: string;
  aiPrediction: string;
}

export interface Dashboard {
  all: Booking[];
  today: Booking[];
}

export interface PatientStatus {
  next: Booking;
  all: Booking[];
}
