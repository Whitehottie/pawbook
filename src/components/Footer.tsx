import React from 'react';
import { PawPrintIcon } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <PawPrintIcon className="h-8 w-8 text-amber-500" />
              <span className="text-2xl font-bold">PawBook</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your pet's health, one click away. Professional veterinary care
              scheduling made simple.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Pet Owners</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-amber-500">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Clinics</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-amber-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-amber-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 PawBook. All rights reserved.</p>
        </div>
      </div>
    </footer>);

}