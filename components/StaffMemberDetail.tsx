'use client';

import React, { useState } from 'react';
import { StaffMember } from '../types/staff';
import EditStaffMemberModal from './EditStaffMemberModal';

interface StaffMemberDetailProps {
  staffMember: StaffMember;
  onBack: () => void;
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StaffMember>) => void;
}

export default function StaffMemberDetail({ 
  staffMember, 
  onBack, 
  onCheckIn, 
  onCheckOut, 
  onUpdate 
}: StaffMemberDetailProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStaffMember, setCurrentStaffMember] = useState(staffMember);

  const handleCheckInOut = () => {
    if (currentStaffMember.checkedIn) {
      onCheckOut(currentStaffMember.id);
      setCurrentStaffMember({ ...currentStaffMember, checkedIn: false, checkedInAt: undefined });
    } else {
      onCheckIn(currentStaffMember.id);
      setCurrentStaffMember({ ...currentStaffMember, checkedIn: true, checkedInAt: new Date() });
    }
  };

  const handleUpdate = (updates: Partial<StaffMember>) => {
    const updatedStaffMember = { ...currentStaffMember, ...updates };
    setCurrentStaffMember(updatedStaffMember);
    onUpdate(currentStaffMember.id, updates);
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Staff List
        </button>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          
          <button
            onClick={handleCheckInOut}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStaffMember.checkedIn
                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            {currentStaffMember.checkedIn ? 'Check Out' : 'Check In'}
          </button>
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentStaffMember.name}</h1>
        <div className="flex items-center justify-center space-x-2">
          <span className={`inline-block w-3 h-3 rounded-full ${
            currentStaffMember.checkedIn ? 'bg-green-500' : 'bg-gray-400'
          }`}></span>
          <span className={`font-medium ${
            currentStaffMember.checkedIn ? 'text-green-600' : 'text-gray-600'
          }`}>
            {currentStaffMember.checkedIn ? 'Checked In' : 'Pending Check-in'}
          </span>
        </div>
        
        {currentStaffMember.checkedIn && currentStaffMember.checkedInAt && (
          <p className="text-sm text-gray-500 mt-2">
            Checked in on {new Date(currentStaffMember.checkedInAt).toLocaleString()}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {currentStaffMember.email}</p>
              <p><span className="font-medium">Phone:</span> {currentStaffMember.cellphone}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Country:</span> {currentStaffMember.country}</p>
              <p><span className="font-medium">Nationality:</span> {currentStaffMember.nationality}</p>
              <p><span className="font-medium">Room:</span> {currentStaffMember.quarto}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Ministry Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Area:</span> {currentStaffMember.area}</p>
              <p><span className="font-medium">Church:</span> {currentStaffMember.igreja}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Logistics</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Bed Kit:</span> {currentStaffMember.kitCama}</p>
              <p><span className="font-medium">Health Form:</span> {currentStaffMember.healthyForm}</p>
            </div>
          </div>
        </div>
      </div>

      <EditStaffMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        staffMember={currentStaffMember}
        onUpdate={handleUpdate}
      />
    </div>
  );
} 