import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import {
  CalendarIcon,
  SearchIcon,
  FilterIcon,
  EditIcon,
  Trash2Icon } from
'lucide-react';
export function ManageAppointments() {
  const {
    appointments,
    pets,
    users,
    services,
    veterinarians,
    cancelAppointment,
    updateAppointment
  } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filteredAppointments = appointments.
  filter((appointment) => {
    const pet = pets.find((p) => p.id === appointment.petId);
    const owner = users.find((u) => u.id === appointment.ownerId);
    const matchesSearch =
    pet?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
    statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).
  sort(
    (a, b) =>
    new Date(`${b.date}T${b.time}`).getTime() -
    new Date(`${a.date}T${a.time}`).getTime()
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
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Appointments
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage all clinic appointments.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by pet or owner name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            
          </div>
          <div className="flex items-center space-x-2">
            <FilterIcon className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent">
              
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="checked-in">Checked In</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Patient & Owner</th>
                <th className="px-6 py-4 font-medium">Service & Vet</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => {
                const pet = pets.find((p) => p.id === appointment.petId);
                const owner = users.find((u) => u.id === appointment.ownerId);
                const service = services.find(
                  (s) => s.id === appointment.serviceId
                );
                const vet = veterinarians.find(
                  (v) => v.id === appointment.veterinarianId
                );
                return (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {pet?.name}
                      </div>
                      <div className="text-sm text-gray-500">{owner?.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {service?.name}
                      </div>
                      <div className="text-sm text-gray-500">{vet?.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : appointment.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : appointment.status === 'checked-in' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                        
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {appointment.status === 'upcoming' &&
                      <button
                        onClick={() => {
                          if (window.confirm('Cancel this appointment?')) {
                            cancelAppointment(appointment.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900 ml-4">
                        
                          Cancel
                        </button>
                      }
                    </td>
                  </tr>);

              })}
              {filteredAppointments.length === 0 &&
              <tr>
                  <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500">
                  
                    No appointments found matching your criteria.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>);

}