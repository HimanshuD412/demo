import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Prescription from "./pages/Prescription";
import DashboardLayout from "./layouts/DashboardLayout";
import OpdManagement from "./pages/OpdManagement";
import CreateOpd from "./pages/CreateOpd";
import PatientManagement from "./pages/PatientManagement";
import AdminPendingOpd from "./pages/AdminPendingOpd";
import PatientHistory from "./pages/PatientHistory";
import EditPrescription from "./pages/EditPrescription";
import PatientByDoctor from "./pages/PatientByDoctor";
import PatientPrescription from "./pages/PatientPrescription";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={
        <ProtectedRoute>
         <DashboardLayout>
             <AdminDashboard />
         </DashboardLayout>
         </ProtectedRoute>
          } />


          <Route path="/doctor" element={
        <ProtectedRoute>
         <DashboardLayout>
             <DoctorDashboard />
         </DashboardLayout>
         </ProtectedRoute>
          } />


           <Route path="/recept" element={
        <ProtectedRoute>
         <DashboardLayout>
             <ReceptionistDashboard />
         </DashboardLayout>
         </ProtectedRoute>
          } />

        <Route path="/doctor/prescription/:opdid" element={
        <ProtectedRoute>
         <DashboardLayout>
             <Prescription />
         </DashboardLayout>
         </ProtectedRoute>
          } />


        <Route path="/recept/opd" element={
  <ProtectedRoute>
    <DashboardLayout><OpdManagement /></DashboardLayout>
  </ProtectedRoute>
} />

<Route path="/recept/create-opd" element={
  <ProtectedRoute>
    <DashboardLayout><CreateOpd /></DashboardLayout>
  </ProtectedRoute>
} />

<Route path="/recept/patients-manage" element={
  <ProtectedRoute>
    <DashboardLayout><PatientManagement /></DashboardLayout>
  </ProtectedRoute>
} />

<Route path="/admin/opd" element={
  <ProtectedRoute>
    <DashboardLayout><AdminPendingOpd /></DashboardLayout>
  </ProtectedRoute>
} />


    <Route path="/doctor/history/:pid" element={
  <ProtectedRoute>
    <DashboardLayout><PatientHistory /></DashboardLayout>
  </ProtectedRoute>
} />

<Route path="/doctor/prescription/edit/:opdid" element={
  <ProtectedRoute>
    <DashboardLayout><EditPrescription /></DashboardLayout>
  </ProtectedRoute>
} />

<Route path="/recept/patient-doctor" element={
  <ProtectedRoute>
    <DashboardLayout><PatientByDoctor /></DashboardLayout>
  </ProtectedRoute>
} />

<Route
  path="/patient/history"
  element={
    <DashboardLayout>
      <PatientPrescription />
    </DashboardLayout>
  }
/>



       
      </Routes>

      

    </BrowserRouter>
  );
}

export default App;
