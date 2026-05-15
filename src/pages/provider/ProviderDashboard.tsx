import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  XIcon,
  UserIcon } from 'lucide-react';

export function ProviderDashboard() {
  const {
    currentUser,
    appointments,
    pets,
    services,
    veterinarians,
    users,
    updateAppointment,
    cancelAppointment
  } = useApp();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    // Adjust for timezone offset to get local date
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  });
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'all'>('day');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Find veterinarian profile for current provider
  const currentVet = veterinarians.find((vet) => vet.name === currentUser?.name);
  const vetId = currentVet?.id || '1';

  // Filter appointments for this specific provider
  const providerAppointments = appointments.filter((a) => a.veterinarianId === vetId);

  // Filter by selected date
  const dayAppointments = providerAppointments
    .filter((a) => a.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Get upcoming and completed appointments
  const upcomingAppointments = providerAppointments.filter((a) => a.status === 'upcoming');
  const completedAppointments = providerAppointments.filter((a) => a.status === 'completed');
  const cancelledAppointments = providerAppointments.filter((a) => a.status === 'cancelled');

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

  const handleCheckIn = (id: string) => {
    updateAppointment(id, {
      status: 'checked-in'
    });
    // Show success feedback
    const appointment = appointments.find(a => a.id === id);
    const pet = pets.find(p => p.id === appointment?.petId);
    alert(`${pet?.name} has been checked in successfully!`);
  };

  const handleCheckOut = (id: string) => {
    updateAppointment(id, {
      status: 'completed'
    });
    // Show success feedback
    const appointment = appointments.find(a => a.id === id);
    const pet = pets.find(p => p.id === appointment?.petId);
    alert(`${pet?.name}'s appointment has been completed!`);
  };

  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) {
      cancelAppointment(id);
    }
  };

  const handleReschedule = (id: string) => {
    const appointment = appointments.find(a => a.id === id);
    const currentDate = appointment?.date || new Date().toISOString().split('T')[0];
    const currentTime = formatTime12Hour(appointment?.time || '09:00');
    
    const newDate = window.prompt('Enter new date (YYYY-MM-DD):', currentDate);
    if (newDate) {
      const newTime = window.prompt('Enter new time (12-hour format, e.g., 09:00 AM):', currentTime);
      if (newTime) {
        updateAppointment(id, {
          date: newDate,
          time: newTime,
          status: 'upcoming'
        });
      }
    }
  };

  const handleConfirm = (id: string) => {
    updateAppointment(id, {
      status: 'upcoming'
    });
    // Show success feedback
    const appointment = appointments.find(a => a.id === id);
    const pet = pets.find(p => p.id === appointment?.petId);
    alert(`Appointment for ${pet?.name} has been confirmed!`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
            Scheduled
          </span>
        );

      case 'checked-in':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            Checked In
          </span>
        );

      case 'completed':
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            Completed
          </span>
        );

      case 'cancelled':
        return (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
            Cancelled
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {currentUser?.name}. Manage your appointments and schedule.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
            <CalendarIcon className="h-5 w-5 text-blue-500 ml-2" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-none focus:ring-0 text-gray-700 font-medium bg-transparent"
            />
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setViewMode('day')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'day' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <CalendarDaysIcon className="h-4 w-4 mr-2" />
            Day View
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'week' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <CalendarDaysIcon className="h-4 w-4 mr-2" />
            Week View
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ClockIcon className="h-4 w-4 mr-2" />
            All Appointments
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Upcoming</h3>
                  <span className="text-2xl font-bold text-blue-600">{upcomingAppointments.length}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                  <span className="text-2xl font-bold text-green-600">{completedAppointments.length}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Cancelled</h3>
                  <span className="text-2xl font-bold text-red-600">{cancelledAppointments.length}</span>
                </div>
              </div>
            </div>

            {/* Appointments List */}
            {viewMode === 'day' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Appointments for {new Date(selectedDate).toLocaleDateString()}
                </h2>
                {dayAppointments.length > 0 ? (
                  dayAppointments.map((appointment) => {
                    const pet = pets.find((p) => p.id === appointment.petId);
                    const owner = users.find((u) => u.id === appointment.ownerId);
                    const service = services.find((s) => s.id === appointment.serviceId);

                    return (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-xl shadow-sm border-l-4 border-blue-500 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="bg-blue-50 text-blue-700 font-bold text-lg px-4 py-2 rounded-lg border border-blue-100">
                                {formatTime12Hour(appointment.time)}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                  {pet?.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {pet?.species} • {pet?.breed}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                              {getStatusBadge(appointment.status)}
                              <Link
                                to={`/provider/appointment/${appointment.id}`}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View Details →
                              </Link>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                              Owner: {owner?.name}
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                              Service: {service?.name} ({service?.duration}m)
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2 justify-end">
                            {appointment.status === 'upcoming' && (
                              <>
                                <button
                                  onClick={() => handleConfirm(appointment.id)}
                                  className="bg-green-50 text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-100 transition flex items-center"
                                >
                                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                                  Confirm
                                </button>
                                <button
                                  onClick={() => handleCheckIn(appointment.id)}
                                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition flex items-center"
                                >
                                  <CalendarIcon className="h-4 w-4 mr-2" />
                                  Check-In
                                </button>
                                <button
                                  onClick={() => handleReschedule(appointment.id)}
                                  className="bg-amber-50 text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-amber-100 transition flex items-center"
                                >
                                  <CalendarDaysIcon className="h-4 w-4 mr-2" />
                                  Reschedule
                                </button>
                                <button
                                  onClick={() => handleCancel(appointment.id)}
                                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition flex items-center"
                                >
                                  <XIcon className="h-4 w-4 mr-2" />
                                  Cancel
                                </button>
                              </>
                            )}

                            {appointment.status === 'checked-in' && (
                              <button
                                onClick={() => handleCheckOut(appointment.id)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center"
                              >
                                <CheckCircleIcon className="h-4 w-4 mr-2" />
                                Complete & Check-Out
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No appointments
                    </h3>
                    <p className="text-gray-500">
                      You have no scheduled appointments for this date.
                    </p>
                  </div>
                )}
              </div>
            )}

            {viewMode === 'week' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Week Overview</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="space-y-3">
                    {upcomingAppointments.slice(0, 7).map((appointment) => {
                      const pet = pets.find((p) => p.id === appointment.petId);
                      return (
                        <div key={appointment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {pet?.name} - {new Date(appointment.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatTime12Hour(appointment.time)} • {services.find((s) => s.id === appointment.serviceId)?.name}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(appointment.status)}
                            <div className="flex gap-1">
                              {appointment.status === 'upcoming' && (
                                <>
                                  <button
                                    onClick={() => handleConfirm(appointment.id)}
                                    className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs font-medium hover:bg-green-100 transition"
                                    title="Confirm"
                                  >
                                    ✓
                                  </button>
                                  <button
                                    onClick={() => handleCheckIn(appointment.id)}
                                    className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium hover:bg-blue-100 transition"
                                    title="Check-In"
                                  >
                                    CI
                                  </button>
                                  <button
                                    onClick={() => handleReschedule(appointment.id)}
                                    className="bg-amber-50 text-amber-600 px-2 py-1 rounded text-xs font-medium hover:bg-amber-100 transition"
                                    title="Reschedule"
                                  >
                                    ↻
                                  </button>
                                  <button
                                    onClick={() => handleCancel(appointment.id)}
                                    className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium hover:bg-red-100 transition"
                                    title="Cancel"
                                  >
                                    ✕
                                  </button>
                                </>
                              )}
                              {appointment.status === 'checked-in' && (
                                <button
                                  onClick={() => handleCheckOut(appointment.id)}
                                  className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-green-600 transition"
                                  title="Complete & Check-Out"
                                >
                                  ✓
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'all' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">All Appointments</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {providerAppointments.map((appointment) => {
                      const pet = pets.find((p) => p.id === appointment.petId);
                      const owner = users.find((u) => u.id === appointment.ownerId);
                      const service = services.find((s) => s.id === appointment.serviceId);

                      return (
                        <div key={appointment.id} className="p-6 hover:bg-gray-50 transition">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900">
                                    {pet?.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {pet?.species} • {pet?.breed}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                {new Date(appointment.date).toLocaleDateString()}
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                {formatTime12Hour(appointment.time)}
                              </p>
                              {getStatusBadge(appointment.status)}
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2 justify-end">
                            {appointment.status === 'upcoming' && (
                              <>
                                <button
                                  onClick={() => handleConfirm(appointment.id)}
                                  className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-100 transition flex items-center"
                                >
                                  <CheckCircleIcon className="h-3 w-3 mr-1" />
                                  Confirm
                                </button>
                                <button
                                  onClick={() => handleCheckIn(appointment.id)}
                                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-100 transition flex items-center"
                                >
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  Check-In
                                </button>
                                <button
                                  onClick={() => handleReschedule(appointment.id)}
                                  className="bg-amber-50 text-amber-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-amber-100 transition flex items-center"
                                >
                                  <CalendarDaysIcon className="h-3 w-3 mr-1" />
                                  Reschedule
                                </button>
                                <button
                                  onClick={() => handleCancel(appointment.id)}
                                  className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center"
                                >
                                  <XIcon className="h-3 w-3 mr-1" />
                                  Cancel
                                </button>
                              </>
                            )}
                            {appointment.status === 'checked-in' && (
                              <button
                                onClick={() => handleCheckOut(appointment.id)}
                                className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-600 transition flex items-center"
                              >
                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                Complete
                              </button>
                            )}
                            <Link
                              to={`/provider/appointment/${appointment.id}`}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Details →
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Real-time Clock */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-lg font-semibold mb-2">
                Current Time
              </h2>
              <div className="text-3xl font-bold mb-1">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-indigo-100">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* Daily Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Daily Summary - {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
                {(() => {
                const today = new Date();
                const offset = today.getTimezoneOffset();
                const localToday = new Date(today.getTime() - (offset * 60 * 1000));
                return selectedDate === localToday.toISOString().split('T')[0];
              })() && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Today
                  </span>
                )}
              </h2>
              <div className="space-y-4">
                {/* Debug Info - Remove in production */}
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  Debug: Selected Date: {selectedDate} | 
                  Today: {(() => {
                    const today = new Date();
                    const offset = today.getTimezoneOffset();
                    const localToday = new Date(today.getTime() - (offset * 60 * 1000));
                    return localToday.toISOString().split('T')[0];
                  })()} | 
                  Provider Appointments: {providerAppointments.length} | 
                  Day Appointments: {dayAppointments.length}
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Total Appointments</span>
                  <span className="font-bold text-gray-900">
                    {dayAppointments.length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-bold text-green-600">
                    {dayAppointments.filter((a) => a.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Checked In</span>
                  <span className="font-bold text-blue-600">
                    {dayAppointments.filter((a) => a.status === 'checked-in').length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Cancelled</span>
                  <span className="font-bold text-red-600">
                    {dayAppointments.filter((a) => a.status === 'cancelled').length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Revenue (₱)</span>
                  <span className="font-bold text-green-600">
                    {dayAppointments
                      .filter((a) => a.status === 'completed')
                      .reduce((total, appointment) => {
                        const service = services.find((s) => s.id === appointment.serviceId);
                        return total + (service?.price || 0);
                      }, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Remaining</span>
                  <span className="font-bold text-gray-900">
                    {dayAppointments.filter((a) => a.status === 'upcoming').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Appointment */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-lg font-semibold mb-2">Next Appointment</h2>
              {(() => {
                const nextAppointment = dayAppointments
                  .filter(a => a.status === 'upcoming')
                  .sort((a, b) => a.time.localeCompare(b.time))[0];
                
                if (nextAppointment) {
                  const pet = pets.find(p => p.id === nextAppointment.petId);
                  const service = services.find(s => s.id === nextAppointment.serviceId);
                  return (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2 text-amber-200" />
                        <span className="font-medium">
                          {formatTime12Hour(nextAppointment.time)}
                        </span>
                      </div>
                      <div className="text-sm text-amber-100">
                        {pet?.name} - {service?.name}
                      </div>
                      <div className="text-xs text-amber-200">
                        {nextAppointment.date}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="text-amber-100">
                      No upcoming appointments today
                    </div>
                  );
                }
              })()}
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
              <ul className="space-y-3 text-sm text-blue-50">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-blue-200" />
                  <span>
                    Confirm upcoming appointments to notify clients
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-blue-200" />
                  <span>
                    Reschedule appointments with client approval
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-blue-200" />
                  <span>
                    Manage your daily schedule efficiently
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 text-blue-200" />
                  <span>
                    <Link
                      to="/provider/schedule"
                      className="text-blue-100 hover:text-blue-200 underline"
                    >
                      Manage your schedule
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
