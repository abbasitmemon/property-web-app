import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md border-r hidden md:block">
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              to="/admin/dashboard"
              className="px-3 py-2 rounded hover:bg-blue-100 text-blue-700 font-medium"
            >
              📊 Dashboard
            </Link>
            <Link
              to="/admin/bookings"
              className="px-3 py-2 rounded hover:bg-blue-100 text-blue-700 font-medium"
            >
              📖 Bookings
            </Link>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
