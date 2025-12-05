import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareModalProps {
  patientId: string
  onClose: () => void
}

export default function ShareModal({ patientId, onClose }: ShareModalProps) {
  const [consentSigned, setConsentSigned] = useState(false)
  const [showShareInfo, setShowShareInfo] = useState(false)
  const [showDoctorIdInput, setShowDoctorIdInput] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [doctorMedKeyId, setDoctorMedKeyId] = useState('')

  const handleConsentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consentSigned) {
      alert('Please sign the consent form')
      return
    }
    setShowShareInfo(true)
  }

  const handleDoctorIdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!doctorMedKeyId.trim()) {
      alert('Please enter doctor\'s MedKey ID')
      return
    }
    // Here you would typically send the doctor ID to the backend
    setShowSuccess(true)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!showShareInfo ? (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-apple-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Share Medical Records
                </h2>
                <p className="text-gray-600 text-sm">
                  Review and sign the consent form to proceed
                </p>
              </div>

              <form onSubmit={handleConsentSubmit} className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">Consent Agreement</h3>
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-white transition-colors">
                      <input
                        type="checkbox"
                        checked={consentSigned}
                        onChange={(e) => setConsentSigned(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-apple-blue focus:ring-2 focus:ring-apple-blue focus:ring-offset-2"
                        required
                      />
                      <span className="text-xs leading-relaxed text-gray-700">
                        I consent to share my complete medical history, including allergies, medications, diagnoses, lab results, imaging studies, vital signs, and visit history with authorized healthcare providers.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-white transition-colors">
                      <input
                        type="checkbox"
                        checked={consentSigned}
                        onChange={(e) => setConsentSigned(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-apple-blue focus:ring-2 focus:ring-apple-blue focus:ring-offset-2"
                        required
                      />
                      <span className="text-xs leading-relaxed text-gray-700">
                        I understand that this information will be used solely for medical treatment purposes and will be handled in accordance with HIPAA regulations.
                      </span>
                    </label>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={!consentSigned}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                    consentSigned
                      ? 'bg-apple-blue text-white hover:bg-apple-blueDark shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Sign & Continue
                </motion.button>
              </form>
            </div>
          ) : !showDoctorIdInput ? (
            <div className="p-6">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-green-200"
                >
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Records Ready to Share
                </h2>
                <p className="text-gray-600 text-sm">
                  Your consent has been signed. Share your MedKey ID with your healthcare provider.
                </p>
              </div>

              {/* MedKey ID Display */}
              <div className="mb-6">
                <div className="bg-gradient-to-br from-apple-blue/5 via-blue-50/50 to-purple-50/30 rounded-xl p-1 border border-gray-200">
                  <div className="bg-white rounded-lg p-6 border border-gray-100">
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Your MedKey ID</p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                      >
                        <div className="bg-gray-50 rounded-lg px-6 py-4 border-2 border-apple-blue/30">
                          <p className="text-3xl font-bold text-apple-blue tracking-[0.2em] font-mono">
                            {patientId}
                          </p>
                        </div>
                      </motion.div>
                      <p className="text-xs text-gray-500 mt-3">
                        Provide this ID to your healthcare provider to grant access
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Share ID</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 border border-green-100 text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">HIPAA Secure</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-100 text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Encrypted</p>
                </div>
              </div>

              {/* Enter Doctor ID Button */}
              <div className="pt-4 border-t border-gray-200">
                <motion.button
                  onClick={() => setShowDoctorIdInput(true)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-white border-2 border-apple-blue text-apple-blue hover:bg-apple-blue hover:text-white py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Enter Doctor's MedKey ID
                </motion.button>
              </div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gray-100 text-gray-700 py-2.5 px-6 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors mt-3"
              >
                Close
              </motion.button>
            </div>
          ) : !showSuccess ? (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-apple-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Share with Doctor
                </h2>
                <p className="text-gray-600 text-sm">
                  Enter your doctor's MedKey ID to share records directly
                </p>
              </div>

              <form onSubmit={handleDoctorIdSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doctor's MedKey ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={doctorMedKeyId}
                    onChange={(e) => setDoctorMedKeyId(e.target.value)}
                    className="apple-input w-full"
                    placeholder="Enter doctor's MedKey ID (e.g., MK-ABC123XY)"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Ask your doctor for their MedKey ID to share records securely
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="button"
                    onClick={() => setShowDoctorIdInput(false)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 bg-apple-blue text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-apple-blueDark transition-colors shadow-lg hover:shadow-xl"
                  >
                    Share Records
                  </motion.button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border-2 border-green-200"
                >
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Records Shared Successfully!
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Your medical records have been securely shared with
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Doctor's MedKey ID</p>
                  <p className="text-lg font-bold text-apple-blue font-mono">{doctorMedKeyId}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-blue-900 mb-1">What happens next?</p>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Your doctor will receive a notification and can now access your complete medical history through their MedKey portal.
                      </p>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-apple-blue text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-apple-blueDark transition-colors shadow-lg hover:shadow-xl"
                >
                  Done
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
