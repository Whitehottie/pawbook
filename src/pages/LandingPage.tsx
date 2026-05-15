import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import {
  PawPrintIcon,
  CalendarIcon,
  BellIcon,
  DatabaseIcon,
  ClockIcon,
  CheckCircleIcon,
  UsersIcon,
  StethoscopeIcon,
  ShieldIcon,
  SyringeIcon,
  ScissorsIcon,
  HeartPulseIcon,
  TestTubeIcon,
  SparklesIcon } from
'lucide-react';
export function LandingPage() {
  const services = [
  {
    name: 'Wellness Exam',
    icon: StethoscopeIcon,
    price: '₱2,900'
  },
  {
    name: 'Vaccination',
    icon: SyringeIcon,
    price: '₱1,030'
  },
  {
    name: 'Dental Cleaning',
    icon: SparklesIcon,
    price: '₱4,700'
  },
  {
    name: 'Spay/Neuter',
    icon: HeartPulseIcon,
    price: '₱8,500'
  },
  {
    name: 'Microchipping',
    icon: ShieldIcon,
    price: '₱2,610'
  },
  {
    name: 'Flea & Tick',
    icon: ShieldIcon,
    price: '₱1,740'
  },
  {
    name: 'Deworming',
    icon: TestTubeIcon,
    price: '₱850'
  },
  {
    name: 'Blood Work',
    icon: TestTubeIcon,
    price: '₱2,930'
  },
  {
    name: 'X-Ray / Imaging',
    icon: HeartPulseIcon,
    price: '₱1,960'
  },
  {
    name: 'Emergency Care',
    icon: HeartPulseIcon,
    price: '₱3,600'
  },
  {
    name: 'Grooming',
    icon: ScissorsIcon,
    price: '₱890'
  },
  {
    name: 'Nail Trimming',
    icon: ScissorsIcon,
    price: '₱860'
  },
  {
    name: 'Ear Cleaning',
    icon: SparklesIcon,
    price: '₱450'
  },
  {
    name: 'Allergy Testing',
    icon: TestTubeIcon,
    price: '₱510'
  },
  {
    name: 'Nutritional Counseling',
    icon: StethoscopeIcon,
    price: '₱1,320'
  }];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <PawPrintIcon className="h-20 w-20 text-amber-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Pet's Health,
              <br />
              One Click Away
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional veterinary appointment scheduling that works 24/7.
              Book online, manage your pet's health records, and never miss a
              visit.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/signup"
                className="bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition">
                
                Get Started Free
              </Link>
              <a
                href="#features"
                className="bg-white text-amber-500 border-2 border-amber-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-50 transition">
                
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Key Differentiators */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-semibold mb-2">The Answer</p>
            <h2 className="text-4xl font-bold text-gray-900">
              Key Differentiators
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircleIcon className="h-8 w-8" />
                <h3 className="text-2xl font-bold">Real-Time Availability</h3>
              </div>
              <p className="text-amber-50">
                See open appointment slots instantly, eliminating double
                bookings and scheduling conflicts
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <BellIcon className="h-8 w-8" />
                <h3 className="text-2xl font-bold">Automated Reminders</h3>
              </div>
              <p className="text-amber-50">
                SMS and email notifications reduce no-shows and keep everyone
                informed
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <DatabaseIcon className="h-8 w-8" />
                <h3 className="text-2xl font-bold">Centralized Records</h3>
              </div>
              <p className="text-amber-50">
                All pet and owner information in one secure, accessible location
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <ClockIcon className="h-8 w-8" />
                <h3 className="text-2xl font-bold">24/7 Accessibility</h3>
              </div>
              <p className="text-amber-50">
                Book appointments anytime, anywhere—no phone calls required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-semibold mb-2">Our Services</p>
            <h2 className="text-4xl font-bold text-gray-900">
              Comprehensive Veterinary Care
            </h2>
            <p className="text-gray-600 mt-4">
              15 essential services for your pet's complete health
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((service, index) =>
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition border border-gray-100">
              
                <service.icon className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {service.name}
                </h3>
                <p className="text-amber-500 font-bold">{service.price}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Three-Tier User Structure */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Three-Tier User Structure
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border-l-4 border-amber-500 shadow-lg">
              <div className="bg-amber-500 rounded-lg p-3 w-fit mb-4">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Pet Owners
              </h3>
              <p className="text-gray-600 mb-4">
                Self-service booking, profile management, appointment tracking
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Complete profile management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 border-l-4 border-blue-500 shadow-lg">
              <div className="bg-blue-500 rounded-lg p-3 w-fit mb-4">
                <StethoscopeIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Veterinarians & Staff
              </h3>
              <p className="text-gray-600 mb-4">
                Schedule viewing, patient information access, visit
                documentation
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Multi-view calendar system</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 border-l-4 border-amber-500 shadow-lg">
              <div className="bg-amber-500 rounded-lg p-3 w-fit mb-4">
                <ShieldIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Admin/Clinic Manager
              </h3>
              <p className="text-gray-600 mb-4">
                Full system control, reporting, staff management, configuration
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Role-based access control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-600 mt-4">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create your account and add your pet's information
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book</h3>
              <p className="text-gray-600">
                Choose a service, date, time, and veterinarian
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit</h3>
              <p className="text-gray-600">
                Receive reminders and attend your appointment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-amber-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Pet Care Experience?
          </h2>
          <p className="text-xl text-amber-50 mb-8">
            Join thousands of pet owners and veterinary clinics using PawBook
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-amber-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
            
            Get Started Today
          </Link>
        </div>
      </div>

      <Footer />
    </div>);

}