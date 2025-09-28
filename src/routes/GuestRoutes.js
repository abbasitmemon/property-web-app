import { Routes, Route, useParams } from "react-router-dom";
import Properties from "../pages/guest/Properties";
import PropertyDetails from "../pages/guest/PropertyDetails";
import Booking from "../pages/guest/Booking";
import GuestRoute from "../middleware/GuestRoute";

// Wrapper to pass propertyId to Booking
const BookingWrapper = () => {
  const { id } = useParams();
  return <Booking propertyId={id} />;
};

const GuestRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <Properties />
          </GuestRoute>
        }
      />
      <Route
        path="/property/:id"
        element={
          <GuestRoute>
            <PropertyDetails />
          </GuestRoute>
        }
      />
      <Route
        path="/book/:id"
        element={
          <GuestRoute>
            <BookingWrapper />
          </GuestRoute>
        }
      />
    </Routes>
  );
};

export default GuestRoutes;
