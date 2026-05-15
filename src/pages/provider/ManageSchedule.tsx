import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import {
  CalendarIcon,
  PlusIcon,
  Trash2Icon,
  CheckCircleIcon } from 'lucide-react';

export function ManageSchedule() {
  const { } = useApp();
  const [slots, setSlots] = useState<Array<{
    id: string;
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>>([]);

  const [newSlot, setNewSlot] = useState({
    day: '',
    startTime: '',
    endTime: '',
    isAvailable: true
  });

  // Convert time to consistent 12-hour format
  const formatTime12Hour = (time: string) => {
    if (!time) return '';
    
    // If time already contains AM/PM, return it as-is
    if (time.includes('AM') || time.includes('PM')) {
      return time;
    }
    
    // Otherwise, convert from 24-hour format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  
  const handleAddSlot = () => {
    if (newSlot.day && newSlot.startTime && newSlot.endTime) {
      setSlots([...slots, {
        ...newSlot,
        id: Date.now().toString()
      }]);
      setNewSlot({
        day: '',
        startTime: '',
        endTime: '',
        isAvailable: true
      });
    }
  };

  const handleDeleteSlot = (id: string) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const handleToggleAvailability = (id: string) => {
    setSlots(slots.map(slot => 
      slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot
    ));
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Schedule</h1>
            <p className="text-gray-600 mt-2">
              Set your availability and time slots for client bookings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Slot */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Time Slot</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day
                </label>
                <select
                  value={newSlot.day}
                  onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select Day</option>
                  {weekDays.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time (12-hour format)
                  </label>
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: HH:MM (e.g., 09:00 AM, 02:30 PM)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time (12-hour format)
                  </label>
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: HH:MM (e.g., 05:00 PM, 10:30 AM)</p>
                </div>
              </div>

              <button
                onClick={handleAddSlot}
                className="w-full bg-amber-500 text-white py-2 rounded-lg font-medium hover:bg-amber-600 transition"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Slot
              </button>
            </div>
          </div>

          {/* Current Slots */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Time Slots</h2>
            <div className="space-y-3">
              {slots.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No time slots added yet. Add your first slot to get started.</p>
                </div>
              ) : (
                slots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      slot.isAvailable ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex-1">
                      <div>
                        <p className="font-medium text-gray-900">{slot.day}</p>
                        <p className="text-sm text-gray-600">
                          {formatTime12Hour(slot.startTime)} - {formatTime12Hour(slot.endTime)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleAvailability(slot.id)}
                        className={`px-3 py-1 rounded text-sm font-medium transition ${
                          slot.isAvailable
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {slot.isAvailable ? 'Unavailable' : 'Available'}
                      </button>
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl shadow-sm p-6 text-white">
            <h2 className="text-lg font-semibold mb-2">Schedule Instructions</h2>
            <ul className="space-y-2 text-sm text-blue-50">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-blue-200" />
                <span>Set available time slots when you can see clients</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-blue-200" />
                <span>Mark slots as unavailable when you're booked or on vacation</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-blue-200" />
                <span>Time slots will be visible to clients for booking appointments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
