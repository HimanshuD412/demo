import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditPrescription() {
  const { opdid } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    symptoms: "",
    diagnosis: "",
    medicinesDose: "",
    dos: "",
    donts: "",
    investigations: "",
    followupDate: "",
    fees: ""
  });

  useEffect(() => {
    api.get(`/doctor/prescription/${opdid}`)
      .then(res => setDetails(res.data))
      .catch(() => alert("Failed to load prescription"));
  }, [opdid]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const updatePrescription = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/doctor/prescription/${opdid}`, details);
      alert("Prescription updated");
      navigate("/doctor");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="card p-3 p-md-4 shadow-sm col-12 col-md-8 mx-auto">
      <h4>Edit Prescription</h4>

      <form onSubmit={updatePrescription} className="row g-3">
        {Object.keys(details).map((key) => (
          <div className="col-12" key={key}>
            <textarea
              className="form-control"
              name={key}
              value={details[key]}
              onChange={handleChange}
              required 
            />
          </div>
        ))}

        <div className="col-12 text-end">
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
}
