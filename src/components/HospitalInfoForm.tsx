import { useState } from 'react'
import { motion } from 'framer-motion'
import { PatientData } from '../App'
import hospitalsData from '../data/hospitals.json'

interface HospitalInfoFormProps {
  personalInfo: { firstName: string; lastName: string; dob: string }
  onBack: () => void
  onSubmit: (data: PatientData) => void
}

export default function HospitalInfoForm({ personalInfo, onBack, onSubmit }: HospitalInfoFormProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate hospital information
    if (hospitals.some(h => !h.name || !h.patientId)) {
      alert('Please fill in all hospital information')
      return
    }

    onSubmit({
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      dob: personalInfo.dob,
      hospitals
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Hospital Information
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Step 2 of 2: Add hospitals where you have medical records
          </p>

          <form onSubmit={handleSubmit} className="apple-card p-10 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
                <p className="text-sm text-gray-600 font-medium">Add all hospitals where you have medical records</p>
                <button
                  type="button"
                  onClick={addHospital}
                  className="text-apple-blue hover:text-apple-blueDark text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-apple-blue/10 transition-colors"
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
                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 space-y-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700 tracking-wide">Hospital {index + 1}</h3>
                    {hospitals.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHospital(hospital.id)}
                        className="text-red-500 hover:text-red-600 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">
                      Hospital Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={hospital.name}
                        onChange={(e) => updateHospital(hospital.id, 'name', e.target.value)}
                        className="apple-select"
                        required
                      >
                        <option value="">Select a hospital</option>
                        {hospitalsData.map((hospitalName) => (
                          <option key={hospitalName} value={hospitalName}>
                            {hospitalName}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">
                      Patient ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={hospital.patientId}
                      onChange={(e) => updateHospital(hospital.id, 'patientId', e.target.value)}
                      className="apple-input"
                      placeholder="Enter your patient ID"
                      required
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <motion.button
                type="button"
                onClick={onBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-white/70 backdrop-blur-sm text-gray-700 py-5 px-6 rounded-2xl text-lg font-semibold hover:bg-white transition-all duration-200 border border-gray-200/80 shadow-sm hover:shadow-md"
              >
                Back
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-apple-blue text-white py-5 px-6 rounded-2xl text-lg font-semibold hover:bg-apple-blueDark transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Retrieve Medical Records
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

