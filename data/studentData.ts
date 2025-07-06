import { Staff } from '../types/staff';
import { supabase } from '../lib/supabase';

// Database service functions for students
export const studentService = {
  getAllStudents: async (): Promise<Staff[]> => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching students:', error);
        return [];
      }

      // Transform Supabase data to our Staff interface (students use the Staff interface)
      return data.map(student => ({
        id: student.id,
        name: student.name,
        status: student.status || '',
        gender: student.gender || '',
        email: student.email || '',
        phone: student.phone || '',
        age: student.age || '',
        country: student.country || '',
        nationality: student.nationality || '',
        language: student.language || '',
        church: student.church || '',
        room: student.room || '',
        bedKit: student.bed_kit || '',
        bus: student.bus || '',
        documents: student.documents || '',
        underageDoc: student.underage_doc || '',
        healthyForm: student.healthy_form || '',
        obs: student.obs || '',
        checkedIn: student.checked_in,
        checkedInAt: student.checked_in_at ? new Date(student.checked_in_at) : undefined,
      }));
    } catch (error) {
      console.error('Error in getAllStudents:', error);
      return [];
    }
  },

  updateStudent: async (id: string, updates: Partial<Staff>): Promise<Staff | null> => {
    try {
      // Transform our interface to Supabase format
      const supabaseUpdates: any = {};
      
      if (updates.name) supabaseUpdates.name = updates.name;
      if (updates.status) supabaseUpdates.status = updates.status;
      if (updates.gender) supabaseUpdates.gender = updates.gender;
      if (updates.email) supabaseUpdates.email = updates.email;
      if (updates.phone) supabaseUpdates.phone = updates.phone;
      if (updates.age) supabaseUpdates.age = updates.age;
      if (updates.country) supabaseUpdates.country = updates.country;
      if (updates.nationality) supabaseUpdates.nationality = updates.nationality;
      if (updates.language) supabaseUpdates.language = updates.language;
      if (updates.church) supabaseUpdates.church = updates.church;
      if (updates.room) supabaseUpdates.room = updates.room;
      if (updates.bedKit) supabaseUpdates.bed_kit = updates.bedKit;
      if (updates.bus) supabaseUpdates.bus = updates.bus;
      if (updates.documents) supabaseUpdates.documents = updates.documents;
      if (updates.underageDoc) supabaseUpdates.underage_doc = updates.underageDoc;
      if (updates.healthyForm) supabaseUpdates.healthy_form = updates.healthyForm;
      if (updates.obs) supabaseUpdates.obs = updates.obs;
      if (updates.checkedIn !== undefined) supabaseUpdates.checked_in = updates.checkedIn;
      if (updates.checkedInAt) supabaseUpdates.checked_in_at = updates.checkedInAt.toISOString();

      const { data, error } = await supabase
        .from('students')
        .update(supabaseUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating student:', error);
        return null;
      }

      // Transform back to our interface
      return {
        id: data.id,
        name: data.name,
        status: data.status || '',
        gender: data.gender || '',
        email: data.email || '',
        phone: data.phone || '',
        age: data.age || '',
        country: data.country || '',
        nationality: data.nationality || '',
        language: data.language || '',
        church: data.church || '',
        room: data.room || '',
        bedKit: data.bed_kit || '',
        bus: data.bus || '',
        documents: data.documents || '',
        underageDoc: data.underage_doc || '',
        healthyForm: data.healthy_form || '',
        obs: data.obs || '',
        checkedIn: data.checked_in,
        checkedInAt: data.checked_in_at ? new Date(data.checked_in_at) : undefined,
      };
    } catch (error) {
      console.error('Error in updateStudent:', error);
      return null;
    }
  },

  getStudentById: async (id: string): Promise<Staff | null> => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching student:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        status: data.status || '',
        gender: data.gender || '',
        email: data.email || '',
        phone: data.phone || '',
        age: data.age || '',
        country: data.country || '',
        nationality: data.nationality || '',
        language: data.language || '',
        church: data.church || '',
        room: data.room || '',
        bedKit: data.bed_kit || '',
        bus: data.bus || '',
        documents: data.documents || '',
        underageDoc: data.underage_doc || '',
        healthyForm: data.healthy_form || '',
        obs: data.obs || '',
        checkedIn: data.checked_in,
        checkedInAt: data.checked_in_at ? new Date(data.checked_in_at) : undefined,
      };
    } catch (error) {
      console.error('Error in getStudentById:', error);
      return null;
    }
  },

  checkInStudent: async (id: string): Promise<boolean> => {
    const updates = {
      checkedIn: true,
      checkedInAt: new Date()
    };
    const result = await studentService.updateStudent(id, updates);
    return result !== null;
  },

  checkOutStudent: async (id: string): Promise<boolean> => {
    const updates = {
      checkedIn: false,
      checkedInAt: undefined
    };
    const result = await studentService.updateStudent(id, updates);
    return result !== null;
  }
}; 