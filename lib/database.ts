import { supabase, Staff, Student, CheckinLog } from './supabase'

export type PersonType = 'staff' | 'student'
export type Person = Staff | Student

// Generic functions that work with both staff and students
export class DatabaseService {
  
  // Get all people (staff or students)
  static async getAllPeople(type: PersonType): Promise<Person[]> {
    const { data, error } = await supabase
      .from(type === 'staff' ? 'staff' : 'students')
      .select('*')
      .order('name')
    
    if (error) {
      console.error(`Error fetching ${type}:`, error)
      return []
    }
    
    return data || []
  }

  // Get pending check-ins
  static async getPendingPeople(type: PersonType): Promise<Person[]> {
    const { data, error } = await supabase
      .from(type === 'staff' ? 'staff' : 'students')
      .select('*')
      .eq('checked_in', false)
      .order('name')
    
    if (error) {
      console.error(`Error fetching pending ${type}:`, error)
      return []
    }
    
    return data || []
  }

  // Get checked-in people
  static async getCheckedInPeople(type: PersonType): Promise<Person[]> {
    const { data, error } = await supabase
      .from(type === 'staff' ? 'staff' : 'students')
      .select('*')
      .eq('checked_in', true)
      .order('checked_in_at', { ascending: false })
    
    if (error) {
      console.error(`Error fetching checked-in ${type}:`, error)
      return []
    }
    
    return data || []
  }

  // Check someone in
  static async checkIn(type: PersonType, personId: string, performedBy?: string): Promise<boolean> {
    const { data, error } = await supabase
      .from(type === 'staff' ? 'staff' : 'students')
      .update({ 
        checked_in: true, 
        checked_in_at: new Date().toISOString() 
      })
      .eq('id', personId)
      .select()
      .single()
    
    if (error) {
      console.error(`Error checking in ${type}:`, error)
      return false
    }

    // Log the action
    if (data) {
      await this.logAction(personId, type, data.name, 'checked_in', performedBy)
    }
    
    return true
  }

  // Uncheck someone (undo check-in)
  static async uncheck(type: PersonType, personId: string, performedBy?: string): Promise<boolean> {
    const { data, error } = await supabase
      .from(type === 'staff' ? 'staff' : 'students')
      .update({ 
        checked_in: false, 
        checked_in_at: null 
      })
      .eq('id', personId)
      .select()
      .single()
    
    if (error) {
      console.error(`Error unchecking ${type}:`, error)
      return false
    }

    // Log the action
    if (data) {
      await this.logAction(personId, type, data.name, 'unchecked', performedBy)
    }
    
    return true
  }

  // Search people
  static async searchPeople(type: PersonType, query: string): Promise<Person[]> {
    const { data, error } = await supabase
      .from(type === 'staff' ? 'staff' : 'students')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,country.ilike.%${query}%,${type === 'staff' ? 'igreja' : 'church'}.ilike.%${query}%`)
      .order('name')
    
    if (error) {
      console.error(`Error searching ${type}:`, error)
      return []
    }
    
    return data || []
  }

  // Log an action
  static async logAction(
    personId: string, 
    personType: PersonType, 
    personName: string, 
    action: string, 
    performedBy?: string
  ): Promise<void> {
    const { error } = await supabase
      .from('checkin_log')
      .insert({
        person_id: personId,
        person_type: personType,
        person_name: personName,
        action,
        performed_by: performedBy || 'unknown'
      })
    
    if (error) {
      console.error('Error logging action:', error)
    }
  }

  // Get check-in statistics
  static async getStats(type: PersonType): Promise<{ total: number, checkedIn: number, pending: number }> {
    const { data: allData, error: allError } = await supabase
      .from(type === 'staff' ? 'staff' : 'students')
      .select('checked_in')
    
    if (allError) {
      console.error(`Error fetching ${type} stats:`, allError)
      return { total: 0, checkedIn: 0, pending: 0 }
    }

    const total = allData?.length || 0
    const checkedIn = allData?.filter(person => person.checked_in).length || 0
    const pending = total - checkedIn

    return { total, checkedIn, pending }
  }

  // Subscribe to real-time changes
  static subscribeToChanges(type: PersonType, callback: (payload: any) => void) {
    return supabase
      .channel(`${type}_changes`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: type === 'staff' ? 'staff' : 'students' 
        }, 
        callback
      )
      .subscribe()
  }

  // Bulk insert staff data
  static async insertStaffData(staffData: Omit<Staff, 'id' | 'checked_in' | 'checked_in_at' | 'created_at' | 'updated_at'>[]): Promise<boolean> {
    const { error } = await supabase
      .from('staff')
      .insert(staffData)
    
    if (error) {
      console.error('Error inserting staff data:', error)
      return false
    }
    
    return true
  }

  // Bulk insert student data
  static async insertStudentData(studentData: Omit<Student, 'id' | 'checked_in' | 'checked_in_at' | 'created_at' | 'updated_at'>[]): Promise<boolean> {
    const { error } = await supabase
      .from('students')
      .insert(studentData)
    
    if (error) {
      console.error('Error inserting student data:', error)
      return false
    }
    
    return true
  }

  // Update person data
  static async updatePerson(type: PersonType, personId: string, updateData: Partial<Person>): Promise<boolean> {
    const { error } = await supabase
      .from(type === 'staff' ? 'staff' : 'students')
      .update(updateData)
      .eq('id', personId)
    
    if (error) {
      console.error(`Error updating ${type}:`, error)
      return false
    }
    
    return true
  }

  // Get person by ID
  static async getPersonById(type: PersonType, personId: string): Promise<Person | null> {
    const { data, error } = await supabase
      .from(type === 'staff' ? 'staff' : 'students')
      .select('*')
      .eq('id', personId)
      .single()
    
    if (error) {
      console.error(`Error fetching ${type} by ID:`, error)
      return null
    }
    
    return data
  }
} 