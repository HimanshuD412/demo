import PatientForm from "./PatientForm";
import PatientList from "./PatientList";

export default function ReceptionistDashboard() {
  return (
    <div className="container-fluid mt-3 px-2 px-md-4">
      <h2 className="mb-4">Receptionist Dashboard</h2>

      <div className="card p-4 shadow-sm mb-4">
        <PatientForm />
      </div>

      <div className="card p-4 shadow-sm">
        <PatientList />
      </div>
    </div>
  );
}
