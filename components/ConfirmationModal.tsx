'use client';

import React from 'react';
import { Staff } from '../types/staff';
import { getStaffDisplayName } from '../utils/csvParser';

interface ConfirmationModalProps {
  isOpen: boolean;
  staff: Staff | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmationModal({ 
  isOpen, 
  staff, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}: ConfirmationModalProps) {
  if (!isOpen || !staff) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">
            Confirm Check-In
          </h3>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <div className="text-center">
            {/* Staff Avatar */}
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">
                {getStaffDisplayName(staff).charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Confirmation Message */}
            <p className="text-neutral-600 mb-2">
              Are you sure you want to check in:
            </p>
            <p className="text-xl font-semibold text-neutral-900 mb-4">
              {getStaffDisplayName(staff)}
            </p>

            {/* Additional Info */}
            <div className="text-sm text-neutral-500 space-y-1">
              {staff.email && (
                <p>{staff.email}</p>
              )}
              {staff.country && staff.church && (
                <p>{staff.country} • {staff.church}</p>
              )}
              {staff.language && (
                <p>Language: {staff.language}</p>
              )}
              {staff.room && (
                <p>Room: {staff.room}</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-neutral-200 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking In...
              </div>
            ) : (
              '✓ Confirm Check-In'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 