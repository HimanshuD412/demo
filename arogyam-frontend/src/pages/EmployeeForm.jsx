import { useEffect, useState } from "react";
import api from "../api/axios";

export default function EmployeeForm() {
  const today = new Date().toISOString().split("T")[0];

  const [emp, setEmp] = useState({
    eid: "",
    joiningDate: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    gender: "",
    emailID: "",
    mobileno: "",
    adharNo: "",
    state: "",
    city: "",
    role: "",
    qualification: "",
    specialization: "",
    status: 1,
    password: ""
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      api.get(`/admin/employees/${e.detail}`).then(res => {
        const d = res.data;
        setEmp({
          eid: d.eid,
          joiningDate: d.joiningDate || today,
          firstName: d.name.firstName,
          lastName: d.name.lastName,
          birthdate: d.birthdate || "",
          gender: d.gender || "",
          emailID: d.emailID || "",
          mobileno: d.mobileno || "",
          adharNo: d.adharNo || "",
          state: d.state || "",
          city: d.city || "",
          role: d.role,
          qualification: d.qualification || "",
          specialization: d.specialization || "",
          status: d.status,
          password: ""
        });
        setIsEdit(true);
      });
    };

    window.addEventListener("editEmployee", handler);
    return () => window.removeEventListener("editEmployee", handler);
  }, []);

  const handleChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!emp.eid.startsWith("EMP")) {
      alert("Employee ID must start with EMP");
      return;
    }

    const payload = {
      eid: emp.eid,
      joiningDate: emp.joiningDate,
      name: { firstName: emp.firstName, lastName: emp.lastName },
      birthdate: emp.birthdate,
      gender: emp.gender,
      emailID: emp.emailID,
      mobileno: emp.mobileno,
      adharNo: emp.adharNo,
      state: emp.state,
      city: emp.city,
      role: emp.role,
      qualification: emp.qualification,
      specialization: emp.specialization,
      status: emp.status,
      password: emp.password
    };

    if (isEdit) {
      await api.put("/admin/employees", payload);
      alert("Employee updated");
    } else {
      await api.post("/admin/employees", payload);
      alert("Employee added");
    }

    setEmp({
      eid: "",
      joiningDate: "",
      firstName: "",
      lastName: "",
      birthdate: "",
      gender: "",
      emailID: "",
      mobileno: "",
      adharNo: "",
      state: "",
      city: "",
      role: "",
      qualification: "",
      specialization: "",
      status: 1,
      password: ""
    });

    setIsEdit(false);
  };

  return (
    <form onSubmit={submit} className="row g-3">

      <h5 className="mb-3">{isEdit ? "Update Employee" : "Add Employee"}</h5>

      <div className="col-md-3">
        <label className="form-label">Employee ID</label>
        <input
          name="eid"
          className="form-control"
          value={emp.eid}
          onChange={handleChange}
          disabled={isEdit}
          required
          pattern="EMP.*"
          title="Employee ID must start with EMP"
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Joining Date</label>
        <input
          type="date"
          name="joiningDate"
          className="form-control"
          value={emp.joiningDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">First Name</label>
        <input
          name="firstName"
          className="form-control"
          value={emp.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Last Name</label>
        <input
          name="lastName"
          className="form-control"
          value={emp.lastName}
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
          value={emp.birthdate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Gender</label>
        <select
          name="gender"
          className="form-select"
          value={emp.gender}
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
          value={emp.emailID}
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
          value={emp.mobileno}
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
          value={emp.adharNo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">State</label>
        <input
          name="state"
          className="form-control"
          value={emp.state}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">City</label>
        <input
          name="city"
          className="form-control"
          value={emp.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Role</label>
        <select
          name="role"
          className="form-select"
          value={emp.role}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="doctor">Doctor</option>
          <option value="administrator">Administrator</option>
          <option value="receptionist">Receptionist</option>
        </select>
      </div>

      {!isEdit && (
        <div className="col-md-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={emp.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
      )}

      <div className="col-md-3">
        <label className="form-label">Qualification</label>
        <input
          name="qualification"
          className="form-control"
          value={emp.qualification}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Specialization</label>
        <input
          name="specialization"
          className="form-control"
          value={emp.specialization}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-12 text-end">
        <button className="btn btn-primary">
          {isEdit ? "Update" : "Save"}
        </button>
      </div>

    </form>
  );
}
