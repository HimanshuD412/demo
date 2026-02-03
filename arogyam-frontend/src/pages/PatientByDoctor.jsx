import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientByDoctor() {
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/admin/employees/doctors").then(res => setDoctors(res.data));
  }, []);

  const load = () => {
    api.get(`/receptionist/patients/doctor/${doctorId}`)
      .then(res => setPatients(res.data));
  };

  return (
    <div>
      <h5>Patients by Doctor</h5>

      <div className="row mb-3">
        <div className="col-md-4">
          <select className="form-select" onChange={e => setDoctorId(e.target.value)}>
            <option>Select Doctor</option>
            {doctors.map(d => (
              <option key={d.eid} value={d.eid}>{d.eid}</option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary" onClick={load}>Search</button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>PID</th>
            <th>Name</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.pid}>
              <td>{p.pid}</td>
              <td>{p.name.firstName} {p.name.lastName}</td>
              <td>{p.mobileno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
