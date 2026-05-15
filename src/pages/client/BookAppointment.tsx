import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import {
  CalendarIcon,
  PawPrintIcon,
  StethoscopeIcon,
  CheckCircleIcon } from
'lucide-react';
export function BookAppointment() {
  const {
    currentUser,
    pets,
    services,
    veterinarians,
    addAppointment,
    appointments
  } = useApp();
  const navigate = useNavigate();
  const userPets = pets.filter((p) => p.ownerId === currentUser?.id);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedPet, setSelectedPet] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedVet, setSelectedVet] = useState('');
  const [notes, setNotes] = useState('');
  const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM'];

  const getAvailableTimeSlots = () => {
    if (!selectedDate || !selectedVet) return timeSlots;
    // Filter out times that are already booked for this vet on this date
    const bookedTimes = appointments.
    filter(
      (a) =>
      a.date === selectedDate &&
      a.veterinarianId === selectedVet &&
      a.status !== 'cancelled'
    ).
    map((a) => a.time);
    return timeSlots.filter((time) => !bookedTimes.includes(time));
  };
  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  const handleSubmit = () => {
    if (!currentUser) return;
    addAppointment({
      petId: selectedPet,
      ownerId: currentUser.id,
      serviceId: selectedService,
      veterinarianId: selectedVet,
      date: selectedDate,
      time: selectedTime,
      status: 'upcoming',
      notes
    });
    navigate('/client/appointments');
  };
  if (userPets.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <PawPrintIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Add a Pet First
        </h2>
        <p className="text-gray-600 mb-6">
          You need to add a pet to your profile before booking an appointment.
        </p>
        <button
          onClick={() => navigate('/client/pets')}
          className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition">
          
          Go to My Pets
        </button>
      </div>);

  }
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
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
        <p className="text-gray-600 mt-2">
          Schedule a visit for your pet in a few easy steps.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-amber-500 -z-10 transition-all duration-300"
            style={{
              width: `${(step - 1) / 3 * 100}%`
            }}>
          </div>

          {[1, 2, 3, 4].map((i) =>
          <div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 ${step >= i ? 'bg-amber-500 border-amber-200 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
            
              {step > i ? <CheckCircleIcon className="h-5 w-5" /> : i}
            </div>
          )}
        </div>
        <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
          <span>Service & Pet</span>
          <span>Date & Vet</span>
          <span>Time</span>
          <span>Confirm</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        {step === 1 &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="space-y-6">
          
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Select Service & Pet
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which pet is this for?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userPets.map((pet) =>
              <div
                key={pet.id}
                onClick={() => setSelectedPet(pet.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${selectedPet === pet.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}>
                
                    <div className="flex items-center space-x-3">
                      <PawPrintIcon
                    className={`h-6 w-6 ${selectedPet === pet.id ? 'text-amber-500' : 'text-gray-400'}`} />
                  
                      <div>
                        <p className="font-semibold text-gray-900">
                          {pet.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {pet.species} - {pet.breed}
                        </p>
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-6">
                What service do you need?
              </label>
              <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
              
                <option value="">Select a service...</option>
                {services.
              filter((s) => s.active).
              map((service) =>
              <option key={service.id} value={service.id}>
                      {service.name} - {service.duration} mins (₱{service.price}
                      )
                    </option>
              )}
              </select>
            </div>
          </motion.div>
        }

        {step === 2 &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="space-y-6">
          
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Select Date & Veterinarian
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a Veterinarian
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {veterinarians.map((vet) =>
              <div
                key={vet.id}
                onClick={() => setSelectedVet(vet.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${selectedVet === vet.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}>
                
                    <div className="flex items-center space-x-3">
                      <StethoscopeIcon
                    className={`h-6 w-6 ${selectedVet === vet.id ? 'text-amber-500' : 'text-gray-400'}`} />
                  
                      <div>
                        <p className="font-semibold text-gray-900">
                          {vet.name}
                        </p>
                        <p className="text-sm text-gray-500">{vet.specialty}</p>
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-6">
                Select Date
              </label>
              <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
            
            </div>
          </motion.div>
        }

        {step === 3 &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="space-y-6">
          
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Select Time Slot
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {getAvailableTimeSlots().map((time) =>
            <div
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`cursor-pointer py-3 text-center rounded-lg border-2 transition-all ${selectedTime === time ? 'border-amber-500 bg-amber-50 text-amber-700 font-semibold' : 'border-gray-200 hover:border-amber-300 text-gray-700'}`}>
              
                  {time}
                </div>
            )}
              {getAvailableTimeSlots().length === 0 &&
            <div className="col-span-full text-center py-8 text-gray-500">
                  No available time slots for this date and veterinarian. Please
                  select another date.
                </div>
            }
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-6">
                Additional Notes (Optional)
              </label>
              <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Any specific concerns or symptoms?">
            </textarea>
            </div>
          </motion.div>
        }

        {step === 4 &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="space-y-6">
          
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Confirm Appointment
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start">
                <PawPrintIcon className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Pet</p>
                  <p className="text-gray-900 font-semibold">
                    {pets.find((p) => p.id === selectedPet)?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <StethoscopeIcon className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Service</p>
                  <p className="text-gray-900 font-semibold">
                    {services.find((s) => s.id === selectedService)?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CalendarIcon className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Date & Time
                  </p>
                  <p className="text-gray-900 font-semibold">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}{' '}
                    at {selectedTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <StethoscopeIcon className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Veterinarian
                  </p>
                  <p className="text-gray-900 font-semibold">
                    {veterinarians.find((v) => v.id === selectedVet)?.name}
                  </p>
                </div>
              </div>

              {notes &&
            <div className="pt-4 border-t border-gray-200 mt-4">
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    Notes
                  </p>
                  <p className="text-gray-700 text-sm">{notes}</p>
                </div>
            }
            </div>
          </motion.div>
        }

        <div className="mt-8 flex justify-between pt-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg font-medium ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}>
            
            Back
          </button>

          {step < 4 ?
          <button
            onClick={handleNext}
            disabled={
            step === 1 && (!selectedPet || !selectedService) ||
            step === 2 && (!selectedVet || !selectedDate) ||
            step === 3 && !selectedTime
            }
            className="bg-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition">
            
              Next Step
            </button> :

          <button
            onClick={handleSubmit}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-600 transition flex items-center">
            
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Confirm Booking
            </button>
          }
        </div>
      </div>
    </motion.div>);

}