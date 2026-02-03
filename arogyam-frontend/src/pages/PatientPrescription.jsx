import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientPrescription() {
  const user = JSON.parse(localStorage.getItem("user"));
  const pid = user.username; // patient id = username

  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get(`/doctor/patient/history/${pid}`)
      .then(res => setHistory(res.data))
      .catch(() => alert("Failed to load prescriptions"));
  }, [pid]);

  return (
    <div className="container-fluid mt-3 px-2 px-md-4">
      <h4 className="mb-3">My Prescriptions</h4>

      {history.length === 0 && (
        <div className="alert alert-info">No prescriptions found</div>
      )}

      {history.map(opd => (
        <div key={opd.opdid} className="card mb-3 shadow-sm">
          <div className="card-header">
            <b>Date:</b> {opd.visitdate}
          </div>

          <div className="card-body">
            {opd.diagnosis ? (
  <>
    <p><b>Symptoms:</b> {opd.symptoms}</p>
    <p><b>Diagnosis:</b> {opd.diagnosis}</p>
    <p><b>Medicines:</b> {opd.medicinesDose}</p>
    <p><b>Do's:</b> {opd.dos}</p>
    <p><b>Don'ts:</b> {opd.donts}</p>
    <p><b>Investigations:</b> {opd.investigations}</p>
    <p><b>Follow-up:</b> {opd.followupDate}</p>
    <p><b>Fees:</b> ₹{opd.fees}</p>
  </>
) : (
  <p className="text-muted">Prescription not added yet</p>
)}

          </div>
        </div>
      ))}
    </div>
  );
}
