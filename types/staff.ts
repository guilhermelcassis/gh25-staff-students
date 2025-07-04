export interface Staff {
  id: string;
  name: string;
  status: string;
  gender: string;
  email: string;
  phone: string;
  age: string;
  country: string;
  nationality: string;
  language: string;
  church: string;
  room: string;
  bedKit: string;
  bus: string;
  documents: string;
  underageDoc: string;
  healthyForm: string;
  obs: string;
  checkedIn: boolean;
  checkedInAt?: Date;
}

export interface CheckInState {
  pendingStaff: Staff[];
  checkedInStaff: Staff[];
} 