export interface Session {
  access: string;
  refresh: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  city: string;
  telephone: string;
  password?: string;
  role?: Role;
  access_token?: string;
  refresh_token?: string;
}

export interface Doctor extends User {
  specialization: string;
}

export interface Patient extends User {
  dateOfBirth: string;
  hasInsurance: boolean;
  allergies: string;
  medications: string;
  previousConditions: string;
}

export enum Role {
  MEDIC = 'MEDIC',
  PATIENT = 'PATIENT',
}

export interface UsersCount {
  count: number;
}

export interface Prediction {
  result: string;
}
