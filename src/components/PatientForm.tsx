import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PatientData } from '../App'
import hospitalsData from '../data/hospitals.json'

interface PatientFormProps {
  onSubmit: (data: PatientData) => void
}

type FormStep = 'personal' | 'hospital'

export default function PatientForm({ onSubmit }: PatientFormProps) {
  const [step, setStep] = useState<FormStep>('personal')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [hospitals, setHospitals] = useState<Array<{ id: string; name: string; patientId: string }>>([
    { id: '1', name: '', patientId: '' }
  ])

  const addHospital = () => {
    setHospitals([...hospitals, { id: Date.now().toString(), name: '', patientId: '' }])
  }

  const removeHospital = (id: string) => {
    if (hospitals.length > 1) {
      setHospitals(hospitals.filter(h => h.id !== id))
    }
  }

  const updateHospital = (id: string, field: 'name' | 'patientId', value: string) => {
    setHospitals(hospitals.map(h => 
      h.id === id ? { ...h, [field]: value } : h
    ))
  }

  const handlePersonalInfoNext = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate personal information
    if (!firstName || !lastName || !dob) {
      alert('Please fill in all required fields')
      return
    }

    setStep('hospital')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate hospital information
    if (hospitals.some(h => !h.name || !h.patientId)) {
      alert('Please fill in all hospital information')
      return
    }

    onSubmit({
      firstName,
      lastName,
      dob,
      hospitals
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Patient Registration
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Please provide your information to retrieve your medical records
          </p>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`flex items-center gap-2 ${step === 'personal' ? 'text-apple-blue' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step === 'personal' ? 'bg-apple-blue text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className="font-medium">Personal Information</span>
              </div>
              <div className="w-16 h-1 bg-gray-200">
                <div className={`h-full transition-all ${
                  step === 'hospital' ? 'bg-apple-blue w-full' : 'bg-gray-200 w-0'
                }`} />
              </div>
              <div className={`flex items-center gap-2 ${step === 'hospital' ? 'text-apple-blue' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step === 'hospital' ? 'bg-apple-blue text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className="font-medium">Hospital Information</span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'personal' && (
              <motion.form
                key="personal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handlePersonalInfoNext}
                className="bg-white rounded-2xl shadow-apple-xl border border-gray-100 p-8 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 1: Personal Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent text-gray-900"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent text-gray-900"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-apple-blue text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-apple-blueDark transition-colors shadow-apple-lg"
                >
                  Continue to Hospital Information
                </motion.button>
              </motion.form>
            )}

            {step === 'hospital' && (
              <motion.form
                key="hospital"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-apple-xl border border-gray-100 p-8 space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Step 2: Hospital Information</h2>
                  <button
                    type="button"
                    onClick={() => setStep('personal')}
                    className="text-apple-blue hover:text-apple-blueDark text-sm font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Add all hospitals where you have medical records</p>
                    <button
                      type="button"
                      onClick={addHospital}
                      className="text-apple-blue hover:text-apple-blueDark text-sm font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Another Hospital
                    </button>
                  </div>

                  {hospitals.map((hospital, index) => (
                    <motion.div
                      key={hospital.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-700">Hospital {index + 1}</h3>
                        {hospitals.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHospital(hospital.id)}
                            className="text-red-500 hover:text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hospital Name <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={hospital.name}
                          onChange={(e) => updateHospital(hospital.id, 'name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent text-gray-900 bg-white"
                          required
                        >
                          <option value="">Select a hospital</option>
                          {hospitalsData.map((hospitalName) => (
                            <option key={hospitalName} value={hospitalName}>
                              {hospitalName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Patient ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={hospital.patientId}
                          onChange={(e) => updateHospital(hospital.id, 'patientId', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent text-gray-900"
                          placeholder="Enter your patient ID"
                          required
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-apple-blue text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-apple-blueDark transition-colors shadow-apple-lg"
                >
                  Retrieve Medical Records
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
