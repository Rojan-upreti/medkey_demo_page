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
    alert(`Medical records shared with doctor MedKey ID: ${doctorMedKeyId}`)
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-3xl shadow-apple-xl max-w-lg w-full p-8 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center">
            {!showShareInfo ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-16 h-16 bg-apple-blue rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </motion.div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Share Your Medical Records
                </h2>
                <p className="text-gray-600 mb-8">
                  Please review and sign the consent form to share your records
                </p>

                <form onSubmit={handleConsentSubmit} className="space-y-6">
                  {/* Consent Form */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-left">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Consent Form</h3>
                    <div className="space-y-3 mb-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentSigned}
                          onChange={(e) => setConsentSigned(e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-gray-300 text-apple-blue focus:ring-apple-blue"
                          required
                        />
                        <span className="text-sm text-gray-700">
                          I consent to share my complete medical history with healthcare providers
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentSigned}
                          onChange={(e) => setConsentSigned(e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-gray-300 text-apple-blue focus:ring-apple-blue"
                          required
                        />
                        <span className="text-sm text-gray-700">
                          I understand this information will be used for medical treatment purposes only
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Sign Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-apple-blue text-white py-3 px-6 rounded-xl font-semibold hover:bg-apple-blueDark transition-colors"
                  >
                    Sign & Continue
                  </motion.button>
                </form>
              </>
            ) : !showDoctorIdInput ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>

                <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                  Consent Signed Successfully
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Your medical records are ready to share
                </p>

                {/* MedKey ID Card */}
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-apple-blue/10 to-blue-50 rounded-2xl p-8 border-2 border-apple-blue/30">
                    <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">Your MedKey ID</p>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="bg-white rounded-xl p-6 border-2 border-apple-blue shadow-lg"
                    >
                      <p className="text-5xl font-bold text-apple-blue tracking-widest font-mono mb-2">
                        {patientId}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">Share this ID with your healthcare provider</p>
                    </motion.div>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-gray-700">Share ID</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-gray-700">Secure</p>
                  </div>
                </div>

                {/* Enter Doctor ID Option */}
                <div className="pt-6 border-t border-gray-200">
                  <motion.button
                    onClick={() => setShowDoctorIdInput(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white border-2 border-apple-blue text-apple-blue hover:bg-apple-blue hover:text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Enter Doctor's MedKey ID
                  </motion.button>
                </div>

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors mt-4"
                >
                  Done
                </motion.button>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-16 h-16 bg-apple-blue rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Enter Doctor's MedKey ID
                </h2>
                <p className="text-gray-600 mb-8">
                  Enter your doctor's MedKey ID to share your records directly
                </p>

                <form onSubmit={handleDoctorIdSubmit} className="space-y-6">
                  <div className="text-left">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      type="button"
                      onClick={() => setShowDoctorIdInput(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-apple-blue text-white py-3 px-6 rounded-xl font-semibold hover:bg-apple-blueDark transition-colors"
                    >
                      Share Records
                    </motion.button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
