import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientForm() {
  const today = new Date().toISOString().split("T")[0];

  const [patient, setPatient] = useState({
    pid: "",
    registrationDate: today,
    firstName: "",
    lastName: "",
    birthdate: "",
    gender: "",
    emailID: "",
    mobileno: "",
    adharNo: "",
    state: "",
    city: "",
    bloodGroup: "",
    chronicDiseases: "",
    medicineAllergy: "",
    doctorId: "",
    password: "" // 👈 ADDED
  });

  const [doctors, setDoctors] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    api.get("/admin/employees/doctors").then(res => setDoctors(res.data));

    const handler = (e) => {
      api.get(`/receptionist/patients/${e.detail}`).then(res => {
        const p = res.data;
        setPatient({
          pid: p.pid,
          registrationDate: p.registrationDate || today,
          firstName: p.name.firstName,
          lastName: p.name.lastName,
          birthdate: p.birthdate || "",
          gender: p.gender || "",
          emailID: p.emailID || "",
          mobileno: p.mobileno || "",
          adharNo: p.adharNo || "",
          state: p.state || "",
          city: p.city || "",
          bloodGroup: p.bloodGroup || "",
          chronicDiseases: p.chronicDiseases || "",
          medicineAllergy: p.medicineAllergy || "",
          doctorId: p.doctor?.eid || "",
          password: "" // 👈 empty on edit
        });
        setIsEdit(true);
      });
    };

    window.addEventListener("editPatient", handler);
    return () => window.removeEventListener("editPatient", handler);
  }, []);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      pid: patient.pid,
      registrationDate: patient.registrationDate,
      name: { firstName: patient.firstName, lastName: patient.lastName },
      birthdate: patient.birthdate,
      gender: patient.gender,
      emailID: patient.emailID,
      mobileno: patient.mobileno,
      adharNo: patient.adharNo,
      state: patient.state,
      city: patient.city,
      bloodGroup: patient.bloodGroup,
      chronicDiseases: patient.chronicDiseases,
      medicineAllergy: patient.medicineAllergy,
      doctor: patient.doctorId ? { eid: patient.doctorId } : null,
      password: patient.password // 👈 ADDED
    };

    if (isEdit) {
      await api.put("/receptionist/patients", payload);
      alert("Patient updated");
    } else {
      await api.post("/receptionist/patients", payload);
      alert("Patient added");
    }

    setPatient({
      pid: "",
      registrationDate: today,
      firstName: "",
      lastName: "",
      birthdate: "",
      gender: "",
      emailID: "",
      mobileno: "",
      adharNo: "",
      state: "",
      city: "",
      bloodGroup: "",
      chronicDiseases: "",
      medicineAllergy: "",
      doctorId: "",
      password: "" // 👈 reset
    });
    setIsEdit(false);
  };

  return (
    <form onSubmit={submit} className="row g-3">
      <h5 className="mb-3">{isEdit ? "Update Patient" : "Register Patient"}</h5>

      <div className="col-md-3">
        <label className="form-label">Patient ID</label>
        <input
          name="pid"
          className="form-control"
          value={patient.pid}
          disabled={isEdit}
          onChange={handleChange}
          required
          pattern="P.*"
          title="Patient ID must start with P"
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Registration Date</label>
        <input
          type="date"
          name="registrationDate"
          className="form-control"
          value={patient.registrationDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">First Name</label>
        <input
          name="firstName"
          className="form-control"
          value={patient.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Last Name</label>
        <input
          name="lastName"
          className="form-control"
          value={patient.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Birth Date</label>
        <input
          type="date"
          name="birthdate"
          max={today}
          className="form-control"
          value={patient.birthdate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Gender</label>
        <select
          name="gender"
          className="form-select"
          value={patient.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div className="col-md-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="emailID"
          className="form-control"
          value={patient.emailID}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Mobile</label>
        <input
          type="tel"
          name="mobileno"
          pattern="[0-9]{10}"
          maxLength="10"
          minLength="10"
          className="form-control"
          value={patient.mobileno}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Aadhar</label>
        <input
          type="number"
          name="adharNo"
          className="form-control"
          value={patient.adharNo}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">State</label>
        <input
          name="state"
          className="form-control"
          value={patient.state}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">City</label>
        <input
          name="city"
          className="form-control"
          value={patient.city}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Blood Group</label>
        <input
          name="bloodGroup"
          className="form-control"
          value={patient.bloodGroup}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Chronic Diseases</label>
        <textarea
          name="chronicDiseases"
          className="form-control"
          value={patient.chronicDiseases}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Medicine Allergy</label>
        <textarea
          name="medicineAllergy"
          className="form-control"
          value={patient.medicineAllergy}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Assign Doctor</label>
        <select
          name="doctorId"
          className="form-select"
          value={patient.doctorId}
          onChange={handleChange}
        >
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d.eid} value={d.eid}>
              {d.eid}
            </option>
          ))}
        </select>
      </div>

      {/* 👇 PASSWORD FIELD (ONLY ON CREATE) */}
      {!isEdit && (
        <div className="col-md-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={patient.password}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="col-12 text-end">
        <button className="btn btn-primary">
          {isEdit ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
