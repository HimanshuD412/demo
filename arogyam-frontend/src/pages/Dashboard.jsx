import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    employees: 0,
  });

  useEffect(() => {
    api.get("/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(() => alert("Error loading dashboard stats"));
  }, []);

  return (
    <div className="row text-center">
      <Stat title="Doctors" value={stats.doctors} />
      <Stat title="Patients" value={stats.patients} />
      <Stat title="Employees" value={stats.employees} />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 mb-3">
      <div className="card shadow-sm p-3">
        <h6>{title}</h6>
        <h3>{value}</h3>
      </div>
    </div>
  );
}
