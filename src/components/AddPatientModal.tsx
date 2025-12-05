import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AddPatientModalProps {
  onClose: () => void
  onAdd: (medKeyId: string) => void
}

export default function AddPatientModal({ onClose, onAdd }: AddPatientModalProps) {
  const [medKeyId, setMedKeyId] = useState('')
  const [showConsentRequest, setShowConsentRequest] = useState(false)
  const [showSignaturePad, setShowSignaturePad] = useState(false)
  const [signature, setSignature] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!medKeyId.trim()) {
      alert('Please enter patient MedKey ID')
      return
    }
    setShowConsentRequest(true)
  }

  const handleSendConsentRequest = () => {
    onAdd(medKeyId)
    onClose()
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#007AFF'
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.beginPath()
      setSignature(canvas.toDataURL())
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignature(null)
  }

  useEffect(() => {
    if (showSignaturePad && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#007AFF'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
    }
  }, [showSignaturePad])

  const handleSignatureDone = () => {
    if (!signature) {
      alert('Please provide your signature')
      return
    }
    // Save signature to localStorage
    const signatureData = {
      medKeyId,
      signature,
      signedAt: new Date().toISOString(),
      signedBy: 'Dr. Sarah Johnson'
    }
    const existingSignatures = JSON.parse(localStorage.getItem('consent_signatures') || '[]')
    existingSignatures.push(signatureData)
    localStorage.setItem('consent_signatures', JSON.stringify(existingSignatures))
    
    // Update patient status to active
    const patients = JSON.parse(localStorage.getItem('doctor_patients') || '[]')
    const updatedPatients = patients.map((p: any) => 
      p.medKeyId === medKeyId ? { ...p, status: 'active', lastAccess: new Date().toISOString().split('T')[0] } : p
    )
    localStorage.setItem('doctor_patients', JSON.stringify(updatedPatients))
    
    // Signature is saved, now mark as signed consent
    setShowSignaturePad(false)
    setShowConsentRequest(false)
    onAdd(medKeyId)
    onClose()
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

          {!showConsentRequest ? (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-apple-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Add New Patient
                </h2>
                <p className="text-gray-600 text-sm">
                  Enter the patient's MedKey ID to request access to their medical records
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Patient's MedKey ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={medKeyId}
                    onChange={(e) => setMedKeyId(e.target.value.toUpperCase())}
                    className="apple-input w-full"
                    placeholder="Enter MedKey ID (e.g., MK-ROJAN123)"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    The patient will receive a consent request to share their medical records
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 bg-apple-blue text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-apple-blueDark transition-colors shadow-lg hover:shadow-xl"
                  >
                    Send Request
                  </motion.button>
                </div>
              </form>
            </div>
          ) : !showSignaturePad ? (
            <div className="p-6">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-blue-200"
                >
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Consent Request Sent
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  A consent request has been sent to the patient
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Patient MedKey ID</p>
                  <p className="text-lg font-bold text-apple-blue font-mono">{medKeyId}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-blue-900 mb-1">What happens next?</p>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        The patient will receive a notification to review and sign the consent form. Once signed, you'll be able to access their complete medical records.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sign Consent Button */}
                <div className="pt-4 border-t border-gray-200">
                  <motion.button
                    onClick={() => setShowSignaturePad(true)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Sign Consent
                  </motion.button>
                  <p className="text-xs text-center text-gray-500 mb-4">
                    Sign consent now if patient is present
                  </p>
                </div>

                <motion.button
                  onClick={handleSendConsentRequest}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-apple-blue text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-apple-blueDark transition-colors shadow-lg hover:shadow-xl"
                >
                  Done
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-green-200">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Sign Consent Form
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Draw your signature below to sign the HIPAA-compliant consent form
                </p>
              </div>

              {/* Signature Pad */}
              <div className="mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300 mb-4">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={200}
                    className="w-full h-48 bg-white rounded-lg border border-gray-200 cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={clearSignature}
                    className="text-sm text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear
                  </button>
                  <p className="text-xs text-gray-500">Sign in the box above</p>
                </div>
              </div>

              {/* HIPAA Compliance Notice */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-green-900 mb-1">HIPAA Compliant Signature</p>
                    <p className="text-xs text-green-700 leading-relaxed">
                      This signature will be securely stored and encrypted in compliance with HIPAA regulations. By signing, you confirm consent for medical records access.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowSignaturePad(false)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={handleSignatureDone}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={!signature}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                    signature
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Done & Sign Consent
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
