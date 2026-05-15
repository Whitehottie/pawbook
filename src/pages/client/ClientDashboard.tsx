import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import {
  CalendarIcon,
  PawPrintIcon,
  ClockIcon,
  PlusCircleIcon } from
'lucide-react';
export function ClientDashboard() {
  const { currentUser, pets, appointments, services, veterinarians } = useApp();
  const userPets = pets.filter((p) => p.ownerId === currentUser?.id);
  const userAppointments = appointments.
  filter((a) => a.ownerId === currentUser?.id).
  sort(
    (a, b) =>
    new Date(`${a.date}T${a.time}`).getTime() -
    new Date(`${b.date}T${b.time}`).getTime()
  );
  const upcomingAppointments = userAppointments.filter(
    (a) => a.status === 'upcoming'
  );
  const pastAppointments = userAppointments.filter(
    (a) => a.status === 'completed' || a.status === 'cancelled'
  );
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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {currentUser?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your pets and appointments from your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h2>
            <PlusCircleIcon className="h-6 w-6 text-amber-500" />
          </div>
          <div className="space-y-3">
            <Link
              to="/client/book"
              className="block w-full text-center bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition font-medium">
              
              Book Appointment
            </Link>
            <Link
              to="/client/pets"
              className="block w-full text-center bg-amber-50 text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-100 transition font-medium">
              
              Add New Pet
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Pets</h2>
            <PawPrintIcon className="h-6 w-6 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {userPets.length}
          </div>
          <p className="text-gray-600 mb-4">Registered pets</p>
          <Link
            to="/client/pets"
            className="text-amber-500 hover:text-amber-600 text-sm font-medium">
            
            Manage Pets &rarr;
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming Visits
            </h2>
            <CalendarIcon className="h-6 w-6 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {upcomingAppointments.length}
          </div>
          <p className="text-gray-600 mb-4">Scheduled appointments</p>
          <Link
            to="/client/appointments"
            className="text-amber-500 hover:text-amber-600 text-sm font-medium">
            
            View Schedule &rarr;
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Next Upcoming Appointment
          </h2>
          <Link
            to="/client/appointments"
            className="text-sm text-amber-500 hover:text-amber-600 font-medium">
            
            View All
          </Link>
        </div>
        <div className="p-6">
          {upcomingAppointments.length > 0 ?
          <div className="flex items-start space-x-4">
              <div className="bg-amber-100 rounded-lg p-4 text-center min-w-[100px]">
                <div className="text-sm text-amber-600 font-semibold uppercase">
                  {new Date(upcomingAppointments[0].date).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short'
                  }
                )}
                </div>
                <div className="text-2xl font-bold text-amber-600">
                  {new Date(upcomingAppointments[0].date).getDate()}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {
                services.find(
                  (s) => s.id === upcomingAppointments[0].serviceId
                )?.name
                }
                </h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <PawPrintIcon className="h-4 w-4 mr-1" />
                  For{' '}
                  {
                pets.find((p) => p.id === upcomingAppointments[0].petId)?.
                name
                }
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {upcomingAppointments[0].time} with{' '}
                  {
                veterinarians.find(
                  (v) => v.id === upcomingAppointments[0].veterinarianId
                )?.name
                }
                </p>
              </div>
            </div> :

          <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>No upcoming appointments.</p>
              <Link
              to="/client/book"
              className="text-amber-500 hover:text-amber-600 font-medium mt-2 inline-block">
              
                Book one now
              </Link>
            </div>
          }
        </div>
      </div>
    </motion.div>);

}