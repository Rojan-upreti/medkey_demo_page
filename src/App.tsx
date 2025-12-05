import { useState } from 'react'
import HomePage from './components/HomePage'
import PersonalInfoForm from './components/PersonalInfoForm'
import HospitalInfoForm from './components/HospitalInfoForm'
import LoadingScreen from './components/LoadingScreen'
import MedicalHistory from './components/MedicalHistory'
import ShareModal from './components/ShareModal'

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

type AppState = 'home' | 'personal' | 'hospital' | 'loading' | 'history'

function App() {
  const [state, setState] = useState<AppState>('home')
  const [personalInfo, setPersonalInfo] = useState<{ firstName: string; lastName: string; dob: string } | null>(null)
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord | null>(null)
  const [patientId, setPatientId] = useState<string>('')
  const [showShareModal, setShowShareModal] = useState(false)

  const handleRoleSelection = (role: 'doctor' | 'patient') => {
    if (role === 'patient') {
      setState('personal')
    } else {
      // Doctor flow - can be implemented later
      alert('Doctor portal coming soon!')
    }
  }

  const handlePersonalInfoSubmit = (data: { firstName: string; lastName: string; dob: string }) => {
    setPersonalInfo(data)
    setState('hospital')
  }

  const handleHospitalInfoSubmit = (data: PatientData) => {
    setPatientData(data)
    // Generate random patient ID
    const randomId = `MK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    setPatientId(randomId)
    setState('loading')
    
    // Simulate loading, then show medical history
    setTimeout(() => {
      setMedicalRecords(generateMockMedicalData())
      setState('history')
    }, 3000)
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
