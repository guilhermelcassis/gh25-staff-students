'use client';

import React from 'react';
import { Staff } from '../types/staff';
import { getStaffDisplayName, getStaffLocation } from '../utils/csvParser';

interface StaffCardProps {
  staff: Staff;
  onSelect: (staff: Staff) => void;
}

export default function StaffCard({ staff, onSelect }: StaffCardProps) {
  const handleClick = () => {
    onSelect(staff);
  };

  return (
    <div 
      onClick={handleClick}
      className="card hover:shadow-md transition-shadow duration-200 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 truncate">
            {getStaffDisplayName(staff)}
          </h3>
          
          <div className="mt-1 space-y-1">
            <p className="text-sm text-neutral-600">
              {getStaffLocation(staff)}
            </p>
            
            {staff.email && (
              <p className="text-sm text-neutral-500 truncate">
                {staff.email}
              </p>
            )}
            
            {staff.cellphone && (
              <p className="text-sm text-neutral-500">
                {staff.cellphone}
              </p>
            )}
          </div>
        </div>
        
        <div className="ml-4 flex-shrink-0">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 