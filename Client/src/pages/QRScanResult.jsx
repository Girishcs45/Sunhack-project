import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardHeader from '../components/DashboardHeader';
import './QRScanResult.css';

const QRScanResult = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accessLog, setAccessLog] = useState([]);
  
  // Get token from URL parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (token) {
      fetchPatientData(token);
      logAccess(token);
    } else {
      setError('Invalid QR code: No access token provided');
      setLoading(false);
    }
  }, [token]);

  const fetchPatientData = async (accessToken) => {
    try {
      // API call to fetch patient data using the token
      const response = await fetch(`/api/patient-records?token=${accessToken}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('doctorToken')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPatientData(data);
      } else {
        setError('Failed to fetch patient data. Token may be expired or invalid.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logAccess = async (accessToken) => {
    try {
      // API call to log this access event
      await fetch('/api/access-log', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('doctorToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: accessToken })
      });
    } catch (err) {
      console.error('Failed to log access:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading patient records...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <DashboardHeader title="Access Patient Records" />
        <div className="error-container">
          <h2>Access Error</h2>
          <p>{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <DashboardHeader title="Patient Medical Records" />
      
      <div className="qr-result-container">
        {/* Patient Information Section */}
        <section className="patient-info-section">
          <h2>Patient Information</h2>
          <div className="patient-details">
            <div className="detail-item">
              <span className="label">Name:</span>
              <span className="value">{patientData.patient.name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Date of Birth:</span>
              <span className="value">{formatDate(patientData.patient.dob)}</span>
            </div>
            <div className="detail-item">
              <span className="label">Gender:</span>
              <span className="value">{patientData.patient.gender}</span>
            </div>
            <div className="detail-item">
              <span className="label">Blood Type:</span>
              <span className="value">{patientData.patient.bloodType}</span>
            </div>
          </div>
        </section>

        {/* Medical Records Section */}
        <section className="records-section">
          <h2>Medical Records</h2>
          
          {/* Medical History */}
          <div className="record-category">
            <h3>Medical History</h3>
            <div className="records-list">
              {patientData.records.medicalHistory.map((record, index) => (
                <div key={index} className="record-item">
                  <h4>{record.condition}</h4>
                  <p>Diagnosed: {formatDate(record.date)}</p>
                  <p>Status: {record.status}</p>
                  {record.notes && <p>Notes: {record.notes}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div className="record-category">
            <h3>Current Medications</h3>
            <div className="records-list">
              {patientData.records.medications.map((med, index) => (
                <div key={index} className="record-item">
                  <h4>{med.name}</h4>
                  <p>Dosage: {med.dosage}</p>
                  <p>Frequency: {med.frequency}</p>
                  <p>Prescribed: {formatDate(med.startDate)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lab Results */}
          <div className="record-category">
            <h3>Laboratory Results</h3>
            <div className="records-list">
              {patientData.records.labResults.map((lab, index) => (
                <div key={index} className="record-item">
                  <h4>{lab.testName}</h4>
                  <p>Date: {formatDate(lab.date)}</p>
                  <p>Result: {lab.result}</p>
                  <p>Reference Range: {lab.referenceRange}</p>
                  {lab.fileUrl && (
                    <a href={lab.fileUrl} target="_blank" rel="noopener noreferrer">
                      View Full Report
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Imaging Studies */}
          <div className="record-category">
            <h3>Imaging Studies</h3>
            <div className="records-list">
              {patientData.records.imagingStudies.map((study, index) => (
                <div key={index} className="record-item">
                  <h4>{study.modality} - {study.bodyPart}</h4>
                  <p>Date: {formatDate(study.date)}</p>
                  <p>Findings: {study.findingsSummary}</p>
                  {study.imageUrl && (
                    <a href={study.imageUrl} target="_blank" rel="noopener noreferrer">
                      View Images
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Access Information */}
        <section className="access-info">
          <h2>Access Information</h2>
          <p>This token will expire on: {formatDate(patientData.accessExpiry)}</p>
          <p>You have full access to these records as a physician.</p>
        </section>
      </div>
    </MainLayout>
  );
};

export default QRScanResult;