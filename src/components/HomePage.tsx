import { motion } from 'framer-motion'

interface HomePageProps {
  onRoleSelect: (role: 'doctor' | 'patient') => void
}

export default function HomePage({ onRoleSelect }: HomePageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 px-6">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-semibold text-gray-900 mb-4 tracking-tight">
            MedKey
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Your unified medical records platform. Secure, accessible, and always with you.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
          <motion.button
            onClick={() => onRoleSelect('patient')}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-apple-blue text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-apple-xl hover:bg-apple-blueDark transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            I'm a Patient
          </motion.button>

          <motion.button
            onClick={() => onRoleSelect('doctor')}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-white text-gray-900 px-12 py-6 rounded-2xl text-xl font-semibold shadow-apple-xl hover:bg-gray-50 transition-colors border-2 border-gray-200 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            I'm a Doctor
          </motion.button>
        </div>
      </div>
    </div>
  )
}

