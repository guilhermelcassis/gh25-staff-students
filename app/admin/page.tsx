'use client';

import React, { useState, useEffect } from 'react';
import { Staff, StaffMember } from '../../types/staff';
import { studentService } from '../../data/studentData';
import { staffMemberService } from '../../data/staffMemberData';
import SearchBar from '../../components/SearchBar';
import EditStaffModal from '../../components/EditStaffModal';
import EditStaffMemberModal from '../../components/EditStaffMemberModal';

type DataType = 'students' | 'staff';

export default function AdminPage() {
  const [dataType, setDataType] = useState<DataType>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Students data
  const [students, setStudents] = useState<Staff[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Staff | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  
  // Staff data
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  // Load data on mount
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
      
      setStudents(studentsData);
      setStaffMembers(staffData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter staff based on search
  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentEdit = (student: Staff) => {
    setSelectedStudent(student);
    setIsStudentModalOpen(true);
  };

  const handleStaffEdit = (staff: StaffMember) => {
    setSelectedStaffMember(staff);
    setIsStaffModalOpen(true);
  };

  const handleStudentUpdate = async (updates: Partial<Staff>) => {
    if (selectedStudent) {
      try {
        const updatedStudent = await studentService.updateStudent(selectedStudent.id, updates);
        if (updatedStudent) {
          setStudents(prev => prev.map(s => s.id === selectedStudent.id ? updatedStudent : s));
          setIsStudentModalOpen(false);
          setSelectedStudent(null);
        }
      } catch (error) {
        console.error('Error updating student:', error);
      }
    }
  };

  const handleStaffUpdate = async (updates: Partial<StaffMember>) => {
    if (selectedStaffMember) {
      try {
        const updatedStaff = await staffMemberService.updateStaffMember(selectedStaffMember.id, updates);
        if (updatedStaff) {
          setStaffMembers(prev => prev.map(s => s.id === selectedStaffMember.id ? updatedStaff : s));
          setIsStaffModalOpen(false);
          setSelectedStaffMember(null);
        }
      } catch (error) {
        console.error('Error updating staff member:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data from Supabase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage student and staff data from Supabase</p>
        </div>

        {/* Data Type Toggle */}
        <div className="mb-6">
          <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1 w-fit">
            <button
              onClick={() => setDataType('students')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                dataType === 'students'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👨‍🎓 Students ({students.length})
            </button>
            <button
              onClick={() => setDataType('staff')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                dataType === 'staff'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👥 Staff ({staffMembers.length})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={setSearchQuery} value={searchQuery} />
        </div>

        {/* Refresh Button */}
        <div className="mb-6">
          <button
            onClick={loadData}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            🔄 Refresh Data
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            {dataType === 'students' ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.country}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.room}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.checkedIn
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {student.checkedIn ? 'Checked In' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleStudentEdit(student)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Area
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{staff.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{staff.country}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{staff.area}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{staff.quarto}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          staff.checkedIn
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {staff.checkedIn ? 'Checked In' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleStaffEdit(staff)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Empty State */}
        {((dataType === 'students' && filteredStudents.length === 0) || 
          (dataType === 'staff' && filteredStaff.length === 0)) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No matching records found' : `No ${dataType} found`}
            </h3>
            <p className="text-gray-500">
              {searchQuery ? 'Try adjusting your search terms' : 'Import data using the scripts or check your Supabase connection'}
            </p>
          </div>
        )}
      </div>

      {/* Edit Modals */}
      {selectedStudent && (
        <EditStaffModal
          isOpen={isStudentModalOpen}
          onClose={() => {
            setIsStudentModalOpen(false);
            setSelectedStudent(null);
          }}
          staff={selectedStudent}
          onSave={handleStudentUpdate}
        />
      )}

      {selectedStaffMember && (
        <EditStaffMemberModal
          isOpen={isStaffModalOpen}
          onClose={() => {
            setIsStaffModalOpen(false);
            setSelectedStaffMember(null);
          }}
          staffMember={selectedStaffMember}
          onUpdate={handleStaffUpdate}
        />
      )}
    </div>
  );
} 