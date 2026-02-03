export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-primary px-2 px-md-4 shadow-sm">
      <span className="navbar-brand mb-0 h4">Arogyam Hospital</span>
      <button
        className="btn btn-danger"
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </nav>
  );
}
