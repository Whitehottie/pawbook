import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import { PawPrintIcon, PlusIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
export function MyPets() {
  const { currentUser, pets, addPet, updatePet, deletePet } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const userPets = pets.filter((p) => p.ownerId === currentUser?.id);
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    weight: '',
    medicalNotes: ''
  });
  const handleEdit = (pet: any) => {
    setFormData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age.toString(),
      weight: pet.weight.toString(),
      medicalNotes: pet.medicalNotes
    });
    setEditingId(pet.id);
    setIsAdding(true);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const petData = {
      ownerId: currentUser.id,
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      age: parseInt(formData.age),
      weight: parseInt(formData.weight),
      medicalNotes: formData.medicalNotes
    };
    if (editingId) {
      updatePet(editingId, petData);
    } else {
      addPet(petData);
    }
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: '',
      species: 'Dog',
      breed: '',
      age: '',
      weight: '',
      medicalNotes: ''
    });
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
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Pets</h1>
          <p className="text-gray-600 mt-2">
            Manage your pet profiles and medical information.
          </p>
        </div>
        {!isAdding &&
        <button
          onClick={() => setIsAdding(true)}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition flex items-center">
          
            <PlusIcon className="h-5 w-5 mr-1" />
            Add Pet
          </button>
        }
      </div>

      {isAdding &&
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Pet Profile' : 'Add New Pet'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Name
                </label>
                <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Species
                </label>
                <select
                value={formData.species}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  species: e.target.value
                })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Breed
                </label>
                <input
                type="text"
                required
                value={formData.breed}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  breed: e.target.value
                })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age (years)
                  </label>
                  <input
                  type="number"
                  required
                  min="0"
                  value={formData.age}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: e.target.value
                  })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (lbs)
                  </label>
                  <input
                  type="number"
                  required
                  min="0"
                  value={formData.weight}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: e.target.value
                  })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical Notes / Allergies
              </label>
              <textarea
              rows={3}
              value={formData.medicalNotes}
              onChange={(e) =>
              setFormData({
                ...formData,
                medicalNotes: e.target.value
              })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
            </textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                  name: '',
                  species: 'Dog',
                  breed: '',
                  age: '',
                  weight: '',
                  medicalNotes: ''
                });
              }}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">
              
                Cancel
              </button>
              <button
              type="submit"
              className="bg-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-600 transition">
              
                {editingId ? 'Save Changes' : 'Add Pet'}
              </button>
            </div>
          </form>
        </div>
      }

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userPets.map((pet) =>
        <div
          key={pet.id}
          className="bg-white rounded-xl shadow-sm border-l-4 border-amber-500 p-6">
          
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                  <PawPrintIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {pet.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {pet.species} • {pet.breed}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                onClick={() => handleEdit(pet)}
                className="p-2 text-gray-400 hover:text-amber-500 transition">
                
                  <Edit2Icon className="h-4 w-4" />
                </button>
                <button
                onClick={() => {
                  if (
                  window.confirm(
                    `Are you sure you want to remove ${pet.name}?`
                  ))
                  {
                    deletePet(pet.id);
                  }
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition">
                
                  <Trash2Icon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 mb-1">Age</p>
                <p className="font-semibold text-gray-900">{pet.age} years</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 mb-1">Weight</p>
                <p className="font-semibold text-gray-900">{pet.weight} lbs</p>
              </div>
            </div>

            {pet.medicalNotes &&
          <div>
                <p className="text-sm text-gray-500 mb-1">Medical Notes</p>
                <p className="text-sm text-gray-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                  {pet.medicalNotes}
                </p>
              </div>
          }
          </div>
        )}

        {userPets.length === 0 && !isAdding &&
        <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
            <PawPrintIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No pets added yet
            </h3>
            <p className="text-gray-500 mb-4">
              Add your first pet to start booking appointments.
            </p>
            <button
            onClick={() => setIsAdding(true)}
            className="text-amber-500 hover:text-amber-600 font-medium">
            
              + Add a pet
            </button>
          </div>
        }
      </div>
    </motion.div>);

}