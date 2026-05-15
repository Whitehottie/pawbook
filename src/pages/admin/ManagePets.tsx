import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import { SearchIcon, PawPrintIcon } from 'lucide-react';
export function ManagePets() {
  const { pets, users } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPets = pets.filter((pet) => {
    const owner = users.find((u) => u.id === pet.ownerId);
    return (
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner?.name.toLowerCase().includes(searchTerm.toLowerCase()));

  });
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
        <h1 className="text-3xl font-bold text-gray-900">Manage Pets</h1>
        <p className="text-gray-600 mt-2">
          View all registered pets in the system.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by pet name, breed, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-medium">Pet Details</th>
                <th className="px-6 py-4 font-medium">Owner</th>
                <th className="px-6 py-4 font-medium">Stats</th>
                <th className="px-6 py-4 font-medium">Medical Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPets.map((pet) => {
                const owner = users.find((u) => u.id === pet.ownerId);
                return (
                  <tr key={pet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                          <PawPrintIcon className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {pet.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pet.species} • {pet.breed}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{owner?.name}</div>
                      <div className="text-sm text-gray-500">
                        {owner?.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{pet.age} years old</div>
                      <div>{pet.weight} lbs</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {pet.medicalNotes ||
                        <span className="text-gray-400 italic">None</span>
                        }
                      </div>
                    </td>
                  </tr>);

              })}
              {filteredPets.length === 0 &&
              <tr>
                  <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500">
                  
                    No pets found.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>);

}