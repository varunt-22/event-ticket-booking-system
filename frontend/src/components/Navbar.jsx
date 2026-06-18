import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { token, logout } = useAuth();
  return (
    
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          EventBook
        </h1>

        <div className="flex gap-6 items-center">
  <Link to="/">
    Events
  </Link>

  {token ? (
    <>
      <Link to="/my-bookings">
        My Bookings
      </Link>

      <button
        onClick={logout}
        className="text-red-500"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login">
        Login
      </Link>

      <Link to="/register">
        Register
      </Link>
    </>
  )}
</div>
      </div>
    </nav>
  );
}