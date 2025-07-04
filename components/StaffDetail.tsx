'use client';

import React, { useState } from 'react';
import { Staff } from '../types/staff';
import { getStaffDisplayName } from '../utils/csvParser';
import ConfirmationModal from './ConfirmationModal';

interface StaffDetailProps {
  staff: Staff;
  onCheckIn: (staff: Staff) => void;
  onBack: () => void;
}

export default function StaffDetail({ staff, onCheckIn, onBack }: StaffDetailProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCheckInClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCheckIn = async () => {
    setIsChecking(true);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      onCheckIn(staff);
      setIsChecking(false);
      setShowConfirmation(false);
    }, 500);
  };

  const handleCancelCheckIn = () => {
    setShowConfirmation(false);
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
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Name Section */}
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-600">
              {getStaffDisplayName(staff).charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            {getStaffDisplayName(staff)}
          </h2>
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

        {/* Check-in Button */}
        <div className="pt-6 pb-8">
          <button
            onClick={handleCheckInClick}
            disabled={isChecking}
            className="btn-primary w-full text-lg py-4 disabled:opacity-50"
          >
            ✓ Check In
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        staff={staff}
        onConfirm={handleConfirmCheckIn}
        onCancel={handleCancelCheckIn}
        isLoading={isChecking}
      />
    </div>
  );
} 