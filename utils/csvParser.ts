import { Staff } from '../types/staff';

export function parseCSVToStaff(csvContent: string): Staff[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(';');
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(';');
    
    return {
      id: `staff-${index + 1}`,
      name: values[0] || '',
      email: values[1] || '',
      cellphone: values[2] || '',
      igreja: values[3] || '',
      country: values[4] || '',
      nationality: values[5] || '',
      area: values[6] || '',
      kitCama: values[7] || '',
      quarto: values[8] || '',
      healthyForm: values[9] || '',
      checkedIn: false
    };
  }).filter(staff => staff.name.trim() !== ''); // Filter out empty names
}

export function getStaffDisplayName(staff: Staff): string {
  return staff.name || 'Unknown Staff';
}

export function getStaffLocation(staff: Staff): string {
  const parts = [];
  if (staff.country) parts.push(staff.country);
  if (staff.igreja) parts.push(staff.igreja);
  return parts.join(' • ') || 'Location not specified';
} 