import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientManagement() {
  const [patients, setPatients] = useState([]);

  const load = () => {
    api.get("/receptionist/patients").then(res => setPatients(res.data));
  };

  useEffect(load, []);

  const deletePatient = async (pid) => {
    if (window.confirm("Delete patient?")) {
      await api.delete(`/receptionist/patients/${pid}`);
      load();
    }
  };

  return (
    <div>
      <h5>Patient Management</h5>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>PID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.pid}>
                <td>{p.pid}</td>
                <td>{p.firstName} {p.lastName}</td>
                <td>{p.mobileno}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => deletePatient(p.pid)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
