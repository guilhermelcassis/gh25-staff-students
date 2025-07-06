'use client';

import React from 'react';
import { StaffMember } from '../types/staff';

interface StaffMemberCardProps {
  staffMember: StaffMember;
  onSelect: (staffMember: StaffMember) => void;
}

export default function StaffMemberCard({ staffMember, onSelect }: StaffMemberCardProps) {
  const handleClick = () => {
    onSelect(staffMember);
  };

  const formatFieldValue = (value: string | undefined) => {
    return value && value.trim() ? value : 'Not provided';
  };

  return (
    <div 
      onClick={handleClick}
      className="card hover:shadow-md transition-shadow duration-200 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 truncate mb-2">
            {staffMember.name}
          </h3>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-neutral-600 truncate">
                {formatFieldValue(staffMember.country)}
              </span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm text-neutral-600 truncate">
                {formatFieldValue(staffMember.area)}
              </span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm text-neutral-600 truncate">
                Room: {formatFieldValue(staffMember.quarto)}
              </span>
            </div>
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