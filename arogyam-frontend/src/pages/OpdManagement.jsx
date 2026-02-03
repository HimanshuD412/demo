import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OpdManagement() {
  const [opds, setOpds] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api.get("/opd/pending")
      .then(res => setOpds(res.data))
      .catch(() => alert("Failed to load OPDs"));
  }, [refresh]);

  const updateStatus = async (opdid) => {
    await api.patch(`/opd/${opdid}/status/1`);
    setRefresh(!refresh);
  };

  const deleteOpd = async (opdid) => {
    if (window.confirm("Delete OPD?")) {
      await api.delete(`/opd/${opdid}`);
      setRefresh(!refresh);
    }
  };

  return (
    <div>
      <h5 className="mb-3">Pending OPDs</h5>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>OPD</th>
              <th>Date</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {opds.map(o => (
              <tr key={o.opdid}>
                <td>{o.opdid}</td>
                <td>{o.visitdate}</td>
                <td>{o.patientId}</td>
                <td>{o.doctorId}</td>
                <td>Pending</td>
                <td>
                  <button className="btn btn-sm btn-success me-2" onClick={() => updateStatus(o.opdid)}>
                    Mark Done
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteOpd(o.opdid)}>
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
