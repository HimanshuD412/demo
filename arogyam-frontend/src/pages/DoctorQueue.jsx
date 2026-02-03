import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function DoctorQueue() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const doctorId = user.id;

  const [queue, setQueue] = useState([]);

  useEffect(() => {
    api.get(`/doctor/queue/${doctorId}`)
      .then(res => setQueue(res.data))
      .catch(() => alert("Error loading OPD queue"));
  }, [doctorId]);

  return (
    <div>
      <h5 className="mb-3">OPD Queue</h5>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>OPD ID</th>
              <th>Date</th>
              <th>Patient ID</th>
              <th>Status</th>
              <th style={{ minWidth: "260px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {queue.map(o => (
              <tr key={o.opdid}>
                <td>{o.opdid}</td>
                <td>{o.visitdate}</td>
                <td>{o.patientId}</td>
                <td>{o.status === 0 ? "Pending" : "Done"}</td>
                <td>
                  {/* PRESCRIBE */}
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => navigate(`/doctor/prescription/${o.opdid}`)}
                  >
                    Prescribe
                  </button>

                

                  {/* PATIENT HISTORY */}
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => navigate(`/doctor/history/${o.patientId}`)}
                  >
                    History
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
