import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'

interface ShareModalProps {
  patientId: string
  onClose: () => void
}

export default function ShareModal({ patientId, onClose }: ShareModalProps) {
  const [shareCode, setShareCode] = useState<string>('')

  useEffect(() => {
    // Generate 5-character alphanumeric code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setShareCode(code)
  }, [])

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-3xl shadow-apple-xl max-w-md w-full p-8 relative"
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="w-16 h-16 bg-apple-blue rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </motion.div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Share Your Medical Records
            </h2>
            <p className="text-gray-600 mb-8">
              Show this code or QR code to your doctor to grant access to your medical records
            </p>

            {/* Share Code */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-3">Share Code</p>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-6 border-2 border-apple-blue"
              >
                <p className="text-4xl font-bold text-apple-blue tracking-widest font-mono">
                  {shareCode}
                </p>
              </motion.div>
            </div>

            {/* QR Code */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-3">Scan QR Code</p>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 inline-block"
              >
                <QRCodeSVG
                  value={shareCode}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </motion.div>
            </div>

            {/* Patient ID */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-gray-600 mb-1">Patient ID</p>
              <p className="text-sm font-semibold text-gray-900">{patientId}</p>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-apple-blue text-white py-3 px-6 rounded-xl font-semibold hover:bg-apple-blueDark transition-colors"
            >
              Done
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

