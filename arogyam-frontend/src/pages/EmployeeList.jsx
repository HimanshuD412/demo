import { useEffect, useState } from "react";
import api from "../api/axios";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // current logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api.get("/admin/employees")
      .then(res => setEmployees(res.data))
      .catch(() => alert("Error loading employees"));
  }, [refresh]);

  const changeStatus = async (eid, status) => {
    try {
      await api.patch(`/admin/employees/${eid}/status/${status}`);
      setRefresh(!refresh);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const deleteEmployee = async (eid) => {

    // ===============================
    // 1. PREVENT SELF DELETE (FRONTEND)
    // ===============================
    if (user?.id === eid) {
      alert("You cannot delete yourself");
      return;
    }

    if (!window.confirm("Delete employee?")) return;

    try {
      await api.delete(`/admin/employees/${eid}`);
      setRefresh(!refresh);
    } catch (err) {
      // backend will block last admin delete
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <h5>All Employees</h5>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ minWidth: "240px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.eid}>
                <td>{emp.eid}</td>
                <td>{emp.firstName} {emp.lastName}</td>
                <td>{emp.role}</td>
                <td>{emp.status === 1 ? "Active" : "Inactive"}</td>
                <td>

                  {/* EDIT */}
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("editEmployee", { detail: emp.eid })
                      )
                    }
                  >
                    Edit
                  </button>

                  {/* ACTIVATE / DEACTIVATE */}
                  {emp.status === 1 ? (
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => changeStatus(emp.eid, 0)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => changeStatus(emp.eid, 1)}
                    >
                      Activate
                    </button>
                  )}

                  {/* DELETE */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteEmployee(emp.eid)}
                  >
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
