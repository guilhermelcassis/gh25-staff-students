'use client';

import React from 'react';

export type CheckInMode = 'students' | 'staff';

interface ModeToggleProps {
  mode: CheckInMode;
  onModeChange: (mode: CheckInMode) => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <span className="text-sm font-medium text-gray-700">Check-in Mode:</span>
      <div className="relative inline-flex h-6 w-20 items-center rounded-full bg-gray-200 transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
        <input
          type="checkbox"
          className="sr-only"
          checked={mode === 'staff'}
          onChange={(e) => onModeChange(e.target.checked ? 'staff' : 'students')}
        />
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            mode === 'staff' ? 'translate-x-14' : 'translate-x-1'
          } shadow-lg ring-0`}
        />
      </div>
      <div className="flex items-center space-x-4">
        <span
          className={`text-sm font-medium cursor-pointer ${
            mode === 'students' ? 'text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onModeChange('students')}
        >
          👨‍🎓 Students
        </span>
        <span
          className={`text-sm font-medium cursor-pointer ${
            mode === 'staff' ? 'text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onModeChange('staff')}
        >
          👥 Staff
        </span>
      </div>
    </div>
  );
} 