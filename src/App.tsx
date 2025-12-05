import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import PersonalInfoForm from './components/PersonalInfoForm'
import HospitalInfoForm from './components/HospitalInfoForm'
import LoadingScreen from './components/LoadingScreen'
import MedicalHistory from './components/MedicalHistory'
import ShareModal from './components/ShareModal'
import DoctorDashboard from './components/DoctorDashboard'
import DoctorPatientView from './components/DoctorPatientView'
import PatientConsentPage from './components/PatientConsentPage'
import PatientsManagement from './components/PatientsManagement'
import { storage } from './utils/storage'

export interface PatientData {
  firstName: string
  lastName: string
  dob: string
  hospitals: Array<{
    id: string
    name: string
    patientId: string
  }>
}

export interface MedicalRecord {
  allergies: Array<{ name: string; severity: string; date: string }>
  medications: Array<{ name: string; dosage: string; frequency: string; startDate: string }>
  diagnoses: Array<{ condition: string; date: string; status: string }>
  labResults: Array<{ test: string; result: string; date: string; unit: string }>
  imaging: Array<{ type: string; date: string; facility: string; findings: string }>
  vitals: Array<{ date: string; bloodPressure: string; heartRate: number; temperature: string; weight: string }>
  visits: Array<{ date: string; provider: string; reason: string; notes: string }>
}

type AppState = 'home' | 'personal' | 'hospital' | 'loading' | 'history' | 'doctor-dashboard' | 'doctor-patient-view' | 'patient-consent' | 'patients-management'

