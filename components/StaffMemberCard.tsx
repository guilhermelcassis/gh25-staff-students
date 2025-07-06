'use client';

import React from 'react';
import { StaffMember } from '../types/staff';

interface StaffMemberCardProps {
  staffMember: StaffMember;
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
  onClick: (staffMember: StaffMember) => void;
}

export default function StaffMemberCard({ staffMember, onCheckIn, onCheckOut, onClick }: StaffMemberCardProps) {
  const handleCheckInOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (staffMember.checkedIn) {
      onCheckOut(staffMember.id);
    } else {
      onCheckIn(staffMember.id);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onClick(staffMember)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{staffMember.name}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Area:</span> {staffMember.area}</p>
            <p><span className="font-medium">Country:</span> {staffMember.country}</p>
            <p><span className="font-medium">Church:</span> {staffMember.igreja}</p>
            <p><span className="font-medium">Room:</span> {staffMember.quarto}</p>
          </div>
        </div>
        <button
          onClick={handleCheckInOut}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            staffMember.checkedIn
              ? 'bg-red-100 text-red-800 hover:bg-red-200'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
        >
          {staffMember.checkedIn ? 'Check Out' : 'Check In'}
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`inline-block w-2 h-2 rounded-full ${
            staffMember.checkedIn ? 'bg-green-500' : 'bg-gray-400'
          }`}></span>
          <span className="text-sm text-gray-600">
            {staffMember.checkedIn ? 'Checked In' : 'Pending'}
          </span>
        </div>
        
        {staffMember.checkedIn && staffMember.checkedInAt && (
          <span className="text-xs text-gray-500">
            {new Date(staffMember.checkedInAt).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
} 