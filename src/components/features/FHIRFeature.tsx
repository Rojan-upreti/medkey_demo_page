import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const fhirProviders = [
  { name: 'Epic', color: 'bg-blue-500', delay: 0.2 },
  { name: 'Cerner', color: 'bg-green-500', delay: 0.4 },
  { name: 'Allscripts', color: 'bg-purple-500', delay: 0.6 },
  { name: 'Azure FHIR', color: 'bg-cyan-500', delay: 0.8 },
]

export default function FHIRFeature() {
  const [connected, setConnected] = useState<number[]>([])

  useEffect(() => {
    const timers = fhirProviders.map((_, index) => {
      return setTimeout(() => {
        setConnected(prev => [...prev, index])
      }, (index + 1) * 600)
    })
    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  return (
    <div className="p-8">
      <div className="relative flex items-center justify-center min-h-[300px]">
        {/* Central Hub */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="relative z-10 bg-gradient-to-r from-apple-blue to-blue-600 rounded-full w-20 h-20 flex items-center justify-center shadow-apple-lg"
        >
          <span className="text-white font-semibold text-sm">MK</span>
        </motion.div>

        {/* Provider Cards */}
        {fhirProviders.map((provider, index) => {
          const isConnected = connected.includes(index)
          const angle = (index * 90 - 45) * (Math.PI / 180)
          const radius = 120

          return (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: provider.delay, type: 'spring' }}
              className="absolute"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div
                className={`bg-white rounded-xl p-4 border-2 shadow-apple min-w-[100px] ${
                  isConnected ? 'border-apple-blue' : 'border-gray-200'
                } transition-all`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 ${provider.color} rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                    {provider.name.charAt(0)}
                  </div>
                  <span className="text-gray-700 font-medium text-xs">{provider.name}</span>
                  {isConnected && (
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
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

