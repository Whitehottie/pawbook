import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import { Edit2Icon, CheckIcon, XIcon, PlusIcon, Trash2Icon } from 'lucide-react';
export function ManageServices() {
  const { services, updateService, addService, deleteService } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    duration: 0,
    price: 0
  });
  const [newServiceForm, setNewServiceForm] = useState({
    name: '',
    duration: 30,
    price: 2900,
    active: true
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      duration: service.duration,
      price: service.price
    });
  };
  const handleSave = (id: string) => {
    updateService(id, editForm);
    setEditingId(null);
  };
  const toggleActive = (id: string, currentStatus: boolean) => {
    updateService(id, {
      active: !currentStatus
    });
  };
  const handleAddService = () => {
    if (newServiceForm.name.trim()) {
      addService(newServiceForm);
      setNewServiceForm({
        name: '',
        duration: 30,
        price: 50,
        active: true
      });
      setShowAddForm(false);
    }
  };
  const handleDeleteService = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      deleteService(id);
    }
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
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
          <p className="text-gray-600 mt-2">
            Configure clinic offerings, durations, and pricing.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Service
        </button>
      </div>

      {showAddForm && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Service Name"
              value={newServiceForm.name}
              onChange={(e) => setNewServiceForm({ ...newServiceForm, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Duration (mins)"
              value={newServiceForm.duration}
              onChange={(e) => setNewServiceForm({ ...newServiceForm, duration: parseInt(e.target.value) || 0 })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Price (₱)"
              value={newServiceForm.price}
              onChange={(e) => setNewServiceForm({ ...newServiceForm, price: parseInt(e.target.value) || 0 })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddService}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewServiceForm({ name: '', duration: 30, price: 2900, active: true });
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-medium">Service Name</th>
              <th className="px-6 py-4 font-medium">Duration (mins)</th>
              <th className="px-6 py-4 font-medium">Price (₱)</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) =>
            <tr
              key={service.id}
              className={
              service.active ? 'hover:bg-gray-50' : 'bg-gray-50 opacity-75'
              }>
              
                {editingId === service.id ?
              <>
                    <td className="px-6 py-4">
                      <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      name: e.target.value
                    })
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded" />
                  
                    </td>
                    <td className="px-6 py-4">
                      <input
                    type="number"
                    value={editForm.duration}
                    onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      duration: parseInt(e.target.value)
                    })
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded" />
                  
                    </td>
                    <td className="px-6 py-4">
                      <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      price: parseInt(e.target.value)
                    })
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded" />
                  
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Editing
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                    onClick={() => handleSave(service.id)}
                    className="text-green-600 hover:text-green-800 mr-3">
                    
                        <CheckIcon className="h-5 w-5 inline" />
                      </button>
                      <button
                    onClick={() => setEditingId(null)}
                    className="text-red-600 hover:text-red-800">
                    
                        <XIcon className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </> :

              <>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {service.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {service.duration} mins
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      ₱{service.price}
                    </td>
                    <td className="px-6 py-4">
                      <button
                    onClick={() => toggleActive(service.id, service.active)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${service.active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                    
                        {service.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                    onClick={() => handleEdit(service)}
                    className="text-amber-600 hover:text-amber-800 mr-3">
                    
                        <Edit2Icon className="h-4 w-4 inline" /> Edit
                      </button>
                      <button
                    onClick={() => handleDeleteService(service.id)}
                    className="text-red-600 hover:text-red-800">
                    
                        <Trash2Icon className="h-4 w-4 inline" /> Delete
                      </button>
                    </td>
                  </>
              }
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>);

}