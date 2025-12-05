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

interface PatientsManagementProps {
  onPatientSelect: (patientId: string, medKeyId: string) => void
  onBack: () => void
  onAddPatientRequest: (medKeyId: string) => void
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
  },
  {
    id: '4',
    name: 'Michael Brown',
    medKeyId: 'MK-MBROWN78',
    lastAccess: '2024-01-17',
    status: 'active',
    age: 45,
    lastVisit: '2024-01-12'
  },
  {
    id: '5',
    name: 'Sarah Davis',
    medKeyId: 'MK-SDAVIS90',
    lastAccess: '2024-01-16',
    status: 'pending',
    age: 33,
    lastVisit: '2024-01-08'
  }
]

export default function PatientsManagement({ onPatientSelect, onBack, onAddPatientRequest }: PatientsManagementProps) {
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending'>('all')
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

  // Listen for storage changes (when patient is added from dashboard)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = storage.get<Patient[]>('doctor_patients', defaultPatients)
      setPatients(saved)
    }
    window.addEventListener('storage', handleStorageChange)
    // Also check periodically for same-tab updates
    const interval = setInterval(() => {
      const saved = storage.get<Patient[]>('doctor_patients', defaultPatients)
      if (JSON.stringify(saved) !== JSON.stringify(patients)) {
        setPatients(saved)
      }
    }, 500)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
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

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.medKeyId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Patient Management</h1>
                <p className="text-sm text-gray-500">Manage and access all your patients</p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowAddPatient(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-apple-blue text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-apple-blueDark transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Patient
            </motion.button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or MedKey ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-apple-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterStatus === 'active'
                    ? 'bg-apple-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterStatus === 'pending'
                    ? 'bg-apple-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Patient List */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPatientSelect(patient.id, patient.medKeyId)}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-apple-blue cursor-pointer transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-apple-blue/10 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-xs text-gray-500">Age: {patient.age} • ID: {patient.medKeyId}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    patient.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {patient.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Last visit: {patient.lastVisit}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Last access: {patient.lastAccess}
                  </div>
                  {patient.nextAppointment && (
                    <div className="flex items-center gap-2 text-xs text-apple-blue font-semibold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Next: {patient.nextAppointment}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 mb-4">No patients found</p>
            <button
              onClick={() => setShowAddPatient(true)}
              className="text-apple-blue font-semibold hover:underline"
            >
              Add your first patient
            </button>
          </div>
        )}
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

