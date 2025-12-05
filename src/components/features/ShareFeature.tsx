import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ShareFeature() {
  const [showConsent, setShowConsent] = useState(false)
  const [showDoctorView, setShowDoctorView] = useState(false)
  const [consentSigned, setConsentSigned] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConsent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleSignConsent = () => {
    setConsentSigned(true)
    setTimeout(() => setShowDoctorView(true), 500)
  }

  return (
    <div className="p-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient Side */}
        <div className="space-y-4">
          <h4 className="text-gray-700 font-semibold text-sm mb-4">Patient View</h4>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-apple-blue text-white py-3 px-4 rounded-xl font-medium text-sm shadow-apple"
          >
            Share My Records
          </motion.button>

          {showConsent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3"
            >
              <h5 className="text-gray-700 font-semibold text-sm">Consent Form</h5>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentSigned}
                  onChange={() => setConsentSigned(!consentSigned)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-apple-blue focus:ring-apple-blue"
                />
                <span className="text-gray-600 text-xs">
                  I consent to share my medical history with Dr. Smith
                </span>
              </label>
              <motion.button
                onClick={handleSignConsent}
                disabled={!consentSigned}
                whileHover={consentSigned ? { scale: 1.02 } : {}}
                whileTap={consentSigned ? { scale: 0.98 } : {}}
                className={`w-full py-2 px-4 rounded-xl font-medium text-sm transition-all ${
                  consentSigned
                    ? 'bg-green-500 text-white shadow-apple'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {consentSigned ? '✓ Sign & Share' : 'Check to continue'}
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Doctor Side */}
        <div className="space-y-4">
          <h4 className="text-gray-700 font-semibold text-sm mb-4">Doctor View</h4>
          {!showDoctorView ? (
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 border-2 border-apple-blue border-t-transparent rounded-full mx-auto mb-3"
                />
                <p className="text-gray-500 text-xs">Waiting for consent...</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 rounded-xl p-4 border-2 border-green-500"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold text-sm">Records Received</p>
                  <p className="text-green-600 text-xs">Complete medical history available</p>
                </div>
              </div>
              <div className="space-y-2">
                {['Allergies', 'Medications', 'Diagnoses', 'Lab Results'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-gray-600 text-xs"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

