import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Prescription() {
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

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const savePrescription = async (e) => {
    e.preventDefault();

    for (let key in details) {
      if (!details[key]) {
        alert("All fields are mandatory");
        return;
      }
    }

    try {
      await api.post(`/doctor/prescription/${opdid}`, details);
      alert("Prescription saved successfully");
      navigate("/doctor");
    } catch {
      alert("Error saving prescription");
    }
  };

  return (
    <div className="card p-3 p-md-4 shadow-sm col-12 col-md-8 mx-auto">
      <h4 className="mb-3">Prescription</h4>

      <form onSubmit={savePrescription} className="row g-3">
        {[
          ["symptoms", "Symptoms"],
          ["diagnosis", "Diagnosis"],
          ["medicinesDose", "Medicines + Dose"],
          ["dos", "Do's"],
          ["donts", "Don'ts"],
          ["investigations", "Investigations"]
        ].map(([name, label]) => (
          <div className="col-12" key={name}>
            <textarea
              className="form-control"
              name={name}
              placeholder={label}
              value={details[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="col-md-6">
          <input
            type="date"
            name="followupDate"
            className="form-control"
            value={details.followupDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="number"
            name="fees"
            placeholder="Fees"
            className="form-control"
            value={details.fees}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="col-12 text-end">
          <button className="btn btn-success">Save Prescription</button>
        </div>
      </form>
    </div>
  );
}
