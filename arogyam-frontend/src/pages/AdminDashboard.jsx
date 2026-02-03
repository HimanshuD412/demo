import Dashboard from "./Dashboard";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

export default function AdminDashboard() {
  return (
    <div  className="container-fluid mt-3 px-2 px-md-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="card p-4 shadow-sm mb-4">
        <Dashboard />
      </div>

      <div className="card p-4 shadow-sm mb-4">
        <EmployeeForm />
      </div>

      <div className="card p-4 shadow-sm">
        <EmployeeList />
      </div>
    </div>
  );
}
