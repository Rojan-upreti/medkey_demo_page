import { useState } from 'react'
import { motion } from 'framer-motion'

interface PersonalInfoFormProps {
  onSubmit: (data: { firstName: string; lastName: string; dob: string }) => void
}

export default function PersonalInfoForm({ onSubmit }: PersonalInfoFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate
    if (!firstName || !lastName || !dob) {
      alert('Please fill in all required fields')
      return
    }

    onSubmit({ firstName, lastName, dob })
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
            Personal Information
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Step 1 of 2: Please provide your personal information
          </p>

          <form onSubmit={handleSubmit} className="apple-card p-10 space-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="apple-input"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="apple-input"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="apple-input"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-apple-blue text-white py-5 px-6 rounded-2xl text-lg font-semibold hover:bg-apple-blueDark transition-all duration-200 shadow-lg hover:shadow-xl mt-8"
            >
              Continue to Hospital Information
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

