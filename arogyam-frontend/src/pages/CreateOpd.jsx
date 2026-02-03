import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CreateOpd() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [pid, setPid] = useState("");
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    api.get("/receptionist/patients").then(res => setPatients(res.data));
    api.get("/admin/employees/doctors").then(res => setDoctors(res.data));
  }, []);

  const createOpd = async (e) => {
    e.preventDefault();

    if (!pid || !doctorId) {
      alert("Please select patient and doctor");
      return;
    }

    await api.post("/opd", {
      visitdate: new Date(),
      patient: { pid },
      doctor: { eid: doctorId }
    });

    alert("OPD created");
    setPid("");
    setDoctorId("");
  };

  return (
    <form onSubmit={createOpd} className="row g-3">
      <h5>Create OPD</h5>

      <div className="col-md-6">
        <select
          className="form-select"
          value={pid}
          onChange={e => setPid(e.target.value)}
          required
        >
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.pid} value={p.pid}>{p.pid}</option>
          ))}
        </select>
      </div>

      <div className="col-md-6">
        <select
          className="form-select"
          value={doctorId}
          onChange={e => setDoctorId(e.target.value)}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d.eid} value={d.eid}>{d.eid}</option>
          ))}
        </select>
      </div>

      <div className="col-12 text-end">
        <button className="btn btn-primary" disabled={!pid || !doctorId}>
          Create OPD
        </button>
      </div>
    </form>
  );
}
