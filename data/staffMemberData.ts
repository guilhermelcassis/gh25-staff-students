import { StaffMember } from '../types/staff';
import { supabase } from '../lib/supabase';

// Database service functions for staff members
export const staffMemberService = {
  getAllStaff: async (): Promise<StaffMember[]> => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching staff:', error);
        return [];
      }

      // Transform Supabase data to our StaffMember interface
      return data.map(staff => ({
        id: staff.id,
        name: staff.name,
        email: staff.email || '',
        cellphone: staff.cellphone || '',
        igreja: staff.igreja || '',
        country: staff.country || '',
        nationality: staff.nationality || '',
        area: staff.area || '',
        kitCama: staff.kit_cama || '',
        quarto: staff.quarto || '',
        healthyForm: staff.healthy_form || '',
        checkedIn: staff.checked_in,
        checkedInAt: staff.checked_in_at ? new Date(staff.checked_in_at) : undefined,
      }));
    } catch (error) {
      console.error('Error in getAllStaff:', error);
      return [];
    }
  },

  updateStaffMember: async (id: string, updates: Partial<StaffMember>): Promise<StaffMember | null> => {
    try {
      // Transform our interface to Supabase format
      const supabaseUpdates: any = {};
      
      if (updates.name) supabaseUpdates.name = updates.name;
      if (updates.email) supabaseUpdates.email = updates.email;
      if (updates.cellphone) supabaseUpdates.cellphone = updates.cellphone;
      if (updates.igreja) supabaseUpdates.igreja = updates.igreja;
      if (updates.country) supabaseUpdates.country = updates.country;
      if (updates.nationality) supabaseUpdates.nationality = updates.nationality;
      if (updates.area) supabaseUpdates.area = updates.area;
      if (updates.kitCama) supabaseUpdates.kit_cama = updates.kitCama;
      if (updates.quarto) supabaseUpdates.quarto = updates.quarto;
      if (updates.healthyForm) supabaseUpdates.healthy_form = updates.healthyForm;
      if (updates.checkedIn !== undefined) supabaseUpdates.checked_in = updates.checkedIn;
      if (updates.checkedInAt) supabaseUpdates.checked_in_at = updates.checkedInAt.toISOString();

      const { data, error } = await supabase
        .from('staff')
        .update(supabaseUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating staff member:', error);
        return null;
      }

      // Transform back to our interface
      return {
        id: data.id,
        name: data.name,
        email: data.email || '',
        cellphone: data.cellphone || '',
        igreja: data.igreja || '',
        country: data.country || '',
        nationality: data.nationality || '',
        area: data.area || '',
        kitCama: data.kit_cama || '',
        quarto: data.quarto || '',
        healthyForm: data.healthy_form || '',
        checkedIn: data.checked_in,
        checkedInAt: data.checked_in_at ? new Date(data.checked_in_at) : undefined,
      };
    } catch (error) {
      console.error('Error in updateStaffMember:', error);
      return null;
    }
  },

  getStaffMemberById: async (id: string): Promise<StaffMember | null> => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching staff member:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        email: data.email || '',
        cellphone: data.cellphone || '',
        igreja: data.igreja || '',
        country: data.country || '',
        nationality: data.nationality || '',
        area: data.area || '',
        kitCama: data.kit_cama || '',
        quarto: data.quarto || '',
        healthyForm: data.healthy_form || '',
        checkedIn: data.checked_in,
        checkedInAt: data.checked_in_at ? new Date(data.checked_in_at) : undefined,
      };
    } catch (error) {
      console.error('Error in getStaffMemberById:', error);
      return null;
    }
  },

  checkInStaffMember: async (id: string): Promise<boolean> => {
    const updates = {
      checkedIn: true,
      checkedInAt: new Date()
    };
    const result = await staffMemberService.updateStaffMember(id, updates);
    return result !== null;
  },

  checkOutStaffMember: async (id: string): Promise<boolean> => {
    const updates = {
      checkedIn: false,
      checkedInAt: undefined
    };
    const result = await staffMemberService.updateStaffMember(id, updates);
    return result !== null;
  }
}; 