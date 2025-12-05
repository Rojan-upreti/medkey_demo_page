import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AddPatientModal from './AddPatientModal'
import { storage } from '../utils/storage'

interface Patient {
  id: string
  name: string
  medKeyId: string
  lastAccess: string
  status: 'pending' | 'active'
  age: number
  lastVisit: string
  nextAppointment?: string
}

interface DoctorDashboardProps {
  onPatientSelect: (patientId: string, medKeyId: string) => void
  onBack: () => void
  onAddPatientRequest: (medKeyId: string) => void
  onNavigateToPatients: () => void
}

const defaultPatients: Patient[] = [
  {
    id: '1',
    name: 'Rojan Upreti',
    medKeyId: 'MK-ROJAN123',
    lastAccess: '2024-01-20',
    status: 'pending',
    age: 39,
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-15'
  },
  {
    id: '2',
    name: 'John Smith',
    medKeyId: 'MK-JSMITH45',
    lastAccess: '2024-01-19',
    status: 'active',
    age: 52,
    lastVisit: '2024-01-10'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    medKeyId: 'MK-EJOHNSON',
    lastAccess: '2024-01-18',
    status: 'active',
    age: 28,
    lastVisit: '2024-01-05',
    nextAppointment: '2024-01-25'
  }
]

export default function DoctorDashboard({ onPatientSelect, onBack, onAddPatientRequest, onNavigateToPatients }: DoctorDashboardProps) {
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [patients, setPatients] = useState<Patient[]>(() => {
    // Load from localStorage or use defaults
    const saved = storage.get<Patient[]>('doctor_patients', defaultPatients)
    if (saved.length === 0) {
      storage.set('doctor_patients', defaultPatients)
      return defaultPatients
    }
    return saved
  })

  useEffect(() => {
    // Sync with localStorage whenever patients change
    storage.set('doctor_patients', patients)
  }, [patients])

  const handleAddPatient = (medKeyId: string) => {
    // Generate patient name based on MedKey ID or use default
    const patientNames: Record<string, string> = {
      'MK-ROJAN123': 'Rojan Upreti',
      'MK-JSMITH45': 'John Smith',
      'MK-EJOHNSON': 'Emily Johnson',
      'MK-MBROWN78': 'Michael Brown',
      'MK-SDAVIS90': 'Sarah Davis'
    }
    
    const newPatient: Patient = {
      id: Date.now().toString(),
      name: patientNames[medKeyId] || `Patient ${medKeyId}`,
      medKeyId: medKeyId,
      lastAccess: new Date().toISOString().split('T')[0],
      status: 'pending',
      age: Math.floor(Math.random() * 50) + 20,
      lastVisit: new Date().toISOString().split('T')[0]
    }
    
    setPatients(prev => {
      const updated = [...prev, newPatient]
      storage.set('doctor_patients', updated)
      return updated
    })
    
    setShowAddPatient(false)
    
    // If it's Rojan Upreti, trigger consent flow
    if (medKeyId === 'MK-ROJAN123') {
      onAddPatientRequest(medKeyId)
    }
  }

  const todayAppointments = patients.filter(p => p.nextAppointment === new Date().toISOString().split('T')[0])
  const pendingConsents = patients.filter(p => p.status === 'pending').length
  const activePatients = patients.filter(p => p.status === 'active').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">MedKey EHR</h1>
                <p className="text-sm text-gray-500">Welcome back, Dr. Sarah Johnson</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {pendingConsents > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center text-white font-semibold">
                SJ
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">{patients.length}</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">Total Patients</p>
            <p className="text-xs text-gray-500 mt-1">All registered patients</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">{activePatients}</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">Active Patients</p>
            <p className="text-xs text-gray-500 mt-1">With active access</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">{pendingConsents}</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">Pending Consents</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting patient approval</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">{todayAppointments.length}</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">Today's Appointments</p>
            <p className="text-xs text-gray-500 mt-1">Scheduled for today</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                <button className="text-sm text-apple-blue font-semibold hover:underline">View All</button>
              </div>
              {todayAppointments.length > 0 ? (
                <div className="space-y-3">
                  {todayAppointments.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => onPatientSelect(patient.id, patient.medKeyId)}
                      className="p-4 bg-blue-50 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-600">Age: {patient.age} • {patient.medKeyId}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">10:00 AM</p>
                          <p className="text-xs text-gray-500">Appointment</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>No appointments scheduled for today</p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-sm text-apple-blue font-semibold hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {patients.slice(0, 3).map((patient) => (
                  <div key={patient.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-apple-blue/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{patient.name}</p>
                      <p className="text-xs text-gray-500">Last access: {patient.lastAccess}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <motion.button
                  onClick={onNavigateToPatients}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-apple-blue text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-apple-blueDark transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Manage Patients
                </motion.button>
                <motion.button
                  onClick={() => setShowAddPatient(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border-2 border-apple-blue text-apple-blue px-4 py-3 rounded-lg font-semibold text-sm hover:bg-apple-blue/5 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Patient
                </motion.button>
                <button className="w-full bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  New Clinical Note
                </button>
                <button className="w-full bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  New Lab Order
                </button>
              </div>
            </div>

            {/* Alerts & Notifications */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h2>
              {pendingConsents > 0 ? (
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-yellow-900">{pendingConsents} Pending Consent{pendingConsents > 1 ? 's' : ''}</p>
                        <p className="text-xs text-yellow-700 mt-1">Awaiting patient approval</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400 text-sm">
                  No alerts at this time
                </div>
              )}
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h2>
              <div className="space-y-3">
                {patients.filter(p => p.nextAppointment && p.nextAppointment !== new Date().toISOString().split('T')[0]).slice(0, 3).map((patient) => (
                  <div key={patient.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{patient.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{patient.nextAppointment}</p>
                  </div>
                ))}
                {patients.filter(p => p.nextAppointment && p.nextAppointment !== new Date().toISOString().split('T')[0]).length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No upcoming appointments
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showAddPatient && (
        <AddPatientModal
          onClose={() => setShowAddPatient(false)}
          onAdd={handleAddPatient}
        />
      )}
    </div>
  )
}
