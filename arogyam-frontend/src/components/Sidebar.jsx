import { Link } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="sidebar p-3">
      {/* USER INFO */}
      <div className="text-center mb-4">
        <span className="badge bg-warning text-dark">
          {user.role.toUpperCase()}
        </span>
        <p className="mt-2 mb-0">{user.username}</p>
      </div>

      <hr />

      {/* ================= ADMIN ================= */}
      {user.role === "administrator" && (
        <>
          <Link className="d-block mb-2" to="/admin">
            Dashboard
          </Link>

          <Link className="d-block mb-2" to="/admin">
            Employees
          </Link>

          <Link className="d-block mb-2" to="/admin/opd">
            Pending OPDs
          </Link>
        </>
      )}

      {/* ================= DOCTOR ================= */}
      {user.role === "doctor" && (
        <>
          <Link className="d-block mb-2" to="/doctor">
            OPD Queue
          </Link>
        </>
      )}

      {/* ================= RECEPTIONIST ================= */}
      {user.role === "receptionist" && (
        <>
          <Link className="d-block mb-2" to="/recept">
            View Patients
          </Link>

          <Link className="d-block mb-2" to="/recept/create-opd">
            Create OPD
          </Link>

          <Link className="d-block mb-2" to="/recept/opd">
            Manage OPDs
          </Link>

          <Link className="d-block mb-2" to="/recept/patients-manage">
            Manage Patients
          </Link>
        </>
      )}

      {user.role === "patient" && (
       <>
         <Link className="d-block mb-2" to="/patient/history">
            My Prescriptions
         </Link>
       </>
      )}

    </div>
  );
}