function App() {
  // Load persisted state from localStorage
  const [state, setState] = useState<AppState>(() => {
    // If patient data exists, go to history
    const savedPatientData = storage.get<PatientData | null>('patient_data', null)
    const savedMedicalRecords = storage.get<MedicalRecord | null>('medical_records', null)
    if (savedPatientData && savedMedicalRecords) {
      return 'history'
    }
    return 'home'
  })
  
  const [personalInfo, setPersonalInfo] = useState<{ firstName: string; lastName: string; dob: string } | null>(() => 
    storage.get<{ firstName: string; lastName: string; dob: string } | null>('personal_info', null)
  )
  const [patientData, setPatientData] = useState<PatientData | null>(() => 
    storage.get<PatientData | null>('patient_data', null)
  )
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord | null>(() => 
    storage.get<MedicalRecord | null>('medical_records', null)
  )
  const [patientId, setPatientId] = useState<string>(() => 
    storage.get<string>('patient_id', '')
  )
  const [showShareModal, setShowShareModal] = useState(false)
  
  // Doctor flow state
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [selectedPatientMedKeyId, setSelectedPatientMedKeyId] = useState<string>('')
  const [selectedPatientName, setSelectedPatientName] = useState<string>('')
  const [pendingConsentMedKeyId, setPendingConsentMedKeyId] = useState<string>('')
  
  // Save personal info when it changes
  useEffect(() => {
    if (personalInfo) {
      storage.set('personal_info', personalInfo)
    }
  }, [personalInfo])

  const handleRoleSelection = (role: 'doctor' | 'patient') => {
    if (role === 'patient') {
      setState('personal')
    } else {
      setState('doctor-dashboard')
    }
  }

  const handlePersonalInfoSubmit = (data: { firstName: string; lastName: string; dob: string }) => {
    setPersonalInfo(data)
    storage.set('personal_info', data)
    setState('hospital')
  }

  const handleHospitalInfoSubmit = (data: PatientData) => {
    setPatientData(data)
    // Generate or retrieve patient ID
    let randomId = storage.get<string>('patient_id', '')
    if (!randomId) {
      randomId = `MK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      storage.set('patient_id', randomId)
    }
    setPatientId(randomId)
    
    // Save patient data
    storage.set('patient_data', data)
    
    // Check if medical records already exist
    const existingRecords = storage.get<MedicalRecord | null>('medical_records', null)
    if (existingRecords) {
      setMedicalRecords(existingRecords)
      setState('history')
    } else {
      setState('loading')
      // Simulate loading, then show medical history
      setTimeout(() => {
        const mockData = generateMockMedicalData()
        setMedicalRecords(mockData)
        storage.set('medical_records', mockData)
        setState('history')
      }, 3000)
    }
  }

  const generateMockMedicalData = (): MedicalRecord => {
    return {
      allergies: [
        { name: 'Penicillin', severity: 'Severe', date: '2015-03-15' },
        { name: 'Latex', severity: 'Moderate', date: '2018-07-22' },
      ],
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2023-01-10' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2023-02-05' },
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', startDate: '2023-03-12' },
      ],
      diagnoses: [
        { condition: 'Type 2 Diabetes', date: '2023-01-10', status: 'Active' },
        { condition: 'Hypertension', date: '2022-11-20', status: 'Active' },
        { condition: 'Hyperlipidemia', date: '2023-03-12', status: 'Active' },
      ],
      labResults: [
        { test: 'Hemoglobin A1C', result: '6.8', date: '2024-01-15', unit: '%' },
        { test: 'Fasting Glucose', result: '112', date: '2024-01-15', unit: 'mg/dL' },
        { test: 'Total Cholesterol', result: '185', date: '2024-01-15', unit: 'mg/dL' },
        { test: 'LDL Cholesterol', result: '110', date: '2024-01-15', unit: 'mg/dL' },
        { test: 'HDL Cholesterol', result: '55', date: '2024-01-15', unit: 'mg/dL' },
        { test: 'Triglycerides', result: '150', date: '2024-01-15', unit: 'mg/dL' },
        { test: 'Complete Blood Count', result: 'Normal', date: '2024-01-15', unit: '' },
      ],
      imaging: [
        { type: 'Chest X-Ray', date: '2023-12-10', facility: 'City Medical Center', findings: 'No acute abnormalities' },
        { type: 'Abdominal Ultrasound', date: '2023-08-22', facility: 'Regional Hospital', findings: 'Normal liver, kidneys, and gallbladder' },
        { type: 'Echocardiogram', date: '2023-05-15', facility: 'Cardiac Care Center', findings: 'Normal ejection fraction, no wall motion abnormalities' },
      ],
      vitals: [
        { date: '2024-01-15', bloodPressure: '128/82', heartRate: 72, temperature: '98.6°F', weight: '175 lbs' },
        { date: '2023-12-10', bloodPressure: '130/85', heartRate: 75, temperature: '98.4°F', weight: '177 lbs' },
        { date: '2023-11-05', bloodPressure: '125/80', heartRate: 70, temperature: '98.7°F', weight: '176 lbs' },
      ],
      visits: [
        { date: '2024-01-15', provider: 'Dr. Sarah Johnson', reason: 'Annual Physical', notes: 'Patient doing well, continue current medications' },
        { date: '2023-12-10', provider: 'Dr. Sarah Johnson', reason: 'Follow-up', notes: 'Blood pressure well controlled' },
        { date: '2023-11-05', provider: 'Dr. Michael Chen', reason: 'Cardiology Consultation', notes: 'EKG normal, continue monitoring' },
      ],
    }
  }

  const handleDoctorPatientSelect = (patientId: string, medKeyId: string) => {
    // Get patient info from stored patients
    const patients = storage.get<Array<{id: string, name: string, medKeyId: string, status: string}>>('doctor_patients', [])
    const patient = patients.find(p => p.medKeyId === medKeyId)
    const patientName = patient?.name || 'Patient'
    
    // Check if consent is already signed
    const signatures = storage.get<Array<{medKeyId: string}>>('consent_signatures', [])
    const hasConsent = signatures.some(s => s.medKeyId === medKeyId)
    
    // If patient status is pending, show consent page first
    if (patient?.status === 'pending' && !hasConsent) {
      setPendingConsentMedKeyId(medKeyId)
      setSelectedPatientName(patientName)
      setState('patient-consent')
    } else {
      // Show patient view (consent already given or patient is active)
      setSelectedPatientId(patientId)
      setSelectedPatientMedKeyId(medKeyId)
      setSelectedPatientName(patientName)
      setMedicalRecords(generateMockMedicalData())
      setState('doctor-patient-view')
    }
  }

  const handleConsentGranted = () => {
    // After consent is granted, update patient status to active
    const patients = storage.get<Array<{id: string, name: string, medKeyId: string, lastAccess: string, status: 'pending' | 'active', age: number, lastVisit: string, nextAppointment?: string}>>('doctor_patients', [])
    const updatedPatients = patients.map(p => 
      p.medKeyId === pendingConsentMedKeyId ? { ...p, status: 'active' as const, lastAccess: new Date().toISOString().split('T')[0] } : p
    )
    storage.set('doctor_patients', updatedPatients)
    
    // Show doctor patient view
    setSelectedPatientId('1')
    setSelectedPatientMedKeyId(pendingConsentMedKeyId)
    setMedicalRecords(generateMockMedicalData())
    setState('doctor-patient-view')
  }

  const handleConsentDeclined = () => {
    // Go back to dashboard
    setPendingConsentMedKeyId('')
    setState('doctor-dashboard')
  }

  const handleAddPatientRequest = (medKeyId: string) => {
    // When doctor adds a patient, show consent page if it's Rojan
    if (medKeyId === 'MK-ROJAN123') {
      setPendingConsentMedKeyId(medKeyId)
      setSelectedPatientName('Rojan Upreti')
      setState('patient-consent')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {state === 'home' && <HomePage onRoleSelect={handleRoleSelection} />}
      {state === 'personal' && <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />}
      {state === 'hospital' && personalInfo && (
        <HospitalInfoForm
          personalInfo={personalInfo}
          onBack={() => setState('personal')}
          onSubmit={handleHospitalInfoSubmit}
        />
      )}
      {state === 'loading' && <LoadingScreen />}
      {state === 'history' && (
        <MedicalHistory
          patientData={patientData!}
          medicalRecords={medicalRecords!}
          patientId={patientId}
          onShare={() => setShowShareModal(true)}
        />
      )}
      {state === 'doctor-dashboard' && (
        <DoctorDashboard
          onPatientSelect={handleDoctorPatientSelect}
          onBack={() => setState('home')}
          onAddPatientRequest={handleAddPatientRequest}
          onNavigateToPatients={() => setState('patients-management')}
        />
      )}
      {state === 'patients-management' && (
        <PatientsManagement
          onPatientSelect={handleDoctorPatientSelect}
          onBack={() => setState('doctor-dashboard')}
          onAddPatientRequest={handleAddPatientRequest}
        />
      )}
      {state === 'patient-consent' && (
        <PatientConsentPage
          patientName={selectedPatientName}
          doctorName="Dr. Sarah Johnson"
          medKeyId={pendingConsentMedKeyId}
          onConsent={handleConsentGranted}
          onDecline={handleConsentDeclined}
        />
      )}
      {state === 'doctor-patient-view' && medicalRecords && (
        <DoctorPatientView
          patientName={selectedPatientName}
          medKeyId={selectedPatientMedKeyId}
          medicalRecords={medicalRecords}
          onBack={() => setState('doctor-dashboard')}
        />
      )}
      {showShareModal && (
        <ShareModal
          patientId={patientId}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}

export default App
