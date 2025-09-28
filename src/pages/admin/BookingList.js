import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import {
  fetchBookings,
  updateBookingStatus,
} from "../../services/bookingService";
import toast from "react-hot-toast";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await fetchBookings(page);
      setBookings(res.data || []);
      setMeta(res.meta || {});
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [page]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, { status });
      toast.success("Booking status updated");
      loadBookings();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
            Confirmed
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-700">
            Pending
          </span>
        );
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Guest</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Property</th>
                <th className="px-4 py-2 border">Dates</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-4 py-2 border">{b.id}</td>
                  <td className="px-4 py-2 border">{b.guest_name}</td>
                  <td className="px-4 py-2 border">{b.guest_email}</td>
                  <td className="px-4 py-2 border">{b.property?.title}</td>
                  <td className="px-4 py-2 border">
                    {b.start_date} → {b.end_date}
                  </td>
                  <td className="px-4 py-2 border">
                    {renderStatusBadge(b.status)}
                  </td>
                  <td className="px-4 py-2 border flex gap-2">
                    <Link
                      to={`/admin/bookings/view/${b.id}`}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      View
                    </Link>

                    {b.status !== "confirmed" && (
                      <button
                        onClick={() => handleStatusChange(b.id, "confirmed")}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Confirm
                      </button>
                    )}

                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => handleStatusChange(b.id, "cancelled")}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {meta && meta.last_page > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: meta.last_page }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                meta.current_page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default BookingList;
