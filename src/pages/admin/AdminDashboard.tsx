import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import {
  CalendarIcon,
  UsersIcon,
  PawPrintIcon,
  SettingsIcon,
  TrendingUpIcon,
  ActivityIcon } from
'lucide-react';
export function AdminDashboard() {
  const { appointments, users, pets, services } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.date === today);
  const clients = users.filter((u) => u.role === 'client');
  const staff = users.filter((u) => u.role === 'provider');
  const stats = [
  {
    name: "Today's Appointments",
    value: todayAppointments.length,
    icon: CalendarIcon,
    color: 'bg-amber-500'
  },
  {
    name: 'Total Clients',
    value: clients.length,
    icon: UsersIcon,
    color: 'bg-blue-500'
  },
  {
    name: 'Total Pets',
    value: pets.length,
    icon: PawPrintIcon,
    color: 'bg-green-500'
  },
  {
    name: 'Active Services',
    value: services.filter((s) => s.active).length,
    icon: SettingsIcon,
    color: 'bg-purple-500'
  }];

  const recentActivity = appointments.
  sort(
    (a, b) =>
    new Date(`${b.date}T${b.time}`).getTime() -
    new Date(`${a.date}T${a.time}`).getTime()
  ).
  slice(0, 5);
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
        <h1 className="text-3xl font-bold text-gray-900">Clinic Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of clinic operations and system metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) =>
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
          
            <div className={`${stat.color} p-4 rounded-lg text-white mr-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <ActivityIcon className="h-5 w-5 mr-2 text-amber-500" />
                Recent Appointments
              </h2>
              <Link
                to="/admin/appointments"
                className="text-sm text-amber-600 hover:text-amber-800 font-medium">
                
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((appointment) => {
                const pet = pets.find((p) => p.id === appointment.petId);
                const owner = users.find((u) => u.id === appointment.ownerId);
                return (
                  <div
                    key={appointment.id}
                    className="p-4 hover:bg-gray-50 transition flex items-center justify-between">
                    
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-100 rounded-full p-2">
                        <PawPrintIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {pet?.name}{' '}
                          <span className="text-gray-500 font-normal text-sm">
                            ({owner?.name})
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(appointment.date).toLocaleDateString()} at{' '}
                          {appointment.time}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : appointment.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                      
                      {appointment.status}
                    </span>
                  </div>);

              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/admin/clients"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-amber-500 transition group">
              
              <div className="flex items-center justify-between mb-4">
                <div className="bg-amber-100 p-3 rounded-lg text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition">
                  <UsersIcon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Manage Clients
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                View and edit client profiles
              </p>
            </Link>

            <Link
              to="/admin/staff"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-amber-500 transition group">
              
              <div className="flex items-center justify-between mb-4">
                <div className="bg-amber-100 p-3 rounded-lg text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition">
                  <UsersIcon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Manage Staff
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                View and manage veterinary staff
              </p>
            </Link>

            <Link
              to="/admin/create-provider"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-amber-500 transition group">
              
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg text-green-600 group-hover:bg-green-500 group-hover:text-white transition">
                  <UsersIcon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Create Provider
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Add new veterinary staff member
              </p>
            </Link>

            <Link
              to="/admin/services"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-amber-500 transition group">
              
              <div className="flex items-center justify-between mb-4">
                <div className="bg-amber-100 p-3 rounded-lg text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition">
                  <SettingsIcon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Manage Services
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Configure clinic offerings
              </p>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-sm p-6 text-white">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUpIcon className="h-5 w-5 mr-2" />
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-amber-100 text-sm">Staff Members</p>
                <p className="text-2xl font-bold">{staff.length}</p>
              </div>
              <div>
                <p className="text-amber-100 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    appointments.filter((a) => a.status === 'completed').
                    length /
                    appointments.length *
                    100 || 0
                  )}
                  %
                </p>
              </div>
              <Link
                to="/admin/reports"
                className="inline-block mt-2 text-sm font-medium bg-white text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition">
                
                View Full Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>);

}