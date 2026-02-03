import DoctorQueue from "./DoctorQueue";

export default function DoctorDashboard() {
  return (
    <div  className="container-fluid mt-3 px-2 px-md-4">
      <h2 className="mb-4">Doctor Dashboard</h2>

      <div className="card p-4 shadow-sm">
        <DoctorQueue />
      </div>
    </div>
  );
}
