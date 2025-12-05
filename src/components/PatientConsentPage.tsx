import { useState } from 'react'
import { motion } from 'framer-motion'

interface PatientConsentPageProps {
  patientName: string
  doctorName: string
  medKeyId: string
  onConsent: () => void
  onDecline: () => void
}

export default function PatientConsentPage({ 
  patientName, 
  doctorName, 
  medKeyId,
  onConsent, 
  onDecline 
}: PatientConsentPageProps) {
  const [consentSigned, setConsentSigned] = useState(false)
  const [understood, setUnderstood] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consentSigned || !understood) {
      alert('Please review and accept all consent terms')
      return
    }
    onConsent()
  }

  const handleSignRightAway = () => {
    // Auto-check both consent boxes and immediately grant access
    setConsentSigned(true)
    setUnderstood(true)
    // Small delay to show the checkboxes being checked, then proceed
    setTimeout(() => {
      onConsent()
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-apple-blue to-apple-blueDark p-6 text-white">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Medical Records Access Request</h1>
              <p className="text-sm text-white/80">Review and sign the consent form</p>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Patient Name</p>
              <p className="text-lg font-semibold text-gray-900">{patientName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">MedKey ID</p>
              <p className="text-lg font-mono font-semibold text-apple-blue">{medKeyId}</p>
            </div>
          </div>
          
          {/* Quick Sign Option */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Signing in person?</p>
                  <p className="text-xs text-gray-600">Sign right away if you're with your doctor</p>
                </div>
              </div>
              <motion.button
                onClick={handleSignRightAway}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Sign Right Away
              </motion.button>
            </div>
          </div>
        </div>

        {/* Consent Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Consent for Medical Records Access</h2>
            <p className="text-sm text-gray-600 mb-6">
              <strong>{doctorName}</strong> has requested access to your complete medical records through MedKey. 
              Please review the following information and provide your consent.
            </p>

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">What information will be shared?</p>
                  <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                    <li>Complete medical history</li>
                    <li>Allergies and medications</li>
                    <li>Diagnoses and conditions</li>
                    <li>Lab results and imaging studies</li>
                    <li>Vital signs and visit history</li>
                    <li>Treatment notes and records</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                <input
                  type="checkbox"
                  checked={consentSigned}
                  onChange={(e) => setConsentSigned(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-gray-300 text-apple-blue focus:ring-2 focus:ring-apple-blue focus:ring-offset-2"
                  required
                />
                <div>
                  <span className="text-sm font-semibold text-gray-900 block mb-1">
                    I consent to share my medical records
                  </span>
                  <span className="text-xs leading-relaxed text-gray-700">
                    I consent to share my complete medical history, including allergies, medications, diagnoses, 
                    lab results, imaging studies, vital signs, and visit history with <strong>{doctorName}</strong> 
                    for medical treatment purposes.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                <input
                  type="checkbox"
                  checked={understood}
                  onChange={(e) => setUnderstood(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-gray-300 text-apple-blue focus:ring-2 focus:ring-apple-blue focus:ring-offset-2"
                  required
                />
                <div>
                  <span className="text-sm font-semibold text-gray-900 block mb-1">
                    I understand my rights
                  </span>
                  <span className="text-xs leading-relaxed text-gray-700">
                    I understand that this information will be used solely for medical treatment purposes, 
                    will be handled in accordance with HIPAA regulations, and I can revoke this consent at any time 
                    through my MedKey portal.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <motion.button
              type="button"
              onClick={onDecline}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Decline
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={!consentSigned || !understood}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                consentSigned && understood
                  ? 'bg-apple-blue text-white hover:bg-apple-blueDark shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Sign & Grant Access
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

