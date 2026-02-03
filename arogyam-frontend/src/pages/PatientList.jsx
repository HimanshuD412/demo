import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api.get("/receptionist/patients")
      .then(res => setPatients(res.data));
  }, [refresh]);

  const deletePatient = async (pid) => {
    if (window.confirm("Delete patient?")) {
      await api.delete(`/receptionist/patients/${pid}`);
      setRefresh(!refresh);
    }
  };

  return (
    <div>
      <h5 className="mb-3">Patients</h5>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>PID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Doctor</th>
              <th style={{ minWidth: "200px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map(p => (
              <tr key={p.pid}>
                <td>{p.pid}</td>
                <td>{p.firstName} {p.lastName}</td>
                <td>{p.mobileno}</td>
                <td>{p.doctorId || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => window.dispatchEvent(new CustomEvent("editPatient", { detail: p.pid }))}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deletePatient(p.pid)}
                  >
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
