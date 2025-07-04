export interface Staff {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  igreja: string;
  country: string;
  nationality: string;
  area: string;
  kitCama: string;
  quarto: string;
  healthyForm: string;
  checkedIn: boolean;
  checkedInAt?: Date;
}

export interface CheckInState {
  pendingStaff: Staff[];
  checkedInStaff: Staff[];
} 