import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import {
  CalendarIcon,
  ClockIcon,
  PawPrintIcon,
  AlertCircleIcon } from
'lucide-react';
export function MyAppointments() {
  const {
    currentUser,
    appointments,
    pets,
    services,
    veterinarians,
    cancelAppointment
  } = useApp();
  const userAppointments = appointments.
  filter((a) => a.ownerId === currentUser?.id).
  sort(
    (a, b) =>
    new Date(`${b.date}T${b.time}`).getTime() -
    new Date(`${a.date}T${a.time}`).getTime()
  );
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            Upcoming
          </span>);

      case 'completed':
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            Completed
          </span>);

      case 'cancelled':
        return (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
            Cancelled
          </span>);

      case 'checked-in':
        return (
          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
            Checked In
          </span>);

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
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-gray-600 mt-2">
          View and manage your pet's veterinary visits.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {userAppointments.length > 0 ?
        <div className="divide-y divide-gray-200">
            {userAppointments.map((appointment) => {
            const pet = pets.find((p) => p.id === appointment.petId);
            const service = services.find(
              (s) => s.id === appointment.serviceId
            );
            const vet = veterinarians.find(
              (v) => v.id === appointment.veterinarianId
            );
            const isUpcoming = appointment.status === 'upcoming';
            return (
              <div
                key={appointment.id}
                className="p-6 hover:bg-gray-50 transition">
                
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-amber-50 rounded-lg p-3 text-center min-w-[80px] border border-amber-100">
                        <div className="text-xs text-amber-600 font-semibold uppercase">
                          {new Date(appointment.date).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short'
                          }
                        )}
                        </div>
                        <div className="text-xl font-bold text-amber-600">
                          {new Date(appointment.date).getDate()}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {service?.name}
                          </h3>
                          {getStatusBadge(appointment.status)}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <PawPrintIcon className="h-4 w-4 mr-2 text-gray-400" />
                            {pet?.name} ({pet?.species})
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                            {vet?.name}
                          </div>
                        </div>

                        {appointment.visitNotes &&
                      <div className="mt-3 bg-gray-50 p-3 rounded-md text-sm text-gray-700 border border-gray-200">
                            <strong>Visit Notes:</strong>{' '}
                            {appointment.visitNotes}
                          </div>
                      }
                      </div>
                    </div>

                    {isUpcoming &&
                  <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                        <button
                      onClick={() => {
                        if (
                        window.confirm(
                          'Are you sure you want to cancel this appointment?'
                        ))
                        {
                          cancelAppointment(appointment.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-2 rounded-md hover:bg-red-50 transition">
                      
                          Cancel Appointment
                        </button>
                      </div>
                  }
                  </div>
                </div>);

          })}
          </div> :

        <div className="text-center py-12">
            <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500">
              You haven't booked any appointments yet.
            </p>
          </div>
        }
      </div>
    </motion.div>);

}