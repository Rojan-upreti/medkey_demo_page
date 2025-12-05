import { useState } from 'react'
import { motion } from 'framer-motion'
import { MedicalRecord } from '../App'

interface DoctorPatientViewProps {
  patientName: string
  medKeyId: string
  medicalRecords: MedicalRecord
  onBack: () => void
}

type TabType = 'overview' | 'chart' | 'medications' | 'labs' | 'imaging' | 'notes' | 'orders' | 'timeline'

export default function DoctorPatientView({ patientName, medKeyId, medicalRecords, onBack }: DoctorPatientViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [showNewNote, setShowNewNote] = useState(false)
  const [showNewOrder, setShowNewOrder] = useState(false)

  const tabs: { id: TabType; label: string; icon: JSX.Element }[] = [
    { id: 'overview', label: 'Overview', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { id: 'chart', label: 'Chart', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { id: 'medications', label: 'Medications', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
    { id: 'labs', label: 'Lab Results', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { id: 'imaging', label: 'Imaging', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { id: 'notes', label: 'Clinical Notes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
    { id: 'orders', label: 'Orders', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
    { id: 'timeline', label: 'Timeline', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
        {/* Patient Header */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={onBack}
            className="mb-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 mb-1">{patientName}</h1>
            <p className="text-xs text-gray-500 font-mono">{medKeyId}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Active</span>
              <span className="text-xs text-gray-500">DOB: 01/15/1985</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-4">
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-apple-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setShowNewNote(true)}
            className="w-full bg-apple-blue text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-apple-blueDark transition-colors flex items-center justify-center gap-2 mb-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>
          <button
            onClick={() => setShowNewOrder(true)}
            className="w-full bg-white border-2 border-apple-blue text-apple-blue px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-apple-blue/5 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            New Order
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">{activeTab}</h2>
              <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'overview' && <OverviewTab medicalRecords={medicalRecords} />}
          {activeTab === 'chart' && <ChartTab medicalRecords={medicalRecords} />}
          {activeTab === 'medications' && <MedicationsTab medicalRecords={medicalRecords} />}
          {activeTab === 'labs' && <LabsTab medicalRecords={medicalRecords} />}
          {activeTab === 'imaging' && <ImagingTab medicalRecords={medicalRecords} />}
          {activeTab === 'notes' && <NotesTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'timeline' && <TimelineTab medicalRecords={medicalRecords} />}
        </div>
      </main>
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ medicalRecords }: { medicalRecords: MedicalRecord }) {
  return (
    <div className="space-y-6">
      {/* Alert Banner - Allergies */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Active Allergies</h3>
            <div className="flex flex-wrap gap-2">
              {medicalRecords.allergies.map((allergy, idx) => (
                <span key={idx} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  {allergy.name} ({allergy.severity})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Medications</p>
              <p className="text-2xl font-bold text-gray-900">{medicalRecords.medications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Diagnoses</p>
              <p className="text-2xl font-bold text-gray-900">{medicalRecords.diagnoses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Lab Results</p>
              <p className="text-2xl font-bold text-gray-900">{medicalRecords.labResults.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Recent Visits</p>
              <p className="text-2xl font-bold text-gray-900">{medicalRecords.visits.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Vitals */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Recent Vitals</h3>
        {medicalRecords.vitals.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Blood Pressure</p>
              <p className="text-xl font-bold text-gray-900">{medicalRecords.vitals[0].bloodPressure}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Heart Rate</p>
              <p className="text-xl font-bold text-gray-900">{medicalRecords.vitals[0].heartRate} bpm</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Temperature</p>
              <p className="text-xl font-bold text-gray-900">{medicalRecords.vitals[0].temperature}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Weight</p>
              <p className="text-xl font-bold text-gray-900">{medicalRecords.vitals[0].weight}</p>
            </div>
          </div>
        )}
      </div>

      {/* Problem List */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Problem List</h3>
        <div className="space-y-3">
          {medicalRecords.diagnoses.map((diagnosis, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{diagnosis.condition}</p>
                <p className="text-sm text-gray-600">Diagnosed: {diagnosis.date} • Status: {diagnosis.status}</p>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                {diagnosis.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Chart Tab Component
function ChartTab({ medicalRecords }: { medicalRecords: MedicalRecord }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs Trend</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {medicalRecords.vitals.map((vital, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-blue-100 rounded-t flex flex-col justify-end" style={{ height: `${(parseInt(vital.bloodPressure.split('/')[0]) / 200) * 100}%` }}>
                <div className="bg-blue-600 rounded-t h-full"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{vital.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Pressure History</h3>
          <div className="space-y-3">
            {medicalRecords.vitals.map((vital, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-900">{vital.bloodPressure}</span>
                <span className="text-sm text-gray-500">{vital.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Trend</h3>
          <div className="space-y-3">
            {medicalRecords.vitals.map((vital, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-900">{vital.weight}</span>
                <span className="text-sm text-gray-500">{vital.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Medications Tab
function MedicationsTab({ medicalRecords }: { medicalRecords: MedicalRecord }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
          <button className="px-4 py-2 bg-apple-blue text-white rounded-lg text-sm font-semibold hover:bg-apple-blueDark">
            Prescribe New
          </button>
        </div>
        <div className="space-y-3">
          {medicalRecords.medications.map((med, idx) => (
            <div key={idx} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{med.name}</p>
                  <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                  <p className="text-xs text-gray-500 mt-1">Started: {med.startDate}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50">
                    Discontinue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Labs Tab
function LabsTab({ medicalRecords }: { medicalRecords: MedicalRecord }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Laboratory Results</h3>
          <button className="px-4 py-2 bg-apple-blue text-white rounded-lg text-sm font-semibold hover:bg-apple-blueDark">
            Order Lab
          </button>
        </div>
        <div className="space-y-4">
          {medicalRecords.labResults.map((lab, idx) => (
            <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{lab.test}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Result: <span className="font-bold text-lg">{lab.result}</span> {lab.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{lab.date}</p>
                  <span className="mt-1 inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    Normal
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Imaging Tab
function ImagingTab({ medicalRecords }: { medicalRecords: MedicalRecord }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Imaging Studies</h3>
          <button className="px-4 py-2 bg-apple-blue text-white rounded-lg text-sm font-semibold hover:bg-apple-blueDark">
            Order Imaging
          </button>
        </div>
        <div className="space-y-4">
          {medicalRecords.imaging.map((img, idx) => (
            <div key={idx} className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{img.type}</p>
                  <p className="text-sm text-gray-600">{img.facility}</p>
                  <p className="text-xs text-gray-500 mt-2">{img.findings}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-2">{img.date}</p>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50">
                    View Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Notes Tab
function NotesTab() {
  const notes = [
    { date: '2024-01-15', provider: 'Dr. Sarah Johnson', type: 'Progress Note', content: 'Patient doing well, continue current medications. Blood pressure well controlled.' },
    { date: '2023-12-10', provider: 'Dr. Sarah Johnson', type: 'Follow-up', content: 'Follow-up visit. Patient reports feeling good. Continue monitoring.' },
    { date: '2023-11-05', provider: 'Dr. Michael Chen', type: 'Consultation', content: 'Cardiology consultation. EKG normal, continue monitoring.' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Clinical Notes</h3>
          <button className="px-4 py-2 bg-apple-blue text-white rounded-lg text-sm font-semibold hover:bg-apple-blueDark">
            New Note
          </button>
        </div>
        <div className="space-y-4">
          {notes.map((note, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{note.provider}</p>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {note.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{note.content}</p>
                </div>
                <span className="text-xs text-gray-500">{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Orders Tab
function OrdersTab() {
  const orders = [
    { id: 'ORD-001', type: 'Lab Order', test: 'Complete Blood Count', date: '2024-01-20', status: 'Pending' },
    { id: 'ORD-002', type: 'Lab Order', test: 'Lipid Panel', date: '2024-01-20', status: 'Pending' },
    { id: 'ORD-003', type: 'Medication', test: 'Metformin 500mg', date: '2024-01-15', status: 'Active' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Orders</h3>
          <button className="px-4 py-2 bg-apple-blue text-white rounded-lg text-sm font-semibold hover:bg-apple-blueDark">
            New Order
          </button>
        </div>
        <div className="space-y-3">
          {orders.map((order, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{order.test}</p>
                  <p className="text-sm text-gray-600">{order.type} • {order.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-500">{order.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Timeline Tab
function TimelineTab({ medicalRecords }: { medicalRecords: MedicalRecord }) {
  const allEvents = [
    ...medicalRecords.visits.map(v => ({ ...v, type: 'visit' })),
    ...medicalRecords.labResults.map(l => ({ ...l, type: 'lab' })),
    ...medicalRecords.imaging.map(i => ({ ...i, type: 'imaging' })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {allEvents.map((event, idx) => (
              <div key={idx} className="relative pl-12">
                <div className="absolute left-2 w-4 h-4 bg-apple-blue rounded-full border-4 border-white"></div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {event.type === 'visit' ? event.provider : event.type === 'lab' ? event.test : event.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        {event.type === 'visit' ? event.reason : event.type === 'lab' ? `Result: ${event.result} ${event.unit}` : event.facility}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
