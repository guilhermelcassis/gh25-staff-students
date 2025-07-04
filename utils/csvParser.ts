import { Staff } from '../types/staff';

export function parseCSVToStaff(csvContent: string): Staff[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(';');
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(';');
    
    return {
      id: `staff-${index + 1}`,
      name: values[0] || '',
      status: values[1] || '',
      gender: values[2] || '',
      email: values[3] || '',
      phone: values[4] || '',
      age: values[5] || '',
      country: values[6] || '',
      nationality: values[7] || '',
      language: values[8] || '',
      church: values[9] || '',
      room: values[10] || '',
      bedKit: values[11] || '',
      bus: values[12] || '',
      documents: values[13] || '',
      underageDoc: values[14] || '',
      healthyForm: values[15] || '',
      obs: values[16] || '',
      checkedIn: false,
      checkedInAt: undefined,
    };
  }).filter(staff => staff.name.trim() !== ''); // Filter out empty names
}

export function getStaffDisplayName(staff: Staff): string {
  return staff.name || 'Unknown';
}

export function getStaffLocation(staff: Staff): string {
  const parts = [];
  if (staff.country) parts.push(staff.country);
  if (staff.church) parts.push(staff.church);
  return parts.join(' • ') || 'Location not specified';
} 