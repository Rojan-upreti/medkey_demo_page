import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const summaryCards = [
  { title: 'Medications', value: '3', color: 'bg-blue-100 text-blue-600' },
  { title: 'Allergies', value: '2', color: 'bg-red-100 text-red-600' },
  { title: 'Visits', value: '5', color: 'bg-green-100 text-green-600' },
  { title: 'Labs', value: '12', color: 'bg-purple-100 text-purple-600' },
]

const timelineEvents = [
  { date: 'Jan 15', event: 'Annual Checkup', type: 'visit' },
  { date: 'Feb 20', event: 'Lab Results', type: 'lab' },
  { date: 'Mar 10', event: 'Medication Update', type: 'medication' },
]

export default function ViewFeature() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-8 space-y-6">
      {/* Summary Cards */}
      <div>
        <h4 className="text-gray-700 font-semibold text-sm mb-3">Summary</h4>
        <div className="grid grid-cols-2 gap-3">
          {summaryCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className={`${card.color} rounded-xl p-4`}
            >
              <p className="text-xs font-medium mb-1">{card.title}</p>
              <p className="text-2xl font-semibold">{card.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4 className="text-gray-700 font-semibold text-sm mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={showContent ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200"
            >
              <div className="w-8 h-8 bg-apple-blue/10 rounded-lg flex items-center justify-center">
                {event.type === 'visit' && '🏥'}
                {event.type === 'lab' && '🧪'}
                {event.type === 'medication' && '💊'}
              </div>
              <div className="flex-1">
                <p className="text-gray-700 font-medium text-sm">{event.event}</p>
                <p className="text-gray-500 text-xs">{event.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

