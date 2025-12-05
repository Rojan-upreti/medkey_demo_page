import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const recordTypes = [
  { name: 'Allergies', icon: '⚠️', color: 'bg-red-100 text-red-600', delay: 0.1 },
  { name: 'Medications', icon: '💊', color: 'bg-blue-100 text-blue-600', delay: 0.2 },
  { name: 'Diagnoses', icon: '📋', color: 'bg-green-100 text-green-600', delay: 0.3 },
  { name: 'Lab Results', icon: '🧪', color: 'bg-yellow-100 text-yellow-600', delay: 0.4 },
  { name: 'Imaging', icon: '📷', color: 'bg-purple-100 text-purple-600', delay: 0.5 },
  { name: 'Vitals', icon: '❤️', color: 'bg-pink-100 text-pink-600', delay: 0.6 },
]

export default function FetchFeature() {
  const [fetched, setFetched] = useState<number[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const timers = recordTypes.map((_, index) => {
      return setTimeout(() => {
        setFetched(prev => [...prev, index])
      }, (index + 1) * 400)
    })

    return () => {
      clearInterval(interval)
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-sm font-medium">Fetching Records</span>
          <span className="text-gray-600 text-sm font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-apple-blue rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {recordTypes.map((record, index) => {
          const isFetched = fetched.includes(index)
          return (
            <motion.div
              key={record.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={isFetched ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: record.delay, type: 'spring' }}
              className={`bg-white rounded-xl p-4 border ${
                isFetched ? 'border-apple-blue shadow-apple' : 'border-gray-200'
              } transition-all`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 ${record.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {record.icon}
                </div>
                <span className="text-gray-700 font-medium text-xs text-center">{record.name}</span>
                {isFetched && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

