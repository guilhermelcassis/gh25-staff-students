'use client';

import React, { useState } from 'react';
import { Staff } from '../types/staff';
import { getStaffDisplayName } from '../utils/csvParser';

interface CheckedInDetailProps {
  staff: Staff;
  onUncheck: (staff: Staff) => void;
  onBack: () => void;
}

export default function CheckedInDetail({ staff, onUncheck, onBack }: CheckedInDetailProps) {
  const [isUnchecking, setIsUnchecking] = useState(false);
  const [showUncheckConfirmation, setShowUncheckConfirmation] = useState(false);

  const handleUncheckClick = () => {
    setShowUncheckConfirmation(true);
  };

  const handleConfirmUncheck = async () => {
    setIsUnchecking(true);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      onUncheck(staff);
      setIsUnchecking(false);
      setShowUncheckConfirmation(false);
    }, 500);
  };

  const handleCancelUncheck = () => {
    setShowUncheckConfirmation(false);
  };

  const formatFieldValue = (value: string | undefined) => {
    return value && value.trim() ? value : 'Not provided';
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 py-3 z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 p-2 -ml-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-neutral-900">Staff Details</h1>
          <div className="ml-auto">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              ✓ Checked In
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Name Section */}
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary-200">
            <span className="text-2xl font-bold text-primary-600">
              {getStaffDisplayName(staff).charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            {getStaffDisplayName(staff)}
          </h2>
          <div className="flex items-center justify-center space-x-2 text-primary-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Successfully Checked In</span>
          </div>
        </div>

        {/* Information Grid */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                <p className="text-neutral-900">{formatFieldValue(staff.email)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                <p className="text-neutral-900">{formatFieldValue(staff.cellphone)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Location Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Church</label>
                <p className="text-neutral-900">{formatFieldValue(staff.igreja)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Country</label>
                <p className="text-neutral-900">{formatFieldValue(staff.country)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Nationality</label>
                <p className="text-neutral-900">{formatFieldValue(staff.nationality)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Event Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Area</label>
                <p className="text-neutral-900">{formatFieldValue(staff.area)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Kit Cama</label>
                <p className="text-neutral-900">{formatFieldValue(staff.kitCama)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Room</label>
                <p className="text-neutral-900">{formatFieldValue(staff.quarto)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Health Form</label>
                <p className="text-neutral-900">{formatFieldValue(staff.healthyForm)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Uncheck Button */}
        <div className="pt-6 pb-8">
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-accent-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-accent-800 mb-1">Uncheck Staff Member</h4>
                <p className="text-sm text-accent-700">
                  Use this option only if this check-in was made by mistake. This action will move the staff member back to the pending list.
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleUncheckClick}
            disabled={isUnchecking}
            className="btn-danger w-full text-lg py-4 disabled:opacity-50"
          >
            ↶ Uncheck (Mistake)
          </button>
        </div>
      </div>

      {/* Uncheck Confirmation Modal */}
      {showUncheckConfirmation && (
        <UncheckConfirmationModal
          isOpen={showUncheckConfirmation}
          staff={staff}
          onConfirm={handleConfirmUncheck}
          onCancel={handleCancelUncheck}
          isLoading={isUnchecking}
        />
      )}
    </div>
  );
}

// Specialized confirmation modal for unchecking
interface UncheckConfirmationModalProps {
  isOpen: boolean;
  staff: Staff | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function UncheckConfirmationModal({ 
  isOpen, 
  staff, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}: UncheckConfirmationModalProps) {
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
            Confirm Uncheck
          </h3>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <div className="text-center">
            {/* Warning Icon */}
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            {/* Confirmation Message */}
            <p className="text-neutral-600 mb-2">
              Are you sure you want to uncheck:
            </p>
            <p className="text-xl font-semibold text-neutral-900 mb-4">
              {getStaffDisplayName(staff)}
            </p>

            <div className="bg-accent-50 border border-accent-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-accent-700">
                This will move them back to the pending check-in list. Use this only if the check-in was made by mistake.
              </p>
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
            className="flex-1 btn-danger disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Unchecking...
              </div>
            ) : (
              '↶ Confirm Uncheck'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 