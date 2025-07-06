// Student interface (renamed from Staff for clarity)
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

// Actual Staff interface (from staffs.csv)
export interface StaffMember {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  igreja: string; // church in Portuguese
  country: string;
  nationality: string;
  area: string;
  kitCama: string; // bed kit
  quarto: string; // room
  healthyForm: string;
  checkedIn: boolean;
  checkedInAt?: Date;
}

export interface CheckInState {
  pendingStaff: Staff[];
  checkedInStaff: Staff[];
}

export interface StaffCheckInState {
  pendingStaff: StaffMember[];
  checkedInStaff: StaffMember[];
} 