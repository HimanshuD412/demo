import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
