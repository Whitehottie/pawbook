import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import { SearchIcon, MailIcon, PhoneIcon, PawPrintIcon } from 'lucide-react';
export function ManageClients() {
  const { users, pets } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const clients = users.filter((u) => u.role === 'client');
  const filteredClients = clients.filter(
    (client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-3xl font-bold text-gray-900">Manage Clients</h1>
        <p className="text-gray-600 mt-2">
          View and manage pet owner accounts.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-medium">Client Name</th>
                <th className="px-6 py-4 font-medium">Contact Info</th>
                <th className="px-6 py-4 font-medium">Registered Pets</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => {
                const clientPets = pets.filter((p) => p.ownerId === client.id);
                return (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {client.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {client.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <MailIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {client.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">
                          {clientPets.length}
                        </span>
                        <span className="text-sm text-gray-600">
                          {clientPets.map((p) => p.name).join(', ') ||
                          'No pets'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-amber-600 hover:text-amber-900">
                        View Details
                      </button>
                    </td>
                  </tr>);

              })}
              {filteredClients.length === 0 &&
              <tr>
                  <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500">
                  
                    No clients found.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>);

}