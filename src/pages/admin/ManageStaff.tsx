import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import { StethoscopeIcon, PlusIcon, Trash2Icon } from 'lucide-react';
export function ManageStaff() {
  const { users, veterinarians, addVeterinarian, deleteVeterinarian, deleteUser } = useApp();
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
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Staff</h1>
          <p className="text-gray-600 mt-2">
            View provider accounts and their corresponding veterinarian profiles.
          </p>
        </div>
        <a
          href="/admin/create-provider"
          className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Create New Provider
        </a>
      </div>

      
      <div className="space-y-6">
        {/* Provider Accounts with Veterinarian Profiles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Provider Accounts & Veterinarian Profiles</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {users.filter(u => u.role === 'provider').map((provider) => {
              const correspondingVet = veterinarians.find(vet => vet.name === provider.name);
              return (
                <div key={provider.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <StethoscopeIcon className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                          <p className="text-sm text-amber-600 font-medium">Provider Account</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-10">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Account Information</h4>
                          <div className="space-y-1">
                            <p className="text-sm"><span className="font-medium">Email:</span> {provider.email}</p>
                            <p className="text-sm"><span className="font-medium">Phone:</span> {provider.phone}</p>
                            <p className="text-sm"><span className="font-medium">Status:</span> <span className="text-green-600">Active</span></p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Veterinarian Profile</h4>
                          {correspondingVet ? (
                            <div className="space-y-1">
                              <p className="text-sm"><span className="font-medium">Specialty:</span> {correspondingVet.specialty}</p>
                              <p className="text-sm"><span className="font-medium">Profile Status:</span> <span className="text-green-600">Created</span></p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <p className="text-sm text-red-600">No veterinarian profile found</p>
                              <button
                                onClick={() => addVeterinarian({ name: provider.name, specialty: 'General Practice' })}
                                className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                              >
                                Create Profile
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this provider account? This will also remove their veterinarian profile if it exists.')) {
                            deleteUser(provider.id);
                            if (correspondingVet) {
                              deleteVeterinarian(correspondingVet.id);
                            }
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Delete Provider Account"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {users.filter(u => u.role === 'provider').length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <StethoscopeIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No provider accounts found. Create your first provider to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Standalone Veterinarian Profiles (if any) */}
        {veterinarians.filter(vet => !users.some(u => u.role === 'provider' && u.name === vet.name)).length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Unlinked Veterinarian Profiles</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {veterinarians.filter(vet => !users.some(u => u.role === 'provider' && u.name === vet.name)).map((vet) => (
                  <div key={vet.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{vet.name}</p>
                      <p className="text-sm text-gray-500">{vet.specialty}</p>
                      <p className="text-xs text-amber-600 mt-1">No associated provider account</p>
                    </div>
                    <button
                      onClick={() => deleteVeterinarian(vet.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}