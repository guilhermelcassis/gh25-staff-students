'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Staff, StaffMember, CheckInState } from '../types/staff';
import { studentService } from '../data/studentData';
import { staffMemberService } from '../data/staffMemberData';
import SearchBar from '../components/SearchBar';
import StaffCard from '../components/StaffCard';
import StaffDetail from '../components/StaffDetail';
import CheckedInDetail from '../components/CheckedInDetail';
import StaffMemberCard from '../components/StaffMemberCard';
import StaffMemberDetail from '../components/StaffMemberDetail';
import ModeToggle, { CheckInMode } from '../components/ModeToggle';

type View = 'pending' | 'completed' | 'detail' | 'checked-in-detail';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null);
  const [currentView, setCurrentView] = useState<View>('pending');
  const [checkInMode, setCheckInMode] = useState<CheckInMode>('students');
  const [loading, setLoading] = useState(true);
  
  // Load initial data
  const [allStaff, setAllStaff] = useState<Staff[]>([]);
  const [allStaffMembers, setAllStaffMembers] = useState<StaffMember[]>([]);

  // Initialize data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsData, staffData] = await Promise.all([
        studentService.getAllStudents(),
        staffMemberService.getAllStaff()
      ]);
      
      setAllStaff(studentsData);
      setAllStaffMembers(staffData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Compute pending and checked-in staff based on current mode
  const { pendingStaff, checkedInStaff } = useMemo(() => {
    if (checkInMode === 'students') {
      const pending = allStaff.filter(staff => !staff.checkedIn);
      const checkedIn = allStaff.filter(staff => staff.checkedIn);
      return { pendingStaff: pending, checkedInStaff: checkedIn };
    } else {
      const pending = allStaffMembers.filter(staff => !staff.checkedIn);
      const checkedIn = allStaffMembers.filter(staff => staff.checkedIn);
      return { pendingStaff: pending, checkedInStaff: checkedIn };
    }
  }, [allStaff, allStaffMembers, checkInMode]);

  // Filter staff based on search query
  const filteredPendingStaff = useMemo(() => {
    if (!searchQuery.trim()) return pendingStaff;
    
    const query = searchQuery.toLowerCase();
    return pendingStaff.filter(staff => {
      if (checkInMode === 'students') {
        const student = staff as Staff;
        return student.name.toLowerCase().includes(query) ||
               student.email.toLowerCase().includes(query) ||
               student.country.toLowerCase().includes(query) ||
               student.church.toLowerCase().includes(query) ||
               student.language.toLowerCase().includes(query) ||
               student.room.toLowerCase().includes(query);
      } else {
        const staffMember = staff as StaffMember;
        return staffMember.name.toLowerCase().includes(query) ||
               staffMember.email.toLowerCase().includes(query) ||
               staffMember.country.toLowerCase().includes(query) ||
               staffMember.igreja.toLowerCase().includes(query) ||
               staffMember.area.toLowerCase().includes(query) ||
               staffMember.quarto.toLowerCase().includes(query);
      }
    });
  }, [pendingStaff, searchQuery, checkInMode]);

  const filteredCheckedInStaff = useMemo(() => {
    if (!searchQuery.trim()) return checkedInStaff;
    
    const query = searchQuery.toLowerCase();
    return checkedInStaff.filter(staff => {
      if (checkInMode === 'students') {
        const student = staff as Staff;
        return student.name.toLowerCase().includes(query) ||
               student.email.toLowerCase().includes(query) ||
               student.country.toLowerCase().includes(query) ||
               student.church.toLowerCase().includes(query) ||
               student.language.toLowerCase().includes(query) ||
               student.room.toLowerCase().includes(query);
      } else {
        const staffMember = staff as StaffMember;
        return staffMember.name.toLowerCase().includes(query) ||
               staffMember.email.toLowerCase().includes(query) ||
               staffMember.country.toLowerCase().includes(query) ||
               staffMember.igreja.toLowerCase().includes(query) ||
               staffMember.area.toLowerCase().includes(query) ||
               staffMember.quarto.toLowerCase().includes(query);
      }
    });
  }, [checkedInStaff, searchQuery, checkInMode]);

  const handleStaffSelect = (staff: Staff | StaffMember) => {
    if (checkInMode === 'students') {
      setSelectedStaff(staff as Staff);
      if ((staff as Staff).checkedIn) {
        setCurrentView('checked-in-detail');
      } else {
        setCurrentView('detail');
      }
    } else {
      setSelectedStaffMember(staff as StaffMember);
      if ((staff as StaffMember).checkedIn) {
        setCurrentView('checked-in-detail');
      } else {
        setCurrentView('detail');
      }
    }
  };

  const handleCheckIn = async (staff: Staff | StaffMember) => {
    try {
      if (checkInMode === 'students') {
        await studentService.checkInStudent(staff.id);
        setAllStaff(prev => prev.map(s => s.id === staff.id ? { ...s, checkedIn: true, checkedInAt: new Date() } : s));
      } else {
        await staffMemberService.checkInStaffMember(staff.id);
        setAllStaffMembers(prev => prev.map(s => s.id === staff.id ? { ...s, checkedIn: true, checkedInAt: new Date() } : s));
      }
      setCurrentView('pending');
      setSelectedStaff(null);
      setSelectedStaffMember(null);
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleUncheck = async (staff: Staff | StaffMember) => {
    try {
      if (checkInMode === 'students') {
        await studentService.checkOutStudent(staff.id);
        setAllStaff(prev => prev.map(s => s.id === staff.id ? { ...s, checkedIn: false, checkedInAt: undefined } : s));
      } else {
        await staffMemberService.checkOutStaffMember(staff.id);
        setAllStaffMembers(prev => prev.map(s => s.id === staff.id ? { ...s, checkedIn: false, checkedInAt: undefined } : s));
      }
      setCurrentView('completed');
      setSelectedStaff(null);
      setSelectedStaffMember(null);
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  const handleBack = () => {
    if (currentView === 'checked-in-detail') {
      setCurrentView('completed');
    } else {
      setCurrentView('pending');
    }
    setSelectedStaff(null);
    setSelectedStaffMember(null);
  };

  const handleViewChange = (view: View) => {
    if (view !== 'detail' && view !== 'checked-in-detail') {
      setCurrentView(view);
      setSelectedStaff(null);
      setSelectedStaffMember(null);
    }
  };

  const handleStaffUpdate = async (id: string, updates: Partial<Staff>) => {
    try {
      const updatedStaff = await studentService.updateStudent(id, updates);
      if (updatedStaff) {
        setAllStaff(prev => prev.map(staff => staff.id === id ? updatedStaff : staff));
        setSelectedStaff(updatedStaff);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleStaffMemberUpdate = async (id: string, updates: Partial<StaffMember>) => {
    try {
      const updatedStaff = await staffMemberService.updateStaffMember(id, updates);
      if (updatedStaff) {
        setAllStaffMembers(prev => prev.map(staff => staff.id === id ? updatedStaff : staff));
        setSelectedStaffMember(updatedStaff);
      }
    } catch (error) {
      console.error('Error updating staff member:', error);
    }
  };

  // Create wrapper functions for staff member operations
  const handleStaffMemberCheckInById = (id: string) => {
    const staff = allStaffMembers.find(s => s.id === id);
    if (staff) handleCheckIn(staff);
  };

  const handleStaffMemberCheckOutById = (id: string) => {
    const staff = allStaffMembers.find(s => s.id === id);
    if (staff) handleUncheck(staff);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data from Supabase...</p>
        </div>
      </div>
    );
  }

  // Show staff detail view
  if (currentView === 'detail' && selectedStaff && checkInMode === 'students') {
    return (
      <StaffDetail
        staff={selectedStaff}
        onCheckIn={handleCheckIn}
        onBack={handleBack}
        onUpdate={(updatedStaff: Staff) => handleStaffUpdate(updatedStaff.id, updatedStaff)}
      />
    );
  }

  // Show staff member detail view
  if (currentView === 'detail' && selectedStaffMember && checkInMode === 'staff') {
    return (
      <StaffMemberDetail
        staffMember={selectedStaffMember}
        onCheckIn={handleCheckIn}
        onUncheck={handleUncheck}
        onBack={handleBack}
        onUpdate={(updatedStaffMember: StaffMember) => handleStaffMemberUpdate(updatedStaffMember.id, updatedStaffMember)}
      />
    );
  }

  // Show checked-in staff detail view
  if (currentView === 'checked-in-detail' && selectedStaff && checkInMode === 'students') {
    return (
      <CheckedInDetail
        staff={selectedStaff}
        onUncheck={handleUncheck}
        onBack={handleBack}
        onUpdate={(updatedStaff: Staff) => handleStaffUpdate(updatedStaff.id, updatedStaff)}
      />
    );
  }

  // Show checked-in staff member detail view
  if (currentView === 'checked-in-detail' && selectedStaffMember && checkInMode === 'staff') {
    return (
      <StaffMemberDetail
        staffMember={selectedStaffMember}
        onCheckIn={handleCheckIn}
        onUncheck={handleUncheck}
        onBack={handleBack}
        onUpdate={(updatedStaffMember: StaffMember) => handleStaffMemberUpdate(updatedStaffMember.id, updatedStaffMember)}
      />
    );
  }

  // Main list view
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-neutral-200 z-10">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Check-In System</h1>
          
          {/* Mode Toggle */}
          <ModeToggle mode={checkInMode} onModeChange={setCheckInMode} />
          
          {/* Search Bar */}
          <SearchBar onSearch={setSearchQuery} value={searchQuery} />
          
          {/* Tab Navigation */}
          <div className="flex bg-neutral-100 rounded-lg p-1 mt-4">
            <button
              onClick={() => handleViewChange('pending')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                currentView === 'pending'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Pending ({filteredPendingStaff.length})
            </button>
            <button
              onClick={() => handleViewChange('completed')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                currentView === 'completed'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Checked In ({filteredCheckedInStaff.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {currentView === 'pending' ? (
          <>
            {filteredPendingStaff.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  {searchQuery ? `No matching ${checkInMode} found` : `All ${checkInMode} checked in!`}
                </h3>
                <p className="text-neutral-500">
                  {searchQuery ? 'Try adjusting your search terms' : 'Great job! Everyone has been checked in.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPendingStaff.map((staff) => (
                  checkInMode === 'students' ? (
                    <StaffCard
                      key={staff.id}
                      staff={staff as Staff}
                      onSelect={handleStaffSelect}
                    />
                  ) : (
                    <StaffMemberCard
                      key={staff.id}
                      staffMember={staff as StaffMember}
                      onSelect={handleStaffSelect}
                    />
                  )
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {filteredCheckedInStaff.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  {searchQuery ? `No matching checked-in ${checkInMode} found` : `No ${checkInMode} checked in yet`}
                </h3>
                <p className="text-neutral-500">
                  {searchQuery ? 'Try adjusting your search terms' : `${checkInMode} will appear here after checking in.`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCheckedInStaff.map((staff) => (
                  checkInMode === 'students' ? (
                    <button
                      key={staff.id}
                      onClick={() => handleStaffSelect(staff)}
                      className="w-full text-left card-checked hover:bg-primary-100 transition-colors duration-200 active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-neutral-900 truncate mb-2">
                            {staff.name}
                          </h3>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-sm text-neutral-600 truncate">
                                {(staff as Staff).country || 'Not provided'}
                              </span>
                            </div>
                            
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                              </svg>
                              <span className="text-sm text-neutral-600 truncate">
                                {(staff as Staff).language || 'Not provided'}
                              </span>
                            </div>
                            
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span className="text-sm text-neutral-600 truncate">
                                Room: {(staff as Staff).room || 'Not provided'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <StaffMemberCard
                      key={staff.id}
                      staffMember={staff as StaffMember}
                      onSelect={handleStaffSelect}
                    />
                  )
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 