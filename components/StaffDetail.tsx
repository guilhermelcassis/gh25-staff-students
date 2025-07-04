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

  const getStatusBadgeColor = (status: string) => {
    if (status.includes('FULLY PAID')) return 'bg-green-100 text-green-800';
    if (status.includes('ONGOING')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
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
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">
                {getStaffDisplayName(staff).charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              {getStaffDisplayName(staff)}
            </h2>
            <div className="flex justify-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(staff.status)}`}>
                {formatFieldValue(staff.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">Age</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{formatFieldValue(staff.age)}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">Country</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{formatFieldValue(staff.country)}</p>
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
                <p className="text-gray-900 break-all">{formatFieldValue(staff.email)}</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-gray-900">{formatFieldValue(staff.phone)}</p>
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
              <p className="text-sm font-medium text-gray-600">Gender</p>
              <p className="text-gray-900">{formatFieldValue(staff.gender)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Nationality</p>
              <p className="text-gray-900">{formatFieldValue(staff.nationality)}</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <p className="text-sm font-medium text-gray-600">Languages</p>
              <p className="text-gray-900">{formatFieldValue(staff.language)}</p>
            </div>
          </div>
        </div>

        {/* Church Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900">Church Information</h3>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">Church</p>
            <p className="text-gray-900">{formatFieldValue(staff.church)}</p>
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
              <p className="text-gray-900 font-medium">{formatFieldValue(staff.room)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Bed Kit</p>
              <div className="flex items-center">
                <span className="text-gray-900 font-medium mr-2">Quantity: {staff.bedKit}</span>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  staff.bedKit === '0' ? 'bg-red-100 text-red-800' : 
                  staff.bedKit === '1' ? 'bg-green-100 text-green-800' : 
                  staff.bedKit === '2' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {staff.bedKit === '0' ? 'None' : 
                   staff.bedKit === '1' ? '1 Kit' : 
                   staff.bedKit === '2' ? '2 Kits' : 
                   staff.bedKit + ' Kit(s)'}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Bus Transportation</p>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getBooleanBadge(staff.bus)}`}>
                {staff.bus === 'TRUE' ? 'Required' : 'Not Required'}
              </span>
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
              <span className="text-sm font-medium text-gray-600">Documents Submitted</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBooleanBadge(staff.documents)}`}>
                {staff.documents === 'TRUE' ? '✓ Complete' : '✗ Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Health Form</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBooleanBadge(staff.healthyForm)}`}>
                {staff.healthyForm === 'TRUE' ? '✓ Complete' : '✗ Pending'}
              </span>
            </div>
            {staff.underageDoc && staff.underageDoc !== 'N/A' && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Underage Documentation</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBooleanBadge(staff.underageDoc)}`}>
                  {staff.underageDoc === 'TRUE' ? '✓ Complete' : '✗ Pending'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Observations */}
        {staff.obs && staff.obs !== 'N/A' && staff.obs.trim() !== '' && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <svg className="w-6 h-6 text-amber-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-lg font-semibold text-amber-800">Important Notes</h3>
            </div>
            <p className="text-amber-700 bg-white p-3 rounded-lg border border-amber-200">
              {staff.obs}
            </p>
          </div>
        )}

        {/* Check-in Button */}
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