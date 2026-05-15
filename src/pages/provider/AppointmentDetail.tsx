import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import {
  ArrowLeftIcon,
  PawPrintIcon,
  UserIcon,
  ClockIcon,
  FileTextIcon,
  HistoryIcon } from
'lucide-react';
export function AppointmentDetail() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { appointments, pets, users, services, updateAppointment } = useApp();
  const appointment = appointments.find((a) => a.id === id);
  const [visitNotes, setVisitNotes] = useState(appointment?.visitNotes || '');
  const [isSaving, setIsSaving] = useState(false);
  if (!appointment) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Appointment not found
        </h2>
        <button
          onClick={() => navigate('/provider/dashboard')}
          className="mt-4 text-blue-600 hover:underline">
          
          Return to Dashboard
        </button>
      </div>);

  }
  const pet = pets.find((p) => p.id === appointment.petId);
  const owner = users.find((u) => u.id === appointment.ownerId);
  const service = services.find((s) => s.id === appointment.serviceId);
  const petHistory = appointments.
  filter((a) => a.petId === pet?.id && a.status === 'completed').
  sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const handleSaveNotes = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateAppointment(appointment.id, {
        visitNotes
      });
      setIsSaving(false);
    }, 500);
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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="mb-6">
        <Link
          to="/provider/dashboard"
          className="flex items-center text-gray-500 hover:text-blue-600 transition mb-4 w-fit">
          
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Schedule
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Appointment Details
          </h1>
          <div className="mt-4 md:mt-0 flex space-x-3">
            {appointment.status === 'upcoming' &&
            <button
              onClick={() =>
              updateAppointment(appointment.id, {
                status: 'checked-in'
              })
              }
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
              
                Check-In Patient
              </button>
            }
            {appointment.status === 'checked-in' &&
            <button
              onClick={() =>
              updateAppointment(appointment.id, {
                status: 'completed'
              })
              }
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition">
              
                Complete Visit
              </button>
            }
            <span
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : appointment.status === 'checked-in' ? 'bg-blue-100 text-blue-800' : appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
              
              Status:{' '}
              {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Pet & Owner Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center">
              <PawPrintIcon className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-blue-900">
                Patient Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
                    Pet Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-semibold text-gray-900">
                        {pet?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Species/Breed:</span>
                      <span className="font-semibold text-gray-900">
                        {pet?.species} - {pet?.breed}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-semibold text-gray-900">
                        {pet?.age} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-semibold text-gray-900">
                        {pet?.weight} lbs
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
                    Owner Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-semibold text-gray-900">
                        {owner?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-semibold text-gray-900">
                        {owner?.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-gray-900">
                        {owner?.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {pet?.medicalNotes &&
              <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
                    Medical Alerts / Notes
                  </h3>
                  <div className="bg-amber-50 text-amber-800 p-4 rounded-lg border border-amber-200">
                    {pet.medicalNotes}
                  </div>
                </div>
              }
            </div>
          </div>

          {/* Visit Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center justify-between">
              <div className="flex items-center">
                <FileTextIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-blue-900">
                  Visit Notes
                </h2>
              </div>
              <button
                onClick={handleSaveNotes}
                disabled={isSaving}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition disabled:opacity-50">
                
                {isSaving ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
            <div className="p-6">
              <textarea
                value={visitNotes}
                onChange={(e) => setVisitNotes(e.target.value)}
                rows={6}
                placeholder="Record observations, findings, recommendations, and follow-up instructions..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Appointment Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Visit Summary
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(appointment.date).toLocaleDateString()} at{' '}
                    {appointment.time}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FileTextIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-semibold text-gray-900">{service?.name}</p>
                </div>
              </div>
              {appointment.notes &&
              <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Client Notes</p>
                  <p className="text-sm text-gray-700 italic">
                    "{appointment.notes}"
                  </p>
                </div>
              }
            </div>
          </div>

          {/* Patient History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <HistoryIcon className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                Patient History
              </h2>
            </div>

            {petHistory.length > 0 ?
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {petHistory.map((history) =>
              <div
                key={history.id}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-blue-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-gray-50 p-3 rounded border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          {
                      services.find((s) => s.id === history.serviceId)?.
                      name
                      }
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(history.date).toLocaleDateString()}
                        </span>
                      </div>
                      {history.visitNotes &&
                  <p className="text-xs text-gray-600 line-clamp-2">
                          {history.visitNotes}
                        </p>
                  }
                    </div>
                  </div>
              )}
              </div> :

            <p className="text-sm text-gray-500 text-center py-4">
                No previous visit history.
              </p>
            }
          </div>
        </div>
      </div>
    </motion.div>);

}