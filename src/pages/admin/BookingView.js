import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import {
  fetchBooking,
  updateBookingStatus,
} from "../../services/bookingService";
import toast from "react-hot-toast";

const BookingView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  const loadBooking = async () => {
    try {
      const res = await fetchBooking(id);
      setBooking(res.data);
    } catch (err) {
      toast.error("Failed to load booking");
    }
  };

  useEffect(() => {
    loadBooking();
  }, [id]);

  const handleStatusChange = async (status) => {
    try {
      await updateBookingStatus(id, { status });
      toast.success("Status updated");
      navigate("/admin/bookings"); // redirect after update
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (!booking)
    return (
      <AdminLayout>
        <p>Loading...</p>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Booking #{booking.id}</h2>
        <p>
          <strong>Guest:</strong> {booking.guest_name} ({booking.guest_email})
        </p>
        <p>
          <strong>Property:</strong> {booking.property?.title}
        </p>
        <p>
          <strong>Dates:</strong> {booking.start_date} → {booking.end_date}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : booking.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {booking.status}
          </span>
        </p>

        <div className="mt-4 flex gap-2">
          {/* Show Confirm button only if not already confirmed */}
          {booking.status !== "confirmed" && (
            <button
              onClick={() => handleStatusChange("confirmed")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirm
            </button>
          )}

          {/* Show Cancel button only if not already cancelled */}
          {booking.status !== "cancelled" && (
            <button
              onClick={() => handleStatusChange("cancelled")}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          )}

          <Link
            to="/admin/bookings"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookingView;
