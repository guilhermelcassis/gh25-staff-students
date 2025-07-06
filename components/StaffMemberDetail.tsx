'use client';

import React, { useState } from 'react';
import { StaffMember } from '../types/staff';
import EditStaffMemberModal from './EditStaffMemberModal';

interface StaffMemberDetailProps {
  staffMember: StaffMember;
  onBack: () => void;
  onCheckIn: (staffMember: StaffMember) => void;
  onUncheck?: (staffMember: StaffMember) => void;
  onUpdate?: (updatedStaffMember: StaffMember) => void;
}

export default function StaffMemberDetail({ 
  staffMember, 
  onBack, 
  onCheckIn, 
  onUncheck,
  onUpdate 
}: StaffMemberDetailProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [isUnchecking, setIsUnchecking] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUncheckConfirmation, setShowUncheckConfirmation] = useState(false);
  const [currentStaffMember, setCurrentStaffMember] = useState<StaffMember>(staffMember);

  const handleCheckInClick = () => {
    setIsChecking(true);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      onCheckIn(currentStaffMember);
      setIsChecking(false);
    }, 500);
  };

  const handleUncheckClick = () => {
    setShowUncheckConfirmation(true);
  };

  const handleConfirmUncheck = async () => {
    setIsUnchecking(true);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      if (onUncheck) {
        onUncheck(currentStaffMember);
      }
      setIsUnchecking(false);
      setShowUncheckConfirmation(false);
    }, 500);
  };

  const handleCancelUncheck = () => {
    setShowUncheckConfirmation(false);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditSave = (updates: Partial<StaffMember>) => {
    const updatedStaffMember = { ...currentStaffMember, ...updates };
    setCurrentStaffMember(updatedStaffMember);
    setShowEditModal(false);
    if (onUpdate) {
      onUpdate(updatedStaffMember);
    }
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
  };

  const formatFieldValue = (value: string | undefined) => {
    return value && value.trim() ? value : 'Not provided';
  };

  const getBooleanBadge = (value: string) => {
    if (value === 'TRUE') return 'bg-green-100 text-green-800';
    if (value === 'FALSE') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 py-3 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-3 p-2 -ml-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-neutral-900">Staff Member Details</h1>
          </div>
          <button
            onClick={handleEditClick}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            title="Edit Staff Member Information"
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center">
            <div className={`w-24 h-24 bg-gradient-to-br ${currentStaffMember.checkedIn ? 'from-green-400 to-green-600' : 'from-primary-400 to-primary-600'} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <span className="text-3xl font-bold text-white">
                {currentStaffMember.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              {currentStaffMember.name}
            </h2>
            <div className="flex justify-center mb-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {formatFieldValue(currentStaffMember.area)}
              </span>
            </div>
            {currentStaffMember.checkedIn && (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Successfully Checked In</span>
                {currentStaffMember.checkedInAt && (
                  <span className="text-xs text-gray-500">
                    • {new Date(currentStaffMember.checkedInAt).toLocaleString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">Country</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{formatFieldValue(currentStaffMember.country)}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm font-medium text-gray-600">Room</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{formatFieldValue(currentStaffMember.quarto)}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900 break-all">{formatFieldValue(currentStaffMember.email)}</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-gray-900">{formatFieldValue(currentStaffMember.cellphone)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Nationality</p>
              <p className="text-gray-900">{formatFieldValue(currentStaffMember.nationality)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Country</p>
              <p className="text-gray-900">{formatFieldValue(currentStaffMember.country)}</p>
            </div>
          </div>
        </div>

        {/* Ministry Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900">Ministry Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Area</p>
              <p className="text-gray-900">{formatFieldValue(currentStaffMember.area)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Church</p>
              <p className="text-gray-900">{formatFieldValue(currentStaffMember.igreja)}</p>
            </div>
          </div>
        </div>

        {/* Accommodation Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0a2 2 0 002-2h6l2 2h6a2 2 0 012 2v1M3 7l9 6 9-6" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900">Accommodation</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Room Assignment</p>
              <p className="text-gray-900 font-medium">{formatFieldValue(currentStaffMember.quarto)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Bed Kit</p>
              <p className="text-gray-900 font-medium">{formatFieldValue(currentStaffMember.kitCama)}</p>
            </div>
          </div>
        </div>

        {/* Document Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900">Document Status</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Health Form</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBooleanBadge(currentStaffMember.healthyForm)}`}>
                {currentStaffMember.healthyForm === 'TRUE' ? '✓ Complete' : '✗ Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Check-in Button */}
        {!currentStaffMember.checkedIn && (
          <div className="pt-6 pb-8">
            <button
              onClick={handleCheckInClick}
              disabled={isChecking}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 shadow-lg hover:shadow-xl transition-shadow"
            >
              {isChecking ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Check In
                </span>
              )}
            </button>
          </div>
        )}

        {/* Uncheck Button */}
        {currentStaffMember.checkedIn && onUncheck && (
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
              className="btn-danger w-full text-lg py-4 disabled:opacity-50 shadow-lg hover:shadow-xl transition-shadow"
            >
              {isUnchecking ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Uncheck (Mistake)
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Uncheck Confirmation Modal */}
      {showUncheckConfirmation && (
        <UncheckConfirmationModal
          isOpen={showUncheckConfirmation}
          staffMember={currentStaffMember}
          onConfirm={handleConfirmUncheck}
          onCancel={handleCancelUncheck}
          isLoading={isUnchecking}
        />
      )}

      {/* Edit Modal */}
      <EditStaffMemberModal
        isOpen={showEditModal}
        staffMember={currentStaffMember}
        onClose={handleEditCancel}
        onUpdate={handleEditSave}
      />
    </div>
  );
}

// Specialized confirmation modal for unchecking staff members
interface UncheckConfirmationModalProps {
  isOpen: boolean;
  staffMember: StaffMember | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function UncheckConfirmationModal({ 
  isOpen, 
  staffMember, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}: UncheckConfirmationModalProps) {
  if (!isOpen || !staffMember) return null;

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
              {staffMember.name}
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