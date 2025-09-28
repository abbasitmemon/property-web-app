import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((s) => s.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out");
      navigate("/admin/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="bg-blue-700 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span>🏡</span> Property Manager
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="hover:underline">
            Admin
          </Link>
          {token ? (
            <>
              <span className="text-sm opacity-90">Hi, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-50"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
