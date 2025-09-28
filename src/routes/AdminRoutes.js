import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PropertyForm from "../pages/admin/PropertyForm";
import Login from "../pages/admin/Login";
import AdminPropertyView from "../pages/admin/AdminPropertyView";
import AdminRoute from "../middleware/AdminRoute";
import AvailabilityForm from "../pages/admin/AvailabilityForm";
import AvailabilityManager from "../pages/admin/AvailabilityManager";
import BookingList from "../pages/admin/BookingList";
import BookingView from "../pages/admin/BookingView";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/properties/new"
        element={
          <AdminRoute>
            <PropertyForm />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/properties/edit/:id"
        element={
          <AdminRoute>
            <PropertyForm editMode />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/properties/view/:id"
        element={
          <AdminRoute>
            <AdminPropertyView />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/properties/:id/availability/edit"
        element={
          <AdminRoute>
            <AvailabilityForm editMode />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/properties/:id/availability"
        element={
          <AdminRoute>
            <AvailabilityManager />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <AdminRoute>
            <BookingList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/bookings/view/:id"
        element={
          <AdminRoute>
            <BookingView />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
