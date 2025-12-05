import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { storage } from '../utils/storage'

interface ConsentRequestModalProps {
  isOpen: boolean
  onClose: () => void
  patientId: string
  onConsentGranted: () => void
  onConsentDeclined: () => void
}

export default function ConsentRequestModal({ isOpen, onClose, patientId, onConsentGranted, onConsentDeclined }: ConsentRequestModalProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDeclined, setShowDeclined] = useState(false)

  const handleConsent = () => {
    // Save consent to localStorage
    const consentData = {
      patientId,
      doctorName: 'Dr. Sarah Johnson',
      consented: true,
      consentedAt: new Date().toISOString()
    }
    const existingConsents = storage.get<Array<any>>('patient_consents', [])
    const updatedConsents = [...existingConsents.filter(c => c.patientId !== patientId), consentData]
    storage.set('patient_consents', updatedConsents)
    
    // Update doctor's patient list status
    const patients = storage.get<Array<any>>('doctor_patients', [])
    const updatedPatients = patients.map(p => 
      p.medKeyId === patientId ? { ...p, status: 'active', lastAccess: new Date().toISOString().split('T')[0] } : p
    )
    storage.set('doctor_patients', updatedPatients)
    
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onConsentGranted()
      onClose()
    }, 2000)
  }

  const handleDecline = () => {
    // Save declined consent
    const consentData = {
      patientId,
      doctorName: 'Dr. Sarah Johnson',
      consented: false,
      declinedAt: new Date().toISOString()
    }
    const existingConsents = storage.get<Array<any>>('patient_consents', [])
    const updatedConsents = [...existingConsents.filter(c => c.patientId !== patientId), consentData]
    storage.set('patient_consents', updatedConsents)
    
    setShowDeclined(true)
    setTimeout(() => {
      setShowDeclined(false)
      onConsentDeclined()
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden"
        >
          {showSuccess ? (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-green-200"
              >
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Consent Granted!
              </h2>
              <p className="text-gray-600 text-sm">
                Dr. Sarah Johnson can now access your medical records.
              </p>
            </div>
          ) : showDeclined ? (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-gray-200"
              >
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Consent Declined
              </h2>
              <p className="text-gray-600 text-sm">
                You have declined to share your medical records with Dr. Sarah Johnson.
              </p>
            </div>
          ) : (
            <>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-blue-200">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Medical Records Access Request
                  </h2>
                  <p className="text-gray-600 text-sm">
                    <strong>Dr. Sarah Johnson</strong> has requested access to your medical records
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">What will be shared?</p>
                      <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                        <li>Complete medical history</li>
                        <li>Allergies and medications</li>
                        <li>Lab results and imaging</li>
                        <li>Visit history and notes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={handleDecline}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Decline
                  </motion.button>
                  <motion.button
                    onClick={handleConsent}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 bg-apple-blue text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-apple-blueDark transition-colors shadow-lg hover:shadow-xl"
                  >
                    Give Consent
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

