import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../data/store';
import {
  PawPrintIcon,
  LogOutIcon,
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  SettingsIcon } from
'lucide-react';
export function Navbar() {
  const { currentUser, signOut } = useApp();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  if (!currentUser) {
    return (
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <PawPrintIcon className="h-8 w-8 text-amber-500" />
              <span className="text-2xl font-bold text-gray-900">PawBook</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/signin"
                className="text-gray-700 hover:text-amber-500 font-medium">
                
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 font-medium">
                
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>);

  }
  const getDashboardLink = () => {
    switch (currentUser.role) {
      case 'client':
        return '/client/dashboard';
      case 'provider':
        return '/provider/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };
  const getNavLinks = () => {
    switch (currentUser.role) {
      case 'client':
        return [
        {
          to: '/client/dashboard',
          label: 'Dashboard',
          icon: HomeIcon
        },
        {
          to: '/client/book',
          label: 'Book Appointment',
          icon: CalendarIcon
        },
        {
          to: '/client/appointments',
          label: 'My Appointments',
          icon: CalendarIcon
        },
        {
          to: '/client/pets',
          label: 'My Pets',
          icon: PawPrintIcon
        }];

      case 'provider':
        return [
        {
          to: '/provider/dashboard',
          label: 'Schedule',
          icon: CalendarIcon
        }];

      case 'admin':
        return [
        {
          to: '/admin/dashboard',
          label: 'Dashboard',
          icon: HomeIcon
        },
        {
          to: '/admin/appointments',
          label: 'Appointments',
          icon: CalendarIcon
        },
        {
          to: '/admin/clients',
          label: 'Clients',
          icon: UsersIcon
        },
        {
          to: '/admin/services',
          label: 'Services',
          icon: SettingsIcon
        },
        {
          to: '/admin/reports',
          label: 'Reports',
          icon: SettingsIcon
        }];

      default:
        return [];
    }
  };
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={getDashboardLink()} className="flex items-center space-x-2">
            <PawPrintIcon className="h-8 w-8 text-amber-500" />
            <span className="text-2xl font-bold text-gray-900">PawBook</span>
          </Link>

          <div className="flex items-center space-x-6">
            {getNavLinks().map((link) =>
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center space-x-1 text-gray-700 hover:text-amber-500 font-medium">
              
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            )}

            <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
              <span className="text-sm text-gray-600">{currentUser.name}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-500 font-medium">
                
                <LogOutIcon className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>);

}