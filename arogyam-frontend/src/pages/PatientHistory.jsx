import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function PatientHistory() {
  const { pid } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get(`/doctor/history/${pid}`)
      .then(res => setHistory(res.data))
      .catch(() => alert("Failed to load patient history"));
  }, [pid]);

  return (
    <div className="container-fluid px-2 px-md-4">
      <h4 className="mb-3">Patient History</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>OPD ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map(o => (
              <tr key={o.opdid}>
                <td>{o.opdid}</td>
                <td>{o.visitdate}</td>
                <td>{o.status === 0 ? "Pending" : "Done"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
