import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PatientData, MedicalRecord } from '../App'
import ConsentRequestModal from './ConsentRequestModal'
import { storage } from '../utils/storage'

interface MedicalHistoryProps {
  patientData: PatientData
  medicalRecords: MedicalRecord
  patientId: string
  onShare: () => void
}

type MenuItem = 'overview' | 'allergies' | 'medications' | 'diagnoses' | 'labs' | 'imaging' | 'vitals' | 'visits' | 'messages' | 'notes'

export default function MedicalHistory({ patientData, medicalRecords, patientId, onShare }: MedicalHistoryProps) {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('overview')
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [hasPendingRequest, setHasPendingRequest] = useState(false)
  
  useEffect(() => {
    // Check if there's a pending consent request
    // In real app, this would check from backend/notifications
    // For demo, we'll check if doctor has requested access
    const patients = storage.get<Array<any>>('doctor_patients', [])
    const patient = patients.find(p => p.medKeyId === patientId)
    const consents = storage.get<Array<any>>('patient_consents', [])
    const hasConsented = consents.some(c => c.patientId === patientId && c.consented === true)
    
    // Show notification if patient exists in doctor's list and hasn't consented yet
    if (patient && !hasConsented && patient.status === 'pending') {
      setHasPendingRequest(true)
    }
  }, [patientId])

  const handleConsentGranted = () => {
    setHasPendingRequest(false)
  }

  const handleConsentDeclined = () => {
    setHasPendingRequest(false)
  }

  const [messages] = useState([
    { id: 1, from: 'Dr. Sarah Johnson', subject: 'Lab Results Available', date: '2024-01-16', message: 'Your recent lab results are now available. All values are within normal range. Please continue with your current medications.', read: false },
    { id: 2, from: 'Dr. Michael Chen', subject: 'Follow-up Appointment', date: '2024-01-10', message: 'Your cardiology follow-up is scheduled for next month. Please continue monitoring your blood pressure daily.', read: true },
    { id: 3, from: 'Nurse Practitioner', subject: 'Medication Refill', date: '2024-01-05', message: 'Your prescription for Lisinopril has been refilled and is ready for pickup at your pharmacy.', read: true },
  ])
  const [notes] = useState([
    { id: 1, title: 'Blood Pressure Log', date: '2024-01-15', content: 'Morning: 128/82, Evening: 125/80. Feeling good, no dizziness.', category: 'Vitals' },
    { id: 2, title: 'Medication Side Effects', date: '2024-01-10', content: 'Noticed mild headache after starting Metformin. Will monitor and discuss with doctor if persists.', category: 'Medications' },
    { id: 3, title: 'Diet Notes', date: '2024-01-08', content: 'Following diabetic diet plan. Blood sugar levels stable. Avoiding processed foods.', category: 'Lifestyle' },
  ])

  const menuItems: Array<{ id: MenuItem; label: string; icon: JSX.Element }> = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    { 
      id: 'allergies', 
      label: 'Allergies', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    },
    { 
      id: 'medications', 
      label: 'Medications', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    },
    { 
      id: 'diagnoses', 
      label: 'Diagnoses', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    },
    { 
      id: 'labs', 
      label: 'Lab Results', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    },
    { 
      id: 'imaging', 
      label: 'Imaging', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    { 
      id: 'vitals', 
      label: 'Vital Signs', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    },
    { 
      id: 'visits', 
      label: 'Visits', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    },
    { 
      id: 'notes', 
      label: 'Notes', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
    },
  ]

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">{medicalRecords.medications.length}</div>
                <div className="text-sm text-gray-600 font-medium">Active Medications</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">{medicalRecords.allergies.length}</div>
                <div className="text-sm text-gray-600 font-medium">Allergies</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">{medicalRecords.visits.length}</div>
                <div className="text-sm text-gray-600 font-medium">Recent Visits</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">{medicalRecords.labResults.length}</div>
                <div className="text-sm text-gray-600 font-medium">Lab Results</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">Recent Activity</h3>
                <div className="space-y-4">
                  {medicalRecords.visits.slice(0, 3).map((visit, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm mb-1">{visit.reason}</div>
                        <div className="text-sm text-gray-600 mb-1">{visit.provider}</div>
                        <div className="text-xs text-gray-500">{visit.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">Upcoming</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm mb-1">Annual Physical</div>
                      <div className="text-sm text-gray-600 mb-1">Dr. Sarah Johnson</div>
                      <div className="text-xs text-gray-500">Scheduled for Feb 15, 2024</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm mb-1">Medication Refill Due</div>
                      <div className="text-sm text-gray-600 mb-1">Lisinopril</div>
                      <div className="text-xs text-gray-500">Due in 5 days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'allergies':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {medicalRecords.allergies.map((allergy, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-1">{allergy.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">Severity: <span className="font-medium text-red-600">{allergy.severity}</span></p>
                        <p className="text-xs text-gray-500">Recorded: {allergy.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'medications':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {medicalRecords.medications.map((med, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-1">{med.name}</h4>
                        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">{med.dosage}</span> • {med.frequency}</p>
                        <p className="text-xs text-gray-500">Started: {med.startDate}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium border border-green-200">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'diagnoses':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Diagnoses</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {medicalRecords.diagnoses.map((diagnosis, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-1">{diagnosis.condition}</h4>
                        <p className="text-sm text-gray-600">Diagnosed: {diagnosis.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-md text-xs font-medium border ${
                      diagnosis.status === 'Active' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {diagnosis.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'labs':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Lab Results</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {medicalRecords.labResults.map((lab, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-base font-semibold text-gray-900">{lab.test}</h4>
                    <span className="text-sm text-gray-500">{lab.date}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-gray-900">{lab.result}</span>
                    {lab.unit && <span className="text-sm text-gray-600">{lab.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'imaging':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Imaging Studies</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {medicalRecords.imaging.map((image, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-1">{image.type}</h4>
                      <p className="text-sm text-gray-600">{image.facility}</p>
                    </div>
                    <span className="text-sm text-gray-500">{image.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-200">{image.findings}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'vitals':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Vital Signs</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {medicalRecords.vitals.map((vital, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-semibold text-gray-900">Vital Signs</h4>
                    <span className="text-sm text-gray-500">{vital.date}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-1 font-medium">Blood Pressure</div>
                      <div className="text-lg font-semibold text-gray-900">{vital.bloodPressure}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1 font-medium">Heart Rate</div>
                      <div className="text-lg font-semibold text-gray-900">{vital.heartRate} bpm</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1 font-medium">Temperature</div>
                      <div className="text-lg font-semibold text-gray-900">{vital.temperature}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1 font-medium">Weight</div>
                      <div className="text-lg font-semibold text-gray-900">{vital.weight}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'visits':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Visit History</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {medicalRecords.visits.map((visit, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-1">{visit.reason}</h4>
                      <p className="text-sm text-gray-600">Dr. {visit.provider}</p>
                    </div>
                    <span className="text-sm text-gray-500">{visit.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-200">{visit.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'messages':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
              <span className="text-sm text-gray-600">{messages.filter(m => !m.read).length} unread</span>
            </div>
            <div className="divide-y divide-gray-200">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-6 hover:bg-gray-50 transition-colors ${!msg.read ? 'bg-blue-50/50' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-1">{msg.subject}</h4>
                        <p className="text-sm text-gray-600">From: {msg.from}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block mb-2">{msg.date}</span>
                      {!msg.read && <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto"></div>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200 ml-14">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'notes':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Personal Notes</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {notes.map((note) => (
                <div key={note.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-1">{note.title}</h4>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">{note.category}</span>
                    </div>
                    <span className="text-sm text-gray-500">{note.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-200">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">MedKey Portal</h1>
              <p className="text-sm text-gray-600 mt-0.5">{patientData.firstName} {patientData.lastName} • MedKey ID: {patientId}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button
                onClick={() => setShowConsentModal(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {hasPendingRequest && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
              <motion.button
                onClick={onShare}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-apple-blue text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-apple-blueDark transition-colors shadow-sm"
              >
                Share Records
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 sticky top-20">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm font-medium ${
                      activeMenu === item.id
                        ? 'bg-apple-blue text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={activeMenu === item.id ? 'text-white' : 'text-gray-500'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                  {menuItems.find(m => m.id === activeMenu)?.label}
                </h2>
                {activeMenu === 'messages' && (
                  <p className="text-sm text-gray-600">{messages.filter(m => !m.read).length} unread messages</p>
                )}
              </div>
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>

      <ConsentRequestModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        patientId={patientId}
        onConsentGranted={handleConsentGranted}
        onConsentDeclined={handleConsentDeclined}
      />
    </div>
  )
}
