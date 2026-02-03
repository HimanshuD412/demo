import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminPendingOpd() {
  const [opds, setOpds] = useState([]);

  useEffect(() => {
    api.get("/opd/pending").then(res => setOpds(res.data));
  }, []);

  return (
    <div className="card p-4">
      <h5>Pending OPDs</h5>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>OPD</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {opds.map(o => (
            <tr key={o.opdid}>
              <td>{o.opdid}</td>
              <td>{o.patientId}</td>
              <td>{o.doctorId}</td>
              <td>{o.visitdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
